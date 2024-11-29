from django.db.models.signals import post_save
from django.dispatch import receiver
from investment.models import Wallet
from account.models import User, InvestorProfile


@receiver(post_save, sender=User)
def verify_user(sender, instance=None, created=False, **kwargs):
    pass

@receiver(post_save, sender=User)
def create_wallet(sender, instance=None, created=False, **kwargs):
    # This signal creates wallet for investor

    if instance and created:
        investor = InvestorProfile.objects.create(user=instance)
        Wallet.objects.create(investor=investor)