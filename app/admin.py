from django.contrib import admin
from .models import Profile, Donation, Plantation


admin.site.site_header = 'Aranyani'
admin.site.register(Profile)
admin.site.register(Donation)
admin.site.register(Plantation)