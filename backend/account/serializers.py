import jwt
from django.conf import settings
from rest_framework import serializers
from django.shortcuts import get_object_or_404
from account.choices import ACCOUNT_TYPE_CHOICES
from django.utils.translation import gettext_lazy as _
from django.contrib.auth import get_user_model, authenticate
from rest_framework_simplejwt.serializers import TokenRefreshSerializer
from account.tasks import send_verification_mail
from threading import Thread

User = get_user_model()


class UserSerializer(serializers.Serializer):

    class Meta:
        model = User
        fields = ("id", "is_active", "email",
                  "first_name","last_name", "full_name"
                 )

class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True)
    password = serializers.CharField(required=True)   

    def validate(self, attrs: dict):
        request = self.context["request"]
        email, password = attrs["email"], attrs["password"]
        try:
            if User.objects.filter(email=email).first():
                if user := authenticate(request=request, email=email, password=password):
                    if not user.is_verified:
                        msg = [_("Access denied, user is unverified.")]
                        raise serializers.ValidationError(msg)
                    return user
        except Exception as ex:
            print(ex)
            pass
        msg = [_("Unable to log in with provided credentials.")]
        raise serializers.ValidationError(msg)
    

class RegisterSerializer(serializers.Serializer):
    first_name = serializers.CharField(required=True)    
    last_name = serializers.CharField(required=True)    
    email = serializers.EmailField(required=True)
    password = serializers.CharField(required=True)    


    def validate(self, attrs):
        if User.objects.filter(email__iexact=attrs["email"], is_verified=True).first():
            msg = [_("Email already taken")]
            raise serializers.ValidationError({"email": msg})
        return attrs
    
    def create(self, validated_data):
        password = validated_data.pop("password")
        user = User.objects.filter(email__iexact=validated_data["email"], is_verified=False).first()
        if user:
            user.first_name = validated_data["first_name"]
            user.last_name = validated_data["last_name"]
        else:
            user = User(
                is_active=False,
                **validated_data,
                account_type=ACCOUNT_TYPE_CHOICES.INVESTOR,
            )
        user.set_password(password)
        user.save()
        self.send_verifcation(user)
        return user

    def send_verifcation(self, user):
        thread = Thread(target=send_verification_mail, args=(user.id,))
        thread.start()

class EmailVerificationSerializer(serializers.Serializer):
    token = serializers.CharField(required=True)

    def validate(self, attrs: dict):
        if token := attrs.get("token"):
            try:
                secret = settings.SECRET_KEY
                payload = jwt.decode(token.encode(), str(secret), algorithms=["HS256"])
                user = User.objects.filter(email__iexact=payload["email"]).first()
            except jwt.ExpiredSignatureError:
                raise serializers.ValidationError({"token": _("Expired Token.")})
            except jwt.InvalidTokenError as ex:
                print(ex)
                raise serializers.ValidationError({"token": _("Invalid Token.")})
            except:
                raise serializers.ValidationError({"token": _("Token Error.")})
            else:
                if user.is_verified:
                    raise serializers.ValidationError(_("User is already verified."))
                return user



class TokenRefreshSerializer(TokenRefreshSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)

        if 'access' not in data:
            data['access'] = str(self.get_token(self.user).access_token)

        if 'refresh' in attrs:
            data['refresh'] = attrs['refresh']

        return data

