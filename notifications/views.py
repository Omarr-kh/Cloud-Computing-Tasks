from django.shortcuts import render
from django.contrib.auth.models import User

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from fcm_django.models import FCMDevice
from firebase_admin.messaging import Message, Notification, SendResponse
from firebase_admin import messaging

from .models import Topic
from .serializers import TopicSerializer

import traceback


@api_view(["POST"])
def create_topic(request):
    try:
        name = request.data.get("name")
        description = request.data.get("description")

        Topic.objects.create(name=name, description=description)

        return Response(status=status.HTTP_201_CREATED)
    except:
        print(traceback.format_exc())
        return Response(status=status.HTTP_409_CONFLICT)


@api_view(["GET"])
def get_topics(request):
    try:
        topics = Topic.objects.all()
        serializer = TopicSerializer(topics, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except:
        print(traceback.format_exc())
        return Response(status=status.HTTP_409_CONFLICT)


@api_view(["DELETE"])
def delete_topic(request, topic_id):
    try:
        topic = Topic.objects.get(id=topic_id)
        topic.delete()
        return Response(
            {"message": "Topic deleted successfully"}, status=status.HTTP_200_OK
        )
    except:
        print(traceback.format_exc())
        return Response(status=status.HTTP_409_CONFLICT)


@api_view(["POST"])
def register_user(request):
    try:
        token = request.data.get('token')

        print(f"Registration Token: {token}")

        FCMDevice.objects.get_or_create(registration_id=token, type="web")

    except Exception as e:
        print(f"Error: {str(e)}")
        return Response({"error": "There was an error!"}, status=400)

    return Response(status=status.HTTP_200_OK)


@api_view(["POST"])
def send_notification(request):
    registration_token = request.data.get('registration_token')
    fcm_dev = FCMDevice.objects.get(registration_id=registration_token)

    # Ensure you are sending the message to the correct device
    message = Message(
        notification=Notification(
            title="Test Notification", body="This is a test notification"
        ),
        token=registration_token,
    )
    response = fcm_dev.send_message(message)
    if isinstance(response, SendResponse):
        print(f"FCM Response: {response.message_id}")  # Message ID if successful
    else:
        print(f"FCM Error: {response}")

    return Response(status=status.HTTP_200_OK)


@api_view(["GET"])
def home(request):
    try:
        return render(request, 'notifications/topics.html')
    except:
        print(traceback.format_exc())
        return Response(status=status.HTTP_409_CONFLICT)


@api_view(["POST"])
def subscribe_topic(request):
    try:
        # Extract token and topic from the request
        token = request.data.get('token')
        topic = request.data.get('topic')
        # Use Firebase Admin SDK to subscribe the token to the topic
        response = messaging.subscribe_to_topic(tokens=[token], topic=topic)
        return Response(status=status.HTTP_200_OK)
    except:
        print(traceback.format_exc())
        return Response(status=status.HTTP_409_CONFLICT)
