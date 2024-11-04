from django.urls import path,re_path
from django.conf import settings

from . import views

app_name = 'front'
urlpatterns = [
    path(f'{settings.MEDIA_URL[1:-1]}/<str:dir>/<str:file_name>',views.media,name='media'),
    path(f'{settings.STATIC_URL[1:-1]}/front/<arg0>',views.assets,name='assets'),
    path(f'{settings.STATIC_URL[1:-1]}/front/<arg0>/<arg1>',views.assets,name='assets'),
    path(f'{settings.STATIC_URL[1:-1]}/front/<arg0>/<arg1>/<arg2>',views.assets,name='assets'),
    re_path(r"^.*$",views.index)
]