from django.urls import path

from . import views

app_name='api'
urlpatterns = [
    path('planly',views.planly,name='planly'),
    path('insta',views.insta,name='insta'),
    path('mail',views.mail,name='mail'),
    path('call',views.call,name='call'),
    path('resume-<str:lang>',views.resume,name='resume'),
    path('resume',views.resume,name='resume'),
]