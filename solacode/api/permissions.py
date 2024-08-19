from rest_framework import permissions

class HirePermission(permissions.BasePermission):
    def has_permission(self,request,view):
        if request.method=='POST':
            return True
        else:
            return permissions.IsAdminUser.has_permission(request,view)
        
class AllowAny(permissions.AllowAny):
    pass