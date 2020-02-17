
from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
from .models import User

# Create your views here.


def index(request):
    return render(request, 'index.html')


def devices(request):
    return render(request, 'devices.html')


def console(request):
    return render(request, 'console.html')


def login_user(request):
    response_data = {}
    if request.GET.get('action') == 'get':
        response_data['login'] = "True"
        return JsonResponse('True')


def create_user(request):
    posts = User.objects.all()
    response_data = {}
    if request.POST.get('action') == 'post':
        uname = request.POST.get('username')
        psword = request.POST.get('password')
        eml = request.POST.get('email')

        User.objects.create(
            username=uname,
            password=psword,
            email=eml,
        )

    return render(request, 'index.html', {'posts': posts})



