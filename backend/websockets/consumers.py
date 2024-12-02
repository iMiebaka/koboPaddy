import json
from asgiref.sync import async_to_sync
from django.shortcuts import get_object_or_404
from channels.generic.websocket import WebsocketConsumer



class NotificationConsumer(WebsocketConsumer):
    def connect(self):
        self.user = self.scope["user"]
        self.room_group_name = f"notification_{self.user.investor_user.id}"

        async_to_sync(self.channel_layer.group_add)(
            self.room_group_name, self.channel_name
        )
        self.accept()

    def disconnect(self, close_code):
        async_to_sync(self.channel_layer.group_discard)(
            self.room_group_name, self.channel_name
        )

    def send_notification(self, event):
        message = event["message"]
        return self.send(text_data=json.dumps(message))


