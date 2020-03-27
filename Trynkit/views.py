
from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
from .models import User
from django.views.decorators.csrf import csrf_exempt
from django.core.mail import send_mail
from django.conf import settings
from django.core.mail import EmailMessage


# Create your views here.


def index(request):
    return render(request, 'index.html')


def devices(request):
    return render(request, 'devices.html')


def console(request):
    return render(request, 'console.html')

def forgot_pass(request):
    posts = User.objects.all()
    response_data = {}

    response = ""
    uname = request.POST.get('username')
    psword = request.POST.get('password')
    eml = request.POST.get('email')
    mail_subject = "Password Reminder!"
    message = "\nYour password is: " + psword
    email = EmailMessage(mail_subject, message, to=[eml])
    email.send()

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

     
    print(response)
    return JsonResponse(response_data)




