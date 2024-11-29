import jwt, os
from datetime import timedelta
from django.conf import settings
from django.utils import timezone
from django.shortcuts import get_object_or_404
from django.contrib.auth import get_user_model
from django.template.loader import render_to_string
from django.utils.translation import gettext_lazy as _
from generics.helpers.mail_client import MailClient

User = get_user_model()


def send_pending_withdrawal_mail(user_id: int) -> None:
    user = get_object_or_404(User, id=user_id)
    context = {
        "email": user.email,
        "name": user.full_name
    }
    html = render_to_string("email/pending-withdrawal.html", context)
    MailClient.send_mail(_("Withdrawal Pending"), recipients=[user.email], html=html)


def send_approved_withdrawal_mail(user_id: int) -> None:
    user = get_object_or_404(User, id=user_id)

    context = {
        "email": user.email,
        "name": user.full_name
    }
    html = render_to_string("email/notify-approval.html", context)
    MailClient.send_mail(_("Withdrawal Approved"), recipients=[user.email], html=html)
