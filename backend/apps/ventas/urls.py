from django.urls import path
from .views import VentaListView, VentaCreateView

urlpatterns = [
    path("", VentaListView.as_view(), name="ventas-list"),
    
    path("new/", VentaCreateView.as_view(), name="ventas-update"),
]
