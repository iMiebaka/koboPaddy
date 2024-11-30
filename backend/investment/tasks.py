from django.shortcuts import get_object_or_404
from django.contrib.auth import get_user_model
from django.template.loader import render_to_string
from django.utils.translation import gettext_lazy as _
from generics.helpers.mail_client import MailClient

User = get_user_model()


def send_transaction_pending_mail(user_id: int, tx_type) -> None:
    user = get_object_or_404(User, id=user_id)
    context = {
        "email": user.email,
        "name": user.full_name,
        "tx_type": tx_type
    }
    html = render_to_string("email/pending-transaction.html", context)
    MailClient.send_mail(_("Withdrawal Pending"), recipients=[user.email], html=html)


def send_approved_withdrawal_mail(user_id: int, amount: float) -> None:
    user = get_object_or_404(User, id=user_id)

    context = {
        "email": user.email,
        "name": user.full_name,
        "amount": '{:0,.2f}'.format(amount)
    }
    html = render_to_string("email/notify-approval.html", context)
    MailClient.send_mail(_("Withdrawal Approved"), recipients=[user.email], html=html)


def send_rejection_withdrawal_mail(user_id: int, amount: float) -> None:
    user = get_object_or_404(User, id=user_id)

    context = {
        "email": user.email,
        "name": user.full_name,
        "amount": '{:0,.2f}'.format(amount)
    }
    html = render_to_string("email/reject-withdrawal.html", context)
    MailClient.send_mail(_("Withdrawal Rejected"), recipients=[user.email], html=html)


def send_approved_credit_mail(user_id: int, amount: float) -> None:
    user = get_object_or_404(User, id=user_id)

    context = {
        "email": user.email,
        "name": user.full_name,
        "amount": '{:0,.2f}'.format(amount)
    }
    html = render_to_string("email/credit-approval.html", context)
    MailClient.send_mail(_("Credit Approved"), recipients=[user.email], html=html)


def send_rejection_credit_mail(user_id: int, amount: float) -> None:
    user = get_object_or_404(User, id=user_id)

    context = {
        "email": user.email,
        "name": user.full_name,
        "amount": '{:0,.2f}'.format(amount)
    }
    html = render_to_string("email/reject-credit.html", context)
    MailClient.send_mail(_("Credit Rejected"), recipients=[user.email], html=html)
