from django.urls import path
from .views import *

urlpatterns = [
    path('register/', register_user, name="register"),
    path('send-notification/', send_notification, name="send-notification"),
    path('home/', home, name="home"),
    path('add-topic/', create_topic, name='create-topic'),
    path('delete-topic/<str:topic_id>/', delete_topic, name='delete-topic'),
    path('get-topics/', get_topics, name='get-topics'),
    path('subscribe-topic/', subscribe_topic, name='subscribe-topic'),
]
