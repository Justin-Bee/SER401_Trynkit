# models.py
# Created by: Justin Bee
# 1/22/2020
#
# For use with the sqlite3 db

from django.db import models


class User(models.Model):
    username = models.CharField(max_length=50, primary_key=True, unique=True)
    password = models.CharField(max_length=50)
    email = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.username

