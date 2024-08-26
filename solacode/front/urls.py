from django.urls import path,re_path

from . import views

app_name = 'front'
urlpatterns = [
    path('',views.index,name='home'),
    path('hire',views.index,name='hire'),
    path('blog',views.index,name='blog'),
    re_path(r"^blog/post",views.index,name='post'),
    path('resources',views.index,name='resources'),
    path('unsubscribe',views.index,name='unsubscribe'),
    path('subscription',views.index,name='subscription'),
    re_path(r"^(?!media).*$",views.index)
]