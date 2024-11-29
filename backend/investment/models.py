from django.db import models
from django.conf import settings
from investment.choices import LEDGER_CHOICES, APPROVAL_STATUS_CHOICES
from django.core.validators import FileExtensionValidator

ALLOWED_IMAGE_EXTS = ["png", "jpg", "jpeg", "webp"]

class InvestmentPlan(models.Model):
    plan = models.CharField(max_length=100)
    active = models.BooleanField(default=True)
    min_investment = models.DecimalField(decimal_places=2, max_digits=50)
    interest_rate = models.FloatField()
    image = models.ImageField(
        null=True,
        blank=True,
        upload_to="plans",
        validators=[FileExtensionValidator(ALLOWED_IMAGE_EXTS)],
    )
    def __str__(self):
        return f"{self.plan} at {self.interest_rate}"

class Inventment(models.Model):
    plan = models.ForeignKey(
        InvestmentPlan, 
        on_delete=models.PROTECT, 
        related_name="subscribed_plan"
    )
    amount = models.DecimalField(decimal_places=2, max_digits=50)
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


class Wallet(models.Model):
    active = models.BooleanField(default=True)
    amount = models.DecimalField(decimal_places=2, max_digits=50, default=0.0)
    investor = models.OneToOneField("account.InvestorProfile",
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name="user_wallet",
    )

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
    investor = models.OneToOneField(
        "account.InvestorProfile",
        null=True,
        blank=False,
        on_delete=models.SET_NULL,
        related_name="user_ledger",
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)