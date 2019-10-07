from rest_framework import serializers

from .models import Car, Mileage


class MileageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Mileage
        fields = '__all__'


class CarSerializer(serializers.ModelSerializer):
    class Meta:
        model = Car
        fields = '__all__'


class CarDetailSerializer(serializers.ModelSerializer):
    mileages = MileageSerializer(many=True, read_only=True)

    class Meta:
        model = Car
        fields = '__all__'
