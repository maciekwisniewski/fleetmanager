from django.db import models


class Car(models.Model):
    VAN = 'VAN'
    PICKUP = 'PICKUP'
    TRUCK = 'TRUCK'

    CAR_TYPES = [
        (VAN, 'Van'),
        (PICKUP, 'Pickup'),
        (TRUCK, 'Truck')
    ]

    fleet = models.CharField(max_length=100)
    owner = models.CharField(max_length=100)
    car_type = models.CharField(
        max_length=10,
        choices=CAR_TYPES,
        default=VAN
    )
    model = models.CharField(max_length=100)
    license_plate = models.CharField(max_length=100)
    max_passengers = models.IntegerField()
    max_payload = models.DecimalField(max_digits=10, decimal_places=5)

    def __str__(self):
        return f"{self.fleet}: {self.model} {self.license_plate}"


class Mileage(models.Model):
    date = models.DateField()
    car = models.ForeignKey(Car, related_name='mileages', on_delete=models.CASCADE)
    odometer = models.DecimalField(max_digits=10, decimal_places=5)

    class Meta:
        ordering = ['date']

    def __str__(self):
        return f"{self.car} - {self.odometer}"
