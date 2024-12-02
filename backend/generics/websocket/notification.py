from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync


class WebSocketNotification:

    def __init__(self):
        self.channel_layer = get_channel_layer()

    def broker(self, message: str, user_id: int, status: str):
        async_to_sync(self.channel_layer.group_send)(
            f'notification_{user_id}',
            {'type': 'send.notification', 
             'message': {
              "status": status,
              "message": message
              }
            }
        )
    
    def wallet_credit_accepted(self, user_id: int):
        self.broker('Wallet Credit accepted', user_id, 'success')

    def wallet_credit_rejected(self, user_id: int):
        self.broker('Wallet Credit request rejected', user_id, 'error')

    def wallet_withdrawal_accepted(self, user_id: int):
        self.broker('Wallet withdrawal request accepted', user_id, 'sucess')

    def wallet_withdrawal_rejected(self, user_id: int):
        self.broker('Wallet withdrawal request rejected', user_id, 'error')