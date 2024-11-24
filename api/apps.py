from django.apps import AppConfig
from apscheduler.schedulers.background import BackgroundScheduler


class ApiConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'api'

    def ready(self):
        from . import daemons
        scheduler = BackgroundScheduler()
        scheduler.add_job(daemons.monthly_subscription_daemons,'cron',day=1,timezone='Asia/Tehran')
        scheduler.add_job(daemons.weekly_subscription_daemons,'cron',day_of_week='sat')
        scheduler.add_job(daemons.validity_check,'interval',minutes=15)
        scheduler.start()
