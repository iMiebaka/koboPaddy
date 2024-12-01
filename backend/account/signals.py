from django.db.models.signals import post_save
from django.dispatch import receiver
from investment.models import Wallet
from account.models import User, InvestorProfile
from account.tasks import send_verification_mail
from threading import Thread


@receiver(post_save, sender=User)
def verify_user(sender, instance=None, created=False, **kwargs):
    print(instance.id)
    if instance and created and instance.is_investor:
        thread = Thread(target=send_verification_mail, args=(instance.id,))
        thread.daemon = True
        thread.start()

        investor = InvestorProfile.objects.create(user=instance)
        Wallet.objects.create(investor=investor)