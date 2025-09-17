from rest_framework import serializers
from .models import Venta, VentaProducto

class VentaProductoSerializer(serializers.ModelSerializer):
    nombre_producto = serializers.CharField(source="producto.nombre_producto", read_only=True)
    subtotal = serializers.SerializerMethodField()

    class Meta:
        model = VentaProducto
        fields = ["nombre_producto", "cantidad", "precio_unitario", "subtotal"]

    def get_subtotal(self, obj):
        return obj.subtotal() if obj.precio_unitario else 0


class VentaSerializer(serializers.ModelSerializer):
    productos = serializers.SerializerMethodField()

    class Meta:
        model = Venta
        fields = ["fecha", "metodo_pago", "nro_transferencia", "monto_total", "pago", "vuelto", "empresa", "productos"]

    def get_productos(self, obj):
        productos = VentaProducto.objects.filter(venta=obj)
        return VentaProductoSerializer(productos, many=True).data
