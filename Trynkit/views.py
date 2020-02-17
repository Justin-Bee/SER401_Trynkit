
from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
from .models import User
from django.views.decorators.csrf import csrf_exempt


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
    if request.POST.get('action') == 'post':
        uname = request.POST.get('username')
        psword = request.POST.get('password')
        eml = request.POST.get('email')

        User.objects.create(
            username=uname,
            password=psword,
            email=eml,
        )
        response_data['login'] = "False"
        return JsonResponse(response_data)

    elif request.GET.get('action') == 'get':
        uname = request.GET.get('username')
        pswd = request.GET.get('password')
        if User.objects.filter(username=uname, password=pswd).exists():
            response_data['login'] = "True"
        else:
            response_data['login'] = 'False'

        return JsonResponse(response_data)




