from rest_framework.exceptions import APIException
from rest_framework.views import exception_handler


def custom_exception_handler(exc, context):
    # Call REST framework's default exception handler first,
    # to get the standard error response.
    response = exception_handler(exc, context)
    # Now add the HTTP status code to the response.
    if response is not None:
        response.data = {}
        response.data["status"] = "error"
        if response.status_code == 404:
            response.data["message"] = (
                exc.detail if hasattr(exc, "detail") else "Not Found"
            )
            response.data["details"] = None
        elif response.status_code == 400:
            response.data["message"] = exc.default_detail
            response.data["details"] = exc.detail
        else:
            response.data["message"] = getattr(exc, "detail", exc.default_detail)
            response.data["details"] = None
    return response
