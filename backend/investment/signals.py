from django.db.models.signals import post_save
from django.dispatch import receiver
from investment.models import Inventment, Wallet, Ledger
from account.models import User
from investment.tasks import send_pending_withdrawal_mail, send_approved_withdrawal_mail
from threading import Thread
from investment.choices import LEDGER_CHOICES, APPROVAL_STATUS_CHOICES

@receiver(post_save, sender=Ledger)
def manage_wallet_notification(sender, instance=None, created=False, **kwargs):
    # This signal creates wallet for investor

    if instance and instance.tx_type != LEDGER_CHOICES.WITHDRAWAL:
        return

    if instance  and created and instance.status == APPROVAL_STATUS_CHOICES.PENDING:
        thread = Thread(target=send_pending_withdrawal_mail, args=(instance.investor.user.id,))
        thread.start()

    if instance and not created:
        ledger = Ledger.objects.get(instance.id)
        if ledger.status == 'PENDING' and instance.status == "APPROVED":
            ledger.credit_wallet(APPROVAL_STATUS_CHOICES.APPROVED)
            # wallet = Wallet.objects.get(user=instance.user)
            # wallet.balance += ledger.amount
            # wallet.save()
            # ledger.status = "COMPLETED"
            # ledger.save()
        
            thread = Thread(target=send_approved_withdrawal_mail, args=(instance.investor.user.id,))
            thread.start()