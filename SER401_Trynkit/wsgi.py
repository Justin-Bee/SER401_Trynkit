"""
WSGI config for SER401_Trynkit project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/2.2/howto/deployment/wsgi/
"""
# @author: Justin Bee
# @date: 10/6/2019

import os

from django.core.wsgi import get_wsgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'SER401_Trynkit.settings')

application = get_wsgi_application()
