# Generated by Django 5.0.7 on 2024-08-25 19:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_blog_hire_resource'),
    ]

    operations = [
        migrations.AddField(
            model_name='blog',
            name='keywords',
            field=models.CharField(default='', max_length=150),
            preserve_default=False,
        ),
    ]