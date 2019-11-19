from rest_framework import serializers
from .models import Customers

class CustomersDefaultSerializes(serializers.ModelSerializer):
    
    class Meta:
        model = Customers
        fields = ('pk','first_name', 'email', 'phone','address','description',)

class CustomersDetailSerializes(serializers.ModelSerializer):

    class Meta:
        model = Customers
        fields = '__all__'