from django.shortcuts import redirect
from django.http import HttpResponse,FileResponse
from user_agents import parse
from rest_framework import permissions, viewsets

from . import serializers, models

# Create your views here.
def planly(request):
    return redirect('https://github.com/solacode-ahw/planly')

def insta(request):
    return redirect('https://instagram.com/solacode.ahw')

def mail(request):
    if not parse(request.META.get('HTTP_USER_AGENT')).is_bot:
        return HttpResponse('<script>window.location = "mailto:solacode.ahw@proton.me";</script>')
    else:
        return HttpResponse('')

def call(request):
    if not parse(request.META.get('HTTP_USER_AGENT')).is_bot:
        return HttpResponse('<script>window.location = "tel:+989201124637";</script>')
    else:
        return HttpResponse('')
    
def resume(request,lang=''):
    if(lang=='en'):
        return FileResponse(open('./assets/resume-en.pdf','rb'),as_attachment=True,filename='Bahar Paydar') # return resume-en
    else:
        return FileResponse(open('./assets/resume-fa.pdf','rb'),as_attachment=True,filename='بهار پایدار') # return resume-fa

class SubscriptionViewSet(viewsets.ModelViewSet):
    queryset = models.Subscription.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = serializers.SubscriptionSerializer