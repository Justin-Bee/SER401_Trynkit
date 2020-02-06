from django.http import HttpResponse
from django.shortcuts import render
from django.contrib.auth.decorators import login_required

# @author: Justin Bee, Brian Carson
# @date: 10/6/2019

@login_required(login_url='/accounts/login/')
def index(request):
    return render(request, 'index.html')

def devices(request):
    return render(request, 'devices.html')

def console(request):
    return render(request, 'console.html')
