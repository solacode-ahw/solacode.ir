# Generated by Django 5.0.7 on 2024-07-28 10:39

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Subscription',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('email', models.EmailField(max_length=254)),
                ('frequency', models.CharField(choices=[('a', 'As they are published(maximum twice a week)'), ('w', 'Once a week'), ('m', 'Once a month')], default='w', max_length=1, unique=True)),
            ],
        ),
    ]