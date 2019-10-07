from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'cars', views.CarViewSet)
router.register(r'mileages', views.MileageViewSet)

urlpatterns = [
    path('api/', include(router.urls))
]