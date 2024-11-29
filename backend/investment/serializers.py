from django.conf import settings
from rest_framework import serializers
from django.utils.translation import gettext_lazy as _
from django.contrib.auth import get_user_model
from investment.models import InvestmentPlan, Inventment

User = get_user_model()


class InvestmentPlansSerializer(serializers.ModelSerializer):

    class Meta:
        model = InvestmentPlan
        fields = '__all__'

    def to_representation(self, instance: Inventment) -> dict:
        request = self.context["request"]
        response = super().to_representation(instance)
        response["image"] = f"{request.build_absolute_uri('/')[:-1].strip()}/media/{instance.image}"
        return response

class SubscribePlansSerializer(serializers.ModelSerializer):

    class Meta:
        model = Inventment
        fields = '__all__'
