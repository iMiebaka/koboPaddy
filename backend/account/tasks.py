import jwt, os
from datetime import timedelta
from django.conf import settings
from django.utils import timezone
from django.shortcuts import get_object_or_404
from django.contrib.auth import get_user_model
from django.template.loader import render_to_string
from django.utils.translation import gettext_lazy as _
from generics.helpers.mail_client import MailClient
from time import sleep


User = get_user_model()


def send_verification_mail(user_id: int) -> None:

    if os.environ.get("ENV") == "test":
        return

    sleep(2)
    user = get_object_or_404(User, id=user_id)

    created = timezone.now()
    duration = 2880
    expires = created + timedelta(seconds=duration)
    payload = {"exp": expires, "iat": created, "email": user.email}
    token = jwt.encode(payload, str(settings.SECRET_KEY), algorithm="HS256")

    frontend_domain = os.getenv('FRONTEND_URL', 'http://localhost:5173')
    url = f"{frontend_domain}/account/email-verification?token={token}"

    context = {
        "token": token, "email": user.email,
        "url": url, "duration": duration,
        "name": user.full_name
    }
    html = render_to_string("email/verification.html", context)
    MailClient.send_mail(_("Account Verification"), recipients=[user.email], html=html)
    return token if os.environ.get("ENV") =="testing" else None