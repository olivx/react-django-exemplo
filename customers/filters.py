import django_filters
from django_filters import rest_framework as filter  

from .models import Customers

class CustomersFilterSet(filter.FilterSet)

    email = django_filters.CharFilter(
        field_name='email', lookup_expr='email__iexact'
    )

    phone = django_filters.CharFilter(
        field_name='phone', lookup_expr='phone__iexact'
    )

    class Meta:
        model = Customers
        fields = ['first_name', 'last_name', 'email', 'phone']