from django.shortcuts import redirect
from django.http import HttpResponse,FileResponse,JsonResponse
from django.template.loader import render_to_string
from user_agents import parse
from rest_framework import viewsets,filters,status
from rest_framework.response import Response
from secrets import token_urlsafe

from . import serializers, models, permissions
from .email import html_mail,normal_mail,host

# Create your views here.
def planly(request):
    return redirect('https://github.com/solacode-ahw/planly')

def solacode(request):
    return redirect('https://github.com/solacode-ahw') # change this to solacode website repo

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

def confirm_subscription(request,token):
    response = {}
    if(request.method=='GET'):
        qset = models.Subscription.objects.filter(token=token,confirmed=False)
        if(len(qset)==0):
            response['status']=404
        else:
            qset[0].token=''
            qset[0].confirmed=True
            qset[0].save()
            response['status']=200
    return JsonResponse(response)

def unsubscribe(request,token):
    response = {}
    if(request.method=='GET'):
        qset = models.Subscription.objects.filter(token=token,confirmed=True)
        if(len(qset)==0):
            response['status']=404
        else:
            qset[0].delete()
            response['status']=200
    return JsonResponse(response)

def get_subscription(request,token):
    response = {}
    if(request.method=='GET'):
        token = request.POST['token']
        qset = models.Subscription.objects.filter(token=token,confirmed=True)
        if(len(qset)==0):
            response['status']=404
        else:
            response['status']=200
            response['object']={
                'id': qset[0].id,
                'email': qset[0].email,
                'frequency': qset[0].frequency
            }
    return JsonResponse(response)

class SubscriptionViewSet(viewsets.ModelViewSet):
    queryset = models.Subscription.objects.all()
    permission_classes = [
        permissions.SubscriptionPermission
    ]
    serializer_class = serializers.SubscriptionSerializer

    def create(self, request, *args, **kwargs):
        while True:
            token = token_urlsafe(32)
            if len(self.queryset.filter(token=token,confirmed=False))==0:
                break

        req = request.data.copy()
        req['token'] = token
        serializer = self.get_serializer(data=req)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        res = Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

        html_message = render_to_string('api/confirm_subscription.html',context={
            'host': host,
            'token': token
        })
        # send email
        html_mail('SolaCode - تایید ایمیل',html_message,request.data['email'])

        return res


class HireViewSet(viewsets.ModelViewSet):
    queryset = models.Hire.objects.all()
    permission_classes = [
        permissions.RegisterPermission,
    ]
    serializer_class = serializers.HireSerializer
    filter_backends = [filters.OrderingFilter]
    ordering_fields = ['creation']
    ordering = ['-creation']

    def create(self, request, *args, **kwargs):
        res = super().create(request,*args,**kwargs)
        # send email
        normal_mail('New Hiring Request',request.data['summary'])
        return res

    def update(self, request, pk=None):
        response = HttpResponse()
        response.headers['Allow'] = 'GET, POST, DELETE'
        response.status_code = 405
        return response


class BlogViewSet(viewsets.ModelViewSet):
    queryset = models.Blog.objects.all()
    permission_classes = [
        permissions.ContentPermission
    ]
    filter_backends = [filters.SearchFilter,filters.OrderingFilter]
    search_fields = ['title','summary','keywords']
    ordering_fields = ['date']
    ordering = ['-date']
    
    def get_serializer_class(self):
        if self.action == 'list':
            return serializers.BlogListSerializer
        else:
            return serializers.BlogSerializer
        
    def create(self, request, *args, **kwargs):
        res = super().create(request,*args,**kwargs)

        posts = models.Blog.objects.all().order_by('-id')[:1]

        recipients = models.Subscription.objects.filter(frequency='a',confirmed=True)
        for recipient in recipients:
            while True:
                token = token_urlsafe(32)
                if len(models.Subscription.objects.filter(token=token,confirmed=True))==0:
                    break
            recipient.token = token
            recipient.save()
            html_message = render_to_string('api/blog_subscription.html',context={
                'host': host,
                'posts': posts,
                'token': token
            })
            # send email
            html_mail('SolaCode - انتشار پست جدید',html_message,recipient.email)
        return res


class ResourceViewSet(viewsets.ModelViewSet):
    queryset = models.Resource.objects.all()
    permission_classes = [
        permissions.ContentPermission
    ]
    serializer_class = serializers.ResourceSerializer
    filter_backends = [filters.OrderingFilter]
    ordering_fields = ['name']
    ordering = ['name']