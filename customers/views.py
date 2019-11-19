from rest_framework import viewsets

from .models import Customers
from .serializers import CustomersDefaultSerializes, CustomersDetailSerializes
from rest_framework import filters


# Create your views here.

class CustomersViewSet(viewsets.ModelViewSet):

    name = 'customers'
    queryset = Customers.objects.all()
    ordering_backends = [filters.OrderingFilter]
    ordering_fields = ['first_name', 'last_name', 'email']

    def get_serializer_class(self):
        if self.action == 'list':
            return CustomersDefaultSerializes
        return CustomersDetailSerializes



