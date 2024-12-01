from django.db import models
from django.conf import settings
from investment.choices import LEDGER_CHOICES, APPROVAL_STATUS_CHOICES
from django.core.validators import FileExtensionValidator
from django.contrib.postgres.fields import ArrayField

ALLOWED_IMAGE_EXTS = ["png", "jpg", "jpeg", "webp"]

class InvestmentPlan(models.Model):
    plan = models.CharField(max_length=100)
    active = models.BooleanField(default=True)
    min_investment = models.DecimalField(decimal_places=2, max_digits=50)
    interest_rate = models.FloatField()
    image = models.URLField(
        null=True,
        blank=True
    )
    def __str__(self):
        return f"{self.plan} at {self.interest_rate}"

class Investment(models.Model):
    plan = models.ForeignKey(
        InvestmentPlan, 
        on_delete=models.PROTECT, 
        related_name="subscribed_plan"
    )
    deposit = models.DecimalField(decimal_places=2, max_digits=50)
    revenue = ArrayField(
        models.DecimalField(decimal_places=2, max_digits=50)
    )
    investor = models.ForeignKey(
        "account.InvestorProfile",
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name="user_investments",
    )
    activated = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    closed_at = models.DateTimeField(null=True, blank=True)
        
    def __str__(self):
        return f"{self.plan} - {self.investor}"
        
    def can_withdraw(self, amount):
        return self.amount >= amount


class Wallet(models.Model):
    active = models.BooleanField(default=True)
    amount = models.DecimalField(decimal_places=2, max_digits=50, default=0.0)
    investor = models.OneToOneField("account.InvestorProfile",
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name="user_wallet",
    )
    def __str__(self):
        return f"wallet | {self.investor}"

    def can_withdraw(self, amount):
        return self.amount >= amount

class Ledger(models.Model):
    amount = models.DecimalField(decimal_places=2, max_digits=50)
    tx_type = models.CharField(
        max_length=10, 
        choices=LEDGER_CHOICES.choices,
        default=LEDGER_CHOICES.DEPOSIT
    )
    status = models.CharField(
        max_length=10, 
        default=APPROVAL_STATUS_CHOICES.PENDING,
        choices=APPROVAL_STATUS_CHOICES.choices
    )
    investor = models.ForeignKey(
        "account.InvestorProfile",
        null=True,
        blank=False,
        on_delete=models.SET_NULL,
        related_name="user_ledger",
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"* {self.tx_type} - {self.status} | {self.amount}  | {self.investor}"

    def credit_wallet(self, status):
        wallet:Wallet = self.investor.user_wallet
        wallet.amount += self.amount
        self.status = status
        wallet.save()


    def debit_wallet(self, status):
        wallet:Wallet = self.investor.user_wallet
        wallet.amount -= self.amount
        self.status = status
        wallet.save()

    class Meta:
        ordering = ['-created_at']
    