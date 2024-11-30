from django.db.models.signals import pre_save
from django.dispatch import receiver
from investment.models import Ledger
from investment.tasks import send_pending_withdrawal_mail, send_approved_withdrawal_mail
from threading import Thread
from investment.choices import LEDGER_CHOICES, APPROVAL_STATUS_CHOICES

@receiver(pre_save, sender=Ledger)
def manage_wallet_notification(sender, instance=None, created=False, **kwargs):
    # This signal creates wallet for investor

    if instance and instance.tx_type != LEDGER_CHOICES.WITHDRAWAL and not created:
        return
    
    if instance and instance.status == APPROVAL_STATUS_CHOICES.PENDING:
        thread = Thread(target=send_pending_withdrawal_mail, args=(instance.investor.user.id,))
        thread.start()

    elif instance and instance.tx_type == LEDGER_CHOICES.WITHDRAWAL:
        ledger = Ledger.objects.filter(id=instance.id).first()
        
        if ledger.status == APPROVAL_STATUS_CHOICES.PENDING and instance.status == APPROVAL_STATUS_CHOICES.APPROVED:
            ledger.debit_wallet(APPROVAL_STATUS_CHOICES.APPROVED)

            thread = Thread(target=send_approved_withdrawal_mail, args=(instance.investor.user.id, ledger.amount))
            thread.start()
        if ledger.status == APPROVAL_STATUS_CHOICES.APPROVED and instance.status == APPROVAL_STATUS_CHOICES.REJECTED:
            # Call the cops
            pass