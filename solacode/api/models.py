from django.db import models


freq_choices = { # the choices for frequency field of Subscription
    'a' : 'As they are published(maximum twice a week)',
    'w' : 'Once a week',
    'm' : 'Once a month',
}
class Subscription(models.Model):
    email = models.EmailField(unique=True)
    frequency = models.CharField(max_length=1,choices=freq_choices,default='w')
    token = models.CharField(max_length=256,default='')
    confirmed = models.BooleanField(default=False)
    added_at = models.DateTimeField(auto_now_add=True)

class Hire(models.Model):
    name = models.CharField(max_length=50)
    email = models.EmailField()
    summary = models.TextField()
    budget = models.CharField(max_length=150,blank=True)
    creation = models.DateTimeField(auto_now_add=True)

class Blog(models.Model):
    title = models.CharField(max_length=150, unique=True)
    summary = models.TextField()
    keywords = models.CharField(max_length=150)
    body = models.TextField()
    image = models.FileField(upload_to='blog/',blank=True)
    date = models.DateField(auto_now_add=True)

class Resource(models.Model):
    name = models.CharField(max_length=25,unique=True)
    description = models.CharField(max_length=150)
    file = models.FileField(upload_to='resources/')