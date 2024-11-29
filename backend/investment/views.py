from django.shortcuts import render
from rest_framework.views import APIView
from django.utils.translation import gettext_lazy as _
from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework import status
from django.db import transaction
from account.permissions import IsInvestor
from investment.serializers import (
    InvestmentPlansSerializer
)
from investment.models import InvestmentPlan


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
