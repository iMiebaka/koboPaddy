from django.utils import timezone
from django.contrib.auth.models import BaseUserManager
from django.utils.translation import gettext_lazy as _
from account.choices import ACCOUNT_TYPE_CHOICES

class UserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError(_("Users must have an email address"))

        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.update({"is_superuser": True})
        extra_fields.update({"is_active": True})
        extra_fields.update({"account_type": ACCOUNT_TYPE_CHOICES.ADMIN})

        user = self.create_user(email, password, **extra_fields)
        user.save(using=self._db)
        return user
