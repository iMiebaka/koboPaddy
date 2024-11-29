from django.shortcuts import render
from rest_framework.views import APIView
from django.utils.translation import gettext_lazy as _
from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework import status
from django.db import transaction
from account.permissions import IsInvestor
from investment.serializers import (
    InvestmentPlansSerializer,
    WalletSerializer,
    LedgerSerializer
)
from investment.models import InvestmentPlan, Wallet, Ledger
from rest_framework.pagination import LimitOffsetPagination
from generics.pagination import CustomPagination, MyPagination

class InvestmentPlansAPIVIew(APIView):
    permission_classes = (IsInvestor,)
    serializer_class = InvestmentPlansSerializer

    def get(self, request:Request, *args, **kwargs):
        queryset = InvestmentPlan.objects.all()
        context = {"request": request}
        serializer = self.serializer_class(queryset, context=context, many=True)

        data = dict()
        data["status"] = "success"
        data["message"] = _("Profile Retrieved.")
        data["data"] = serializer.data
        return Response(data, status=status.HTTP_200_OK)



class SubscribeInvestmentAPIVIew(APIView):
    permission_classes = (IsInvestor,)
    serializer_class = InvestmentPlansSerializer

    def get(self, request:Request, *args, **kwargs):
        queryset = InvestmentPlan.objects.all()
        serializer = self.serializer_class(queryset, many=True)

        data = dict()
        data["status"] = "success"
        data["message"] = _("Profile Retrieved.")
        data["data"] = serializer.data
        return Response(data, status=status.HTTP_200_OK)


class WalletAPIVIew(APIView):
    permission_classes = (IsInvestor,)
    serializer_class = WalletSerializer

    @transaction.atomic    
    def put(self, request:Request, *args, **kwargs):
        """Withdraw funds"""
        queryset = request.user.investor_user.user_wallet
        serializer = self.serializer_class(
            queryset,
            data=request.data, 
            context={"request": request},
            partial=True
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()
        
        data = dict()
        data["header"] = "success"
        data["body"] = _("Withdrawal awaiting approval"),
        data["data"] = serializer.data
        return Response(data, status=status.HTTP_201_CREATED)
    
    @transaction.atomic    
    def post(self, request:Request, *args, **kwargs):
        """Credit wallet"""
        serializer = self.serializer_class(

            data=request.data, 
            context={"request": request}
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()

        data = dict()
        data["status"] = "success"
        data["message"] = _("Account Credited.")
        data["data"] = serializer.data
        return Response(data, status=status.HTTP_201_CREATED)
    
    def get(self, request:Request, *args, **kwargs):
        queryset = request.user.investor_user.user_wallet
        serializer = self.serializer_class(queryset)

        return Response(serializer.data, status=status.HTTP_200_OK)


class LedgerAPIVIew(APIView, MyPagination):
    permission_classes = (IsInvestor,)
    serializer_class = LedgerSerializer

    def get(self, request:Request, *args, **kwargs):
        queryset = Ledger.objects.filter(investor=request.user.investor_user)
        paginated_queryset = self.paginator.paginate_queryset(queryset, request)
        serializer = self.serializer_class(paginated_queryset, many=True)
        
        data = dict()
        data["total_pages"] = self.total_pages
        data["page"] = self.page.number
        data["data"] = serializer.data
        return Response(data, status=status.HTTP_200_OK)
