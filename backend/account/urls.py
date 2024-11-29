from django.contrib import admin
from django.urls import path
from account import views

urlpatterns = [
    path('register', views.RegisterAPIVIew.as_view()),
    path('login', views.LoginAPIVIew.as_view()),
    path('profile', views.ProfileAPIVIew.as_view()),
    path('refresh-token', views.TokenRefreshView.as_view()),
    path('verify', views.VerifyEmailAPIVIew.as_view()),
]
