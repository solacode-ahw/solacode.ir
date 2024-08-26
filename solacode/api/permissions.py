from rest_framework import permissions

class RegisterPermission(permissions.BasePermission):
    def has_permission(self,request,view):
        if request.method=='POST':
            return True
        else:
            return permissions.IsAdminUser.has_permission(self,request,view)
        
class ContentPermission(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.method=='GET':
            return True
        else:
            return permissions.IsAdminUser.has_permission(self,request,view)
        
class AllowAny(permissions.AllowAny):
    pass