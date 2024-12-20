from django.contrib import admin
from django.urls import path
from investment import views

urlpatterns = [
    path('plans', views.InvestmentPlansAPIVIew.as_view()),
    path('dashboard', views.DashboardAPIVIew.as_view()),
    path('subcriptions', views.SubscribeInvestmentAPIVIew.as_view()),
    path('ledger', views.LedgerAPIVIew.as_view()),
    path('wallet', views.WalletAPIVIew.as_view()),
]
