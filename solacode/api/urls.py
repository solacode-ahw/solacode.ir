from django.urls import path, include
from rest_framework import routers

from . import views


router = routers.DefaultRouter()
router.register('subscription',views.SubscriptionViewSet)
router.register('hire',views.HireViewSet)
router.register('blog',views.BlogViewSet)
router.register('resource',views.ResourceViewSet)

app_name='api'
urlpatterns = [
    path('planly',views.planly,name='planly'),
    path('solacode',views.solacode,name='solacode'),
    path('insta',views.insta,name='insta'),
    path('mail',views.mail,name='mail'),
    path('call',views.call,name='call'),
    path('resume-<str:lang>',views.resume,name='resume'),
    path('resume',views.resume,name='resume'),
    path('cs<str:token>',views.confirm_subscription,name='confirm-subscription'),
    path('us<str:token>',views.unsubscribe,name='unsubscribe'),
    path('gs<str:token>',views.get_subscription,name='get-subscription'),
    path('db/',include(router.urls))
]