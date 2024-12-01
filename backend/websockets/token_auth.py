import jwt
from django.conf import settings
from channels.db import database_sync_to_async
from channels.exceptions import DenyConnection
from channels.exceptions import StopConsumer
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.tokens import AccessToken

User = get_user_model()



@database_sync_to_async
def get_user(token):
    try:
        res = AccessToken(token)
        return User.objects.get(id=res["user_id"])
    except:
        raise StopConsumer()
    
    

class TokenAuthMiddleware:
    """
    Token authorization middleware for Django Channels 2
    """

    def __init__(self, app):
        self.app = app

    async def __call__(self, scope, receive, send):
        headers = dict(scope['headers'])
        try:
            _, token_key = headers[b'authorization'].decode().split()
            scope['user'] = await get_user(token_key)
        except Exception as ex:
            await send({
                    'type': 'http.response',
                    'status': 401,
                    'body': "Not authenticated",  # Sending the error message as the response body
                })
            raise DenyConnection()
        return await self.app(scope, receive, send)
        
