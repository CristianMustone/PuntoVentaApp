from django.urls import path
from .views import (
    ProductoListView,
    ProductoStockBajoView,
    ProductoUpdateView,
    ProductoDeleteView,
)

urlpatterns = [
    path("", ProductoListView.as_view(), name="productos-list"),
    path("stock-bajo/", ProductoStockBajoView.as_view(), name="productos-stock-bajo"),
    path("editar/<str:cod_barras>/", ProductoUpdateView.as_view(), name="producto-update"),
    path("eliminar/<str:cod_barras>/", ProductoDeleteView.as_view(), name="producto-delete"),
]
