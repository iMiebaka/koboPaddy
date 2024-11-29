from django.conf import settings
from rest_framework import serializers
from django.utils.translation import gettext_lazy as _
from django.contrib.auth import get_user_model
from investment.models import (
    Wallet,
    Ledger,
    Inventment, 
    InvestmentPlan, 
)
from investment.choices import APPROVAL_STATUS_CHOICES, LEDGER_CHOICES


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


class WalletSerializer(serializers.ModelSerializer):
    amount = serializers.DecimalField(decimal_places=2, max_digits=50)

    class Meta:
        model = Wallet
        fields = ["amount"]

    def create(self, validated_data):
        amount = validated_data["amount"]
        request = self.context["request"]
        investor = request.user.investor_user
        wallet = Wallet.objects.get(investor=investor)
        wallet.amount += amount
        wallet.save()
        
        ledger = Ledger(
            amount=amount,
            investor=investor,
            status=APPROVAL_STATUS_CHOICES.APPROVED
        )
        ledger.save()
        return ledger
    
    def update(self, instance: Wallet, validated_data: dict):
        investor = self.context["request"].user.investor_user
        amount = validated_data["amount"]
        
        if not instance.can_withdraw(amount):
            raise serializers.ValidationError({"amount": "Insufficient funds"})
        
        ledger = Ledger(
            amount=amount,
            investor=investor,
            tx_type=LEDGER_CHOICES.WITHDRAWAL
        )
        ledger.save()
        return instance
class LedgerSerializer(serializers.ModelSerializer):
    amount = serializers.FloatField()

    class Meta:
        model = Ledger
        fields = "__all__"
