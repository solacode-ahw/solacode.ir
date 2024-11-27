from django.core.mail import send_mail, EmailMessage
import os

email = {
    'username': os.environ['notif_user'],
    'password': os.environ['notif_pass'],
    'default': os.environ['my_mail'],
}
host = 'http://solacode.ir'

def html_mail(subject,message,to,token=''):
    if(token):
        msg = EmailMessage(
            subject,
            message,
            [to],
            headers={
                "List-Unsubscribe": f'<{host}/api/us{token}>',
                "List-Unsubscribe-Post": "List-Unsubscribe=One-Click"
            }
        )
        msg.content_subtype = 'html'
        msg.send()
    else:
        send_mail(subject,'',[to],auth_user=email['username'],auth_password=email['password'],html_message=message)

def normal_mail(subject,message):
    send_mail(subject,message,[email['default']],auth_user=email['username'],auth_password=email['password'])