# Generated by Django 2.2.6 on 2019-10-07 08:06

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Car',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('fleet', models.CharField(max_length=100)),
                ('owner', models.CharField(max_length=100)),
                ('car_type', models.CharField(choices=[('VAN', 'Van'), ('PICKUP', 'Pickup'), ('TRUCK', 'Truck')], default='VAN', max_length=10)),
                ('model', models.CharField(max_length=100)),
                ('license_plate', models.CharField(max_length=100)),
                ('max_passengers', models.IntegerField()),
                ('max_payload', models.DecimalField(decimal_places=5, max_digits=10)),
            ],
        ),
        migrations.CreateModel(
            name='Mileage',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateField()),
                ('odometer', models.DecimalField(decimal_places=5, max_digits=10)),
                ('car', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='mileages', to='cars.Car')),
            ],
            options={
                'ordering': ['date'],
            },
        ),
    ]