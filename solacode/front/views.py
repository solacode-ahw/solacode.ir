from django.shortcuts import render
from django.http import FileResponse
from django.views.decorators.csrf import ensure_csrf_cookie
from django.conf import settings

@ensure_csrf_cookie
def index(request):
    return render(request,'front/index.html')

# serving media & static files
def media(request,dir,file_name):
    return FileResponse(open(f'{settings.MEDIA_ROOT}/{dir}/{file_name}','rb'),filename=file_name)

def assets(request,**kwargs):
    args = list(kwargs.values())
    return FileResponse(open(f"{settings.STATICFILES_DIRS[0]}/front/{'/'.join(args)}",'rb'),filename=args[-1])
