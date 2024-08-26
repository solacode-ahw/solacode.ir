from django.shortcuts import redirect
from django.http import HttpResponse,FileResponse
from user_agents import parse
from rest_framework import viewsets,filters

from . import serializers, models, permissions

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


class SubscriptionViewSet(viewsets.ModelViewSet):
    queryset = models.Subscription.objects.all()
    permission_classes = [
        permissions.RegisterPermission
    ]
    serializer_class = serializers.SubscriptionSerializer

    def create(self, request, *args, **kwargs):
        res = super().create(request,*args,**kwargs)
        # perform necessary actions
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
    search_fields = ['title','summary','keywords'] #url?search=<query>
    ordering_fields = ['date']
    ordering = ['-date']
    
    def get_serializer_class(self):
        if self.action == 'list':
            return serializers.BlogListSerializer
        else:
            return serializers.BlogSerializer


class ResourceViewSet(viewsets.ModelViewSet):
    queryset = models.Resource.objects.all()
    permission_classes = [
        permissions.ContentPermission
    ]
    serializer_class = serializers.ResourceSerializer
    filter_backends = [filters.OrderingFilter]
    ordering_fields = ['name']
    ordering = ['name']