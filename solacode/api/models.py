from django.db import models


freq_choices = { # the choices for frequency field of Subscription
    'a' : 'As they are published(maximum twice a week)',
    'w' : 'Once a week',
    'm' : 'Once a month',
}
class Subscription(models.Model):
    email = models.EmailField(unique=True)
    frequency = models.CharField(max_length=1,choices=freq_choices,default='w')




