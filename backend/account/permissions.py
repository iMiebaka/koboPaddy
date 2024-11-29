from rest_framework import permissions


class IsInvestor(permissions.BasePermission):
    message = "Permission Denied"

    def has_permission(self, request, view) -> bool:
        if request.user.is_authenticated:
            print(request.user)
            if request.user.is_investor:
                return True
        return False
