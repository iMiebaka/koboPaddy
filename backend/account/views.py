from django.shortcuts import render
from rest_framework.views import APIView
from django.utils.translation import gettext_lazy as _
from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework import status
from django.db import transaction
from rest_framework.permissions import AllowAny
from account.permissions import IsInvestor
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenRefreshView
from account.serializers import TokenRefreshSerializer
from account.serializers import (
    RegisterSerializer, 
    LoginSerializer,
    UserSerializer,
EmailVerificationSerializer
)



class ProfileAPIVIew(APIView):
    permission_classes = (IsInvestor,)
    serializer_class = UserSerializer
    

    def get(self, request:Request, *args, **kwargs):
        serializer = self.serializer_class(request.user)


        data = dict()
        data["status"] = "success"
        data["message"] = _("Profile Retrieved.")
        data["data"] = serializer.data
        return Response(data, status=status.HTTP_200_OK)


class RegisterAPIVIew(APIView):
    serializer_class = RegisterSerializer
    permission_classes = (AllowAny,)
    
    @transaction.atomic
    def post(self, request:Request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        data = dict()
        data["status"] = "success"
        data["message"] = _("Account Registered.")
        return Response(data, status=status.HTTP_200_OK)


class LoginAPIVIew(APIView):
    serializer_class = LoginSerializer
    permission_classes = (AllowAny,)

    @transaction.atomic
    def post(self, request:Request, *args, **kwargs):
        context = {"request": request}
        serializer = self.serializer_class(data=request.data, context=context)
        serializer.is_valid(raise_exception=True)

        user = serializer.validated_data
        refresh = RefreshToken.for_user(user)

        data = dict()
        data["status"] = "success"
        data["message"] = _("Login successful.")
        data["access_token"] = str(refresh.access_token)
        data["refresh_token"] = str(refresh)
        return Response(data, status=status.HTTP_200_OK)


class VerifyEmailAPIVIew(APIView):
    serializer_class = EmailVerificationSerializer
    permission_classes = (AllowAny,)

    @transaction.atomic
    def post(self, request:Request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        user.is_verified = True
        user.is_active = True
        user.save()

        data = dict()
        data["status"] = "success"
        data["message"] = _("Account Verified.")
        return Response(data, status=status.HTTP_200_OK)


class TokenRefreshView(TokenRefreshView):
    serializer_class = TokenRefreshSerializer
