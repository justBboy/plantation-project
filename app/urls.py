from django.urls import path;
from . import views
from django.contrib.auth.views import LogoutView
from django.conf import settings

urlpatterns = [
    path('', views.index, name="home"),
    path('signup/', views.signup_view, name='signup'),
    path('donate/', views.donate_view, name='donate'),
    path('plant/', views.plant_view, name='plant'),
    path('profile/', views.profile_view, name='profile'),
    path('why_trees/', views.why_trees_view, name="why-trees"),
    path('store_locator/', views.store_locator_view, name="store-locator"),
    path('merchandise', views.merchandise_view, name="merchandise"),
    path('login/', views.login_view, name='login'),
    path('logout/', LogoutView.as_view(), {'next_page': settings.LOGOUT_REDIRECT_URL}, name='logout')
]