from rest_framework import serializers
from .models import Producto

class ProductoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Producto
        fields = [
            "nombre_producto",
            "precio",
            "cantidad",
            "cod_barras",
            "descripcion",
            "imagen1",
            "imagen2",
            "imagen3",
            "imagen4",
            "activo",
            "creado",
            "actualizado",
        ]
