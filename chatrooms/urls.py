from django.urls import path

from .views import *

urlpatterns = [
    path('', home, name='home-page'),
    path('login/', login, name='login-page'),
    path('logout/', logout_view, name='logout-page'),
    path('auth/verify-token/', verify_firebase_token, name='verify_token'),
    path('auth/logout/', logout_view, name='logout'),
]
