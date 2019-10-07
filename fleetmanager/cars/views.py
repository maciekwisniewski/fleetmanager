from rest_framework import viewsets
from django_filters import rest_framework as filters

from .models import Car, Mileage
from .serializers import CarSerializer, MileageSerializer, CarDetailSerializer


class CarViewSet(viewsets.ModelViewSet):
    """
    This viewset automatically provides `list`, `create`, `retrieve`,
    `update` and `destroy` actions.

    """
    queryset = Car.objects.all()
    filter_backends = [filters.DjangoFilterBackend]
    filterset_fields = ['license_plate', 'model']

    """
    Detailed view includes Mileage when retrieving single car details
    List view contains only basic car information 
    """
    def get_serializer_class(self):
        if self.action == 'retrieve':
            return CarDetailSerializer
        return CarSerializer


class MileageViewSet(viewsets.ModelViewSet):
    """
    This viewset automatically provides `list`, `create`, `retrieve`,
    `update` and `destroy` actions.

    """
    queryset = Mileage.objects.all()
    serializer_class = MileageSerializer
