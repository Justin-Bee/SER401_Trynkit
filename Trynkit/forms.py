from django import forms
from . models import Post
from . models import Get

class UserForm(forms.ModelForm):
    class Meta(object):
        model = User
        fields = ("username", "password", "email")