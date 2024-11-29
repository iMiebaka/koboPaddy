from django.conf import settings
from django.core.mail import get_connection, EmailMultiAlternatives


class MailClient:
    """Convenient class for sending single mails and bulk mails in an optimized manner"""

    @staticmethod
    def send_mail(
        title: str,
        recipients: list,
        body: str = "",
        html: str = "",
        reply_to: list = [],
        attachments: list = [],
    ) -> None:
        connection = get_connection()
        connection.open()

        msg = EmailMultiAlternatives(
            body=body,
            to=recipients,
            subject=title,
            reply_to=reply_to,
            connection=connection,
            from_email=settings.DEFAULT_FROM_EMAIL,
        )

        if html:
            msg.attach_alternative(html, "text/html")

        if attachments:
            for attachment in attachments:
                msg.attach(*attachment)

        msg.send(fail_silently=False)
        connection.close()

