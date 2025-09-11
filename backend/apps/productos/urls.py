from django.urls import path
from .views import (
    ProductoListView,
    ProductoStockBajoView,
    ProductoUpdateView,
    ProductoDeleteView,
)

urlpatterns = [
    path("productos/", ProductoListView.as_view(), name="productos-list"),
    path("productos/stock-bajo/", ProductoStockBajoView.as_view(), name="productos-stock-bajo"),
    path("productos/<str:cod_barras>/editar/", ProductoUpdateView.as_view(), name="producto-update"),
    path("productos/<str:cod_barras>/eliminar/", ProductoDeleteView.as_view(), name="producto-delete"),
]
