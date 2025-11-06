from django import forms
from .models import Student, StudentClass

class StudentForm(forms.ModelForm):
    class Meta:
        model = Student
        fields = [
            "first_name",
            "last_name",
            "address",
            "email",
            "phone_number",
            "shift",
            "classes",
            "siblings",
            "monthly_fee",
        ]