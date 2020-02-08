
from django.shortcuts import render
from django.http import JsonResponse
from .models import User
from django.contrib.auth.models import User

# Create your views here.


def index(request):
    return render(request, 'index.html')


def devices(request):
    return render(request, 'devices.html')


def console(request):
    return render(request, 'console.html')


def create_user(request):
    posts = User.objects.all()
    response_data = {}
    if request.POST.get('action') == 'post':
        username = request.POST.get('username')
        password = request.POST.get('password')
        email = request.POST.get('email')

        response_data['username'] = username
        response_data['password'] = password
        response_data['email'] = email

        User.objects.create(
            username = username,
            password = password,
            email = email,
        )



        return JsonResponse(response_data)

    return render(request, 'index.html', {'posts': posts})
