from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    planter = models.BooleanField(default=False)
    donator = models.BooleanField(default=False)
    point = models.IntegerField(default=0)

    def __str__(self):
        return self.user.username

@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)
    instance.profile.save()

class Donation(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    amount = models.DecimalField(decimal_places=4, max_digits=50)
    city = models.CharField(max_length=128)
    created_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return '{}, {}'.format(self.user.username, self.amount)

class Plantation(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    city = models.CharField(max_length=128)
    created_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return '{}, {}'.format(self.user.username, self.city)