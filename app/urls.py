from django.urls import path;
from . import views

urlpatterns = [
    path('', views.index, name="home"),
    path('signup/', views.signup_view, name='signup'),
    path('donate/', views.donate_view, name='donate'),
    path('plant/', views.plant_view, name='plant'),
    path('profile/', views.profile_view, name='profile'),
    path('why_trees/', views.why_trees_view, name="why-trees")
]