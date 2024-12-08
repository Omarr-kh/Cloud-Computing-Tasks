from django.contrib import admin
from django.urls import path, include

from django.http import JsonResponse
from django.conf import settings
from django.conf.urls.static import static

from django.http import HttpResponseForbidden
from functools import wraps

import os


def internal_only(view_func):
    @wraps(view_func)
    def _wrapped_view(request, *args, **kwargs):
        # Replace with the actual allowed IPs or conditions
        allowed_hosts = ['127.0.0.1', 'localhost']  # Modify as needed
        client_ip = request.META.get('REMOTE_ADDR', '')

        if client_ip not in allowed_hosts:
            return HttpResponseForbidden("This view is restricted to internal access.")

        return view_func(request, *args, **kwargs)

    return _wrapped_view


@internal_only
def get_firebase_config(request):
    return JsonResponse(settings.FIREBASE_CONFIG)


urlpatterns = [
    path('admin/', admin.site.urls),
    path('notifications/', include("notifications.urls")),
    path('chatroom/', include('chatrooms.urls')),
    path('api/firebase-config/', get_firebase_config, name='firebase-config'),
]

urlpatterns += static(
    'firebase-messaging-sw.js',
    document_root=os.path.join(
        settings.BASE_DIR, 'static', 'js', 'firebase-messaging-sw.js'
    ),
)
