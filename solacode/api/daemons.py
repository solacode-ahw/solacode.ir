from django.template.loader import render_to_string
from .models import Subscription, Blog
from secrets import token_urlsafe
import datetime

from .email import html_mail,host

def weekly_subscription_daemons():
    posts = Blog.objects.filter(date__gt=datetime.date.today()-datetime.timedelta(days=7))
    if(len(posts)>0):
        recipients = Subscription.objects.filter(frequency='w',confirmed=True)
        for recipient in recipients:
            while True:
                token = token_urlsafe(32)
                if len(Subscription.objects.filter(token=token,confirmed=True))==0:
                    break
            recipient.token = token
            recipient.save()
            html_message = render_to_string('api/blog_subscription.html',context={
                'host': host,
                'posts': posts,
                'token': token
            })
            # send email
            html_mail('new posts',html_message,recipient.email)

def monthly_subscription_daemons():
    posts = Blog.objects.filter(date__month=datetime.date.today().month)
    if(len(posts)>0):
        recipients = Subscription.objects.filter(frequency='m',confirmed=True)
        for recipient in recipients:
            while True:
                token = token_urlsafe(32)
                if len(Subscription.objects.filter(token=token,confirmed=True))==0:
                    break
            recipient.token = token
            recipient.save()
            html_message = render_to_string('api/blog_subscription.html',context={
                'host': host,
                'posts': posts,
                'token': token
            })
            # send email
            html_mail('new posts',html_message,recipient.email)

def validity_check():
    validity_limit = datetime.datetime.now() - datetime.timedelta(hours=3)
    invalids = Subscription.objects.filter(confirmed=False,added_at__lte=validity_limit)
    for invalid in invalids:
        invalid.delete()