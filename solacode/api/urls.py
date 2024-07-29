from django.urls import path, include
from rest_framework import routers

from . import views


router = routers.DefaultRouter()
router.register('subscription',views.SubscriptionViewSet)

app_name='api'
urlpatterns = [
    path('planly',views.planly,name='planly'),
    path('insta',views.insta,name='insta'),
    path('mail',views.mail,name='mail'),
    path('call',views.call,name='call'),
    path('resume-<str:lang>',views.resume,name='resume'),
    path('resume',views.resume,name='resume'),
    path('db/',include(router.urls))
]