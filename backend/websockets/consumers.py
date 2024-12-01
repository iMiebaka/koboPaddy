import json
from asgiref.sync import async_to_sync
from django.shortcuts import get_object_or_404
from channels.generic.websocket import WebsocketConsumer



class NotificationConsumer(WebsocketConsumer):
    def connect(self):
        self.user = self.scope["user"]
        self.room_group_name = f"notification{self.user.id}"

        async_to_sync(self.channel_layer.group_add)(
            self.room_group_name, self.channel_name
        )
        self.accept()
        print("accept")

    def disconnect(self, code):
        return super().disconnect(code)

    def receive(self, text_data=None, bytes_data=None):
        print("recieved")
        return super().receive(text_data, bytes_data)

    def send(self, text_data=None, bytes_data=None, close=False):
        print("send")
        return super().send(json.loads(text_data), bytes_data, close)


