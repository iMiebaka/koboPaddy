from django.db import models
from django.utils.translation import gettext_lazy as _


class LEDGER_CHOICES(models.TextChoices):
    DEPOSIT = "deposit", _("deposit")
    WITHDRAWAL = "withdrawal", _("withdrawal")


class APPROVAL_STATUS_CHOICES(models.TextChoices):
    PENDING = "pending", _("pending")
    APPROVED = "approved", _("approved")
    REJECTED = "rejected", _("rejected")