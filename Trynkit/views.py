
from django.shortcuts import render
from django.http import JsonResponse
from .models import User

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
        uname = request.POST.get('username')
        psword = request.POST.get('password')
        eml = request.POST.get('email')

        User.objects.create(
            username=uname,
            password=psword,
            email=eml,
        )

    return render(request, 'index.html', {'posts': posts})

def user_validation(request):
    if request.is_ajax and request.method == "GET":
        username = request.GET.get("username", None)
        if User.objects.filter(username = username).exists():
            return JsonResponse({"valid": False}, status = 200)
        else:
            return JsonResponse({"valid": True}, status = 200)
    return JsonResponse({}, status = 400 )
