from django.db import models
from django.contrib.auth.models import AbstractBaseUser
from account.managers import UserManager
from account.choices import ACCOUNT_TYPE_CHOICES
from django.conf import settings


class User(AbstractBaseUser):
    email = models.EmailField(max_length=255, unique=True)
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    is_active = models.BooleanField(default=False, blank=True)
    is_verified = models.BooleanField(default=False, blank=True)
    is_superuser = models.BooleanField(default=False, blank=True)
    account_type = models.CharField(max_length=10, choices=ACCOUNT_TYPE_CHOICES.choices)
    created_at = models.DateTimeField(auto_now_add=True)

    objects = UserManager()

    EMAIL_FIELD = "email"
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["first_name", "last_name"]

    @property
    def full_name(self):
        return f"{self.first_name} {self.last_name}"

    @property
    def is_investor(self):
        return self.account_type == ACCOUNT_TYPE_CHOICES.INVESTOR
    
    @property
    def is_admin(self):
        return self.account_type == ACCOUNT_TYPE_CHOICES.ADMIN

    def has_perm(self, perm, obj=None) -> bool:
        """django internal use"""
        return self.is_superuser
    
    def has_module_perms(self, app_label) -> bool:
        """django internal use"""
        return self.is_superuser
    
    @property
    def is_staff(self) -> bool:
        return self.is_superuser
    
    def __str__(self):
        return f"{self.full_name} | {self.account_type}"
    

class InvestorProfile(models.Model):
    user = user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name="investor_user",
    )
    def __str__(self):
        return f"{self.user}"
    