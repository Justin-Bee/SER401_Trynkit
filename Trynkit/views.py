import serial
from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
from .models import User
from django.views.decorators.csrf import csrf_exempt
from django.core.mail import send_mail
from django.conf import settings
from django.core.mail import EmailMessage
import logging
import sys


# Create your views here.


def index(request):
    return render(request, 'index.html')


def devices(request):
    return render(request, 'devices.html')


def console(request):
    return render(request, 'console.html')


@csrf_exempt
def create_user(request):
    posts = User.objects.all()
    response_data = {}

    response = ""
    
    if request.POST.get('action') == 'post':
        uname = request.POST.get('username')
        psword = request.POST.get('password')
        eml = request.POST.get('email')
        
        if User.objects.filter(username=uname, email=eml).exists():
            response = "FalseU"
            response_data['login'] = 'FalseU'
        elif User.objects.filter(email=eml).exists():
            response = "FalseE"
            response_data['login'] = 'FalseE'
        else:
            User.objects.create(
                username=uname,
                password=psword,
                email=eml,
            )
            response = "True"
            response_data['login'] = 'True'
            mail_subject = "Thank you for registering!"
            message = "Your username is: " + uname + "\nYour password is: " + psword
            email = EmailMessage(mail_subject, message, to=[eml])
            email.send()

    elif request.GET.get('action') == 'get':
        uname = request.GET.get('username')
        pswd = request.GET.get('password')
        if User.objects.filter(username=uname, password=pswd).exists():
            response_data['login'] = "True"
        else:
            response_data['login'] = 'False'

    elif request.GET.get('action') == 'forgot':
        uname = request.GET.get('username')
        try:
            thisUser = User.objects.get(username=uname)
            response_data['login'] = 'True'
            mail_subject = "Password Reminder"
            message = "Hello, " + thisUser.username + ", your password is: " + thisUser.password
            email = EmailMessage(mail_subject, message, to=[thisUser.email])
            email.send()
        except User.DoesNotExist:
            response_data['login'] = 'False'

    elif request.POST.get('action') == 'update':
        uname = request.POST.get('username')
        pswd = request.POST.get('password')
        obj = User.objects.get(username = uname)
        obj.password = pswd
        obj.save()
        response_data['login'] = 'True'

    elif request.POST.get('action') == 'save':
        filename = request.POST.get('filename')
        contents = request.POST.get('contents')
        uname = request.POST.get('username')
        number = request.POST.get('number')
        content = bytearray()
        content.extend(contents.encode())
        obj = User.objects.get(username = uname)
        if number == "1":
            obj.file1name = filename
            obj.file1 = content
        elif number == "2":
            obj.file2name = filename
            obj.file2 = content
        elif number == "3":
            obj.file3name = filename
            obj.file3 = content
        elif number == "4":
            obj.file4name = filename
            obj.file4 = content
        elif number == "5":
            obj.file5name = filename
            obj.file5 = content
        obj.save()
        response_data['saved'] = 'True'
     
    print(response)
    return JsonResponse(response_data)




