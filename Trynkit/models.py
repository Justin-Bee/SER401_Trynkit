# models.py
# Created by: Justin Bee
# 1/22/2020
#
# For use with the sqlite3 db

import django.db
from django.db import models


class User(models.Model):
    username = models.CharField(max_length=50, primary_key=True, unique=True)
    password = models.CharField(max_length=50)
    email = models.CharField(max_length=100, unique=True)
    file1name = models.CharField(null=True, max_length=50)
    file1 = models.BinaryField(default=bytes(0), max_length=100)
    file2name = models.CharField(null=True, max_length=50)
    file2 = models.BinaryField(default=bytes(0), max_length=100)
    file3name = models.CharField(null=True, max_length=50)
    file3 = models.BinaryField(default=bytes(0), max_length=100)
    file4name = models.CharField(null=True, max_length=50)
    file4 = models.BinaryField(default=bytes(0), max_length=100)
    file5name = models.CharField(null=True, max_length=50)
    file5 = models.BinaryField(default=bytes(0), max_length=100)

    def __str__(self):
        return self.username

