from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User

class SignUpForm(UserCreationForm):
    planter = forms.BooleanField(required=False)
    donator = forms.BooleanField(required=False)

    class Meta:
        model = User
        fields = ('username', 'email', 'planter', 'donator', 'password1', 'password2')

class LoginForm(forms.Form):
    username = forms.CharField(max_length=128, widget=forms.TextInput(attrs={
        'class': 'form-control'
    }))
    password = forms.CharField(max_length=128, widget=forms.PasswordInput(attrs={
        'class': 'form-control'
    }))

class PlantForm(forms.Form):
    city = forms.CharField(max_length=128, widget=forms.TextInput(attrs={'class': 'form-control', 'id': 'city-name'}))

class DonateForm(forms.Form):
    city = forms.CharField(max_length=128, widget=forms.TextInput(attrs={'class': 'form-control', 'id': 'city-name'}))
    amount = forms.DecimalField(max_value=10000, decimal_places=2)