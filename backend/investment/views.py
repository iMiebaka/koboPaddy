from django.shortcuts import render
from rest_framework.views import APIView
from django.utils.translation import gettext_lazy as _
from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework import status
from django.db import transaction
from account.permissions import IsInvestor
from investment.serializers import (
    WalletSerializer,
    LedgerSerializer,
    SubscribePlansSerializer,
    InvestmentPlansSerializer,
    SubscribedPlanSerializer
)
from investment.models import (
    InvestmentPlan, Ledger, 
    Investment, LEDGER_CHOICES,
    APPROVAL_STATUS_CHOICES
)
from generics.pagination import MyPagination

class InvestmentPlansAPIVIew(APIView, MyPagination):
    permission_classes = (IsInvestor,)
    serializer_class = InvestmentPlansSerializer

    def get(self, request:Request, *args, **kwargs):
        queryset = InvestmentPlan.objects.all()
        context = {"request": request}
        paginated_queryset = self.paginator.paginate_queryset(queryset, request)
        serializer = self.serializer_class(paginated_queryset, context=context, many=True)

        data = dict()
        data["total_pages"] = self.total_pages
        data["page"] = self.page.number
        data["data"] = serializer.data
        return Response(data, status=status.HTTP_200_OK)



class SubscribeInvestmentAPIVIew(APIView, MyPagination):
    permission_classes = (IsInvestor,)
    serializer_class = SubscribePlansSerializer

    @transaction.atomic    
    def post(self, request:Request, *args, **kwargs):
        serializer = self.serializer_class(
            data=request.data, 
            context={"request": request}
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()

        data = dict()
        data["header"] = "success"
        data["body"] = _("Investment started"),
        data["data"] = None
        return Response(data, status=status.HTTP_201_CREATED)
    
    @transaction.atomic    
    def put(self, request:Request, *args, **kwargs):
        queryset = Investment.objects.filter(
            investor=request.user.investor_user,
        )
        serializer = self.serializer_class(
            queryset.first(),
            data=request.data, 
            context={"request": request},
            partial=True
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()

        data = dict()
        data["header"] = "success"
        data["body"] = _("Withdrawal init"),
        data["data"] = None
        return Response(data, status=status.HTTP_200_OK)
    
    def get(self, request:Request, *args, **kwargs):
        context = {"request": request}
        queryset = Investment.objects.filter(investor=request.user.investor_user)
        paginated_queryset = self.paginator.paginate_queryset(queryset, request)
        serializer = SubscribedPlanSerializer(paginated_queryset, context=context, many=True)


        data = dict()
        data["total_pages"] = self.total_pages
        data["page"] = self.page.number
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
        data["header"] = "success"
        data["body"] = _("Credit awaiting approval."),
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

from django.db.models import Sum

class DashboardAPIVIew(APIView):
    permission_classes = (IsInvestor,)
    
    def get(self, request:Request, *args, **kwargs):

        investments = Investment.objects.filter(investor=request.user.investor_user)
        completed_transactions = Ledger.objects.filter(
            investor=request.user.investor_user,
            status=APPROVAL_STATUS_CHOICES.APPROVED
        )

        # investments
        total_investments_amount = investments.aggregate(total=Sum('deposit'))['total']
        # Withdrawal
        total_withdrawal = completed_transactions.filter(
            tx_type=LEDGER_CHOICES.WITHDRAWAL).aggregate(total=Sum('amount'))['total']
        
        total_deposit = completed_transactions.filter(
            tx_type=LEDGER_CHOICES.DEPOSIT).aggregate(total=Sum('amount'))['total']
        
        data = {
            "total_investments_amount": total_investments_amount or 0,
            "total_withdrawal": total_withdrawal or 0,
            "total_deposit": total_deposit or 0
        }
        return Response(data, status=status.HTTP_200_OK)
           