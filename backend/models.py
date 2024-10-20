from datetime import datetime

from ckeditor.fields import RichTextField
from django.db import models

from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin

class Attendee(models.Model):
    name = models.CharField(max_length=255)
    email = models.CharField(max_length=255)
    phone = RichTextField()
    creation_date = models.DateTimeField(default=datetime.now)

    def __str__(self):
        return f"{self.name},{self.email},{self.phone}, {self.creation_date}"

