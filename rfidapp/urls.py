from django.urls import path
from . import views


urlpatterns = [
    path("add/", views.add, name='add'),
    path("home/", views.home, name='home'),
    path("dashboard/", views.dashboard, name='dashboard'),
    path('api/', views.api, name='api'),
    path('api/<int:id>', views.apidetails, name='apidetails'),
]
