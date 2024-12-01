from django.urls import re_path

from websockets import consumers

websocket_urlpatterns = [
    re_path(r"notifications/$", consumers.NotificationConsumer.as_asgi()),
]
