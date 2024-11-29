from django.db import models
from django.utils.translation import gettext_lazy as _


class ACCOUNT_TYPE_CHOICES(models.TextChoices):
    INVESTOR = "investor", _("investor")
    ADMIN = "admin", _("admin")

