from django.core.mail import send_mail
from .credentials import email

host = 'http://127.0.0.1:8000'

def html_mail(subject,message,to):
    send_mail(subject,'',email['username'],[to],auth_user=email['username'],auth_password=email['password'],html_message=message)

def normal_mail(subject,message):
    send_mail(subject,message,email['username'],[email['default']],auth_user=email['username'],auth_password=email['password'])