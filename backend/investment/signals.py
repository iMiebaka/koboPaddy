from django.db.models.signals import pre_save
from django.dispatch import receiver
from investment.models import Ledger
from investment.tasks import (
    send_transaction_pending_mail, 
    send_approved_withdrawal_mail, 
    send_rejection_withdrawal_mail,
    send_approved_credit_mail,
    send_rejection_credit_mail
)
from threading import Thread
from investment.choices import LEDGER_CHOICES, APPROVAL_STATUS_CHOICES

@receiver(pre_save, sender=Ledger)
def manage_wallet_notification(sender, instance=None, created=False, **kwargs):
    # This signal creates/debit wallet for investor

    # # New transaction
    # if instance and not instance.id:
    #     thread = Thread(target=send_transaction_pending_mail, args=(instance.investor.user.id, instance.tx_type,))
    #     thread.start()
    
    # Task on deposit
    if instance and instance.id:
        if instance.tx_type == LEDGER_CHOICES.DEPOSIT:
            ledger = Ledger.objects.filter(id=instance.id).first()
            # Credit wallet of investor
            if ledger.status == APPROVAL_STATUS_CHOICES.PENDING and instance.status == APPROVAL_STATUS_CHOICES.APPROVED:
                ledger.credit_wallet(APPROVAL_STATUS_CHOICES.APPROVED)
                thread = Thread(target=send_approved_credit_mail, args=(instance.investor.user.id, ledger.amount))
                thread.start()
            elif ledger.status == APPROVAL_STATUS_CHOICES.PENDING and instance.status == APPROVAL_STATUS_CHOICES.REJECTED:
                thread = Thread(target=send_rejection_credit_mail, args=(instance.investor.user.id, ledger.amount))
                thread.start()

            elif ledger.status == APPROVAL_STATUS_CHOICES.APPROVED and instance.status == APPROVAL_STATUS_CHOICES.REJECTED:
                # Call the cops
                pass

        elif instance.tx_type == LEDGER_CHOICES.WITHDRAWAL:
            ledger = Ledger.objects.filter(id=instance.id).first()
            
            # Debit wallet of investor
            if ledger.status == APPROVAL_STATUS_CHOICES.PENDING and instance.status == APPROVAL_STATUS_CHOICES.APPROVED:
                ledger.debit_wallet(APPROVAL_STATUS_CHOICES.APPROVED)
                thread = Thread(target=send_approved_withdrawal_mail, args=(instance.investor.user.id, ledger.amount))
                thread.start()
                
            if ledger.status == APPROVAL_STATUS_CHOICES.PENDING and instance.status == APPROVAL_STATUS_CHOICES.REJECTED:
                thread = Thread(target=send_rejection_withdrawal_mail, args=(instance.investor.user.id, ledger.amount))
                thread.start()
                
            if ledger.status == APPROVAL_STATUS_CHOICES.APPROVED and instance.status == APPROVAL_STATUS_CHOICES.REJECTED:
                # Call the cops
                pass