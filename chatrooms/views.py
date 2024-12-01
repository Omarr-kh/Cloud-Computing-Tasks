from django.shortcuts import render

import json
import firebase_admin
from firebase_admin import auth, credentials
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.models import User

import traceback

# Initialize Firebase Admin SDK
try:
    firebase_admin.get_app()
except ValueError:
    cred = credentials.Certificate(
        'chatroom-a8d76-firebase-adminsdk-1a9y1-d935daeec7.json'
    )
    firebase_admin.initialize_app(cred)


def login(request):
    return render(request, 'chatrooms/login.html')


def home(request):
    return render(request, 'chatrooms/home.html')


@csrf_exempt
def verify_firebase_token(request):
    try:
        if request.method == 'POST':
            try:
                # Parse incoming JSON data
                data = json.loads(request.body)
                firebase_token = data.get('token')

                # Verify Firebase token
                decoded_token = auth.verify_id_token(
                    firebase_token, clock_skew_seconds=60
                )

                # Extract user information
                uid = decoded_token['uid']
                email = decoded_token.get('email')

                # Check if user exists in Django, create if not
                try:
                    User.objects.get(username=uid)
                except User.DoesNotExist:
                    User.objects.create_user(username=uid, email=email)

                return JsonResponse({'status': 'success', 'uid': uid, 'email': email})
            except Exception as e:
                print(traceback.format_exc())
                return JsonResponse({'status': 'error', 'message': str(e)}, status=400)
    except Exception as e:
        print(traceback.format_exc())
        return JsonResponse({'status': 'error', 'message': str(e)}, status=400)


# Logout view
def logout_view(request):
    try:
        # Typically, logout is handled on the client-side with Firebase
        # This is more of a session cleanup on Django side
        from django.contrib.auth import logout

        logout(request)
        return JsonResponse({'status': 'logged out'})
    except Exception as e:
        print(traceback.format_exc())
        return JsonResponse({'status': 'error', 'message': str(e)}, status=400)
