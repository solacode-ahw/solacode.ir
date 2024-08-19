from rest_framework import permissions

class HirePermission(permissions.BasePermission):
    def has_permission(self,request,view):
        if request.method=='POST':
            return True
        else:
            return False
        
class AllowAny(permissions.AllowAny):
    pass