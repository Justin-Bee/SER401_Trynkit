from django.http import HttpResponse
from django.shortcuts import render

# @author: Justin Bee
# @date: 10/6/2019

def index(request):
    return render(request, 'index.html')

