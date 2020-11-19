from django.shortcuts import render, redirect, reverse
from django.contrib.auth import login, authenticate
from .forms import SignUpForm, DonateForm, PlantForm, LoginForm
from .models import Donation, Plantation
from django.contrib.auth.decorators import login_required
from django.http import HttpResponseRedirect

def index(request):
    return render(request, 'app/home.html')


def signup_view(request):
    form = SignUpForm(request.POST or None)
    if form.is_valid():
        user = form.save()
        user.refresh_from_db()
        user.profile.planter = form.cleaned_data.get('planter')
        user.profile.donator = form.cleaned_data.get('donator')
        user.save()
        username = form.cleaned_data.get('username')
        password = form.cleaned_data.get('password1')
        user = authenticate(username=username, password=password)
        login(request, user)
        return redirect('home')
    
    return render(request, 'registration/signUp.html', {'form': form})

def login_view(request):
    form = LoginForm(request.POST or None)
    redirect_to = request.GET.get('next', '')
    if request.POST:
        if form.is_valid():
            username = form.cleaned_data.get('username')
            password = form.cleaned_data.get('password')
            user = authenticate(username=username, password=password)
            if user:
                login(request, user)
                nextPage = request.GET.get('next', '')
                return HttpResponseRedirect(nextPage)
            else:
                error = True
                return render(request, 'registration/login.html', {'form': form, 'error': error, 'redirect_to': redirect_to})
    return render(request, 'registration/login.html', {'form': form, 'redirect_to': redirect_to})

@login_required
def donate_view(request):
    form = DonateForm(request.POST or None)
    succeeded = False
    amount = 0
    city = None
    if request.POST:
        if form.is_valid():
            newDonation = Donation.objects.create(user=request.user, amount=request.POST.get('amount'), city=request.POST.get('city'))
            newDonation.save()
            request.user.profile.donator = True
            request.user.profile.save()
            amount = form.cleaned_data['amount']
            city = form.cleaned_data['city']
            succeeded = True

    context = {
        'form': form,
        'amount': amount,
        'city': city,
        'succeeded': succeeded
    }
    return render(request, 'app/donate.html', context=context)

@login_required
def plant_view(request):
    form = PlantForm(request.POST or None)
    succeeded = False
    fromCity = None
    if request.POST:
        if form.is_valid():
            newPlantation = Plantation.objects.create(user=request.user, city=form.cleaned_data['city'])
            newPlantation.save()
            request.user.profile.planter = True
            request.user.profile.save()
            fromCity = form.cleaned_data['city']
            succeeded = True

    context = {
        'form': form,
        'city': fromCity,
        'succeeded': succeeded
    }
    return render(request, 'app/plant.html', context=context)

@login_required
def profile_view(request):
    return render(request, 'app/profile.html')

def why_trees_view(request):
    return render(request, 'app/why_trees.html')