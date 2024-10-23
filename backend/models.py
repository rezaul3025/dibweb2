import os
from datetime import datetime
from pathlib import Path

from ckeditor.fields import RichTextField
from django.db import models
from django.conf import settings

from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin

class Event(models.Model):
    title = models.CharField(max_length=255)
    description = RichTextField()
    poster_image = models.FileField(upload_to='uploads', blank = True)
    address = models.CharField(max_length=255)
    map_location = models.CharField(max_length=255)
    event_datetime = models.DateTimeField()

def get_img_upload_path(instance, filename):
        return settings.UPLOAD_PATH

class Attendee(models.Model):
    name = models.CharField(max_length=255)
    email = models.CharField(max_length=255)
    phone = models.CharField(max_length=255)
    creation_date = models.DateTimeField(default=datetime.now)
    is_email_send = models.BooleanField(default=False)
    event = models.ForeignKey(Event, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.name},{self.email},{self.phone}, {self.creation_date}"

