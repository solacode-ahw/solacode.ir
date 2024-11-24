from rest_framework import serializers

from . import models


class SubscriptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Subscription
        fields = '__all__'

class HireSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Hire
        fields = '__all__'

class BlogSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Blog
        fields = '__all__'
class BlogListSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Blog
        fields = ['id','title','summary','keywords','image','date']

class ResourceSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Resource
        fields = '__all__'