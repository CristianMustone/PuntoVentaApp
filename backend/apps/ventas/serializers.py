from rest_framework import serializers
from .models import Venta, VentaProducto
from apps.productos.models import Producto

class VentaProductoSerializer(serializers.Serializer):
    cod_barras = serializers.CharField()
    cantidad = serializers.IntegerField()
    precio_unitario = serializers.DecimalField(max_digits=10, decimal_places=2)

class VentaSerializer(serializers.ModelSerializer):
    productos = VentaProductoSerializer(many=True, write_only=True)

    class Meta:
        model = Venta
        fields = ["metodo_pago", "nro_transferencia", "monto_total", "pago", "vuelto", "productos", "fecha"]

    def create(self, validated_data):
        productos_data = validated_data.pop('productos')
        usuario = self.context['request'].user
        venta = Venta.objects.create(**validated_data, empresa=usuario.empresa)

        for item in productos_data:
            try:
                producto_obj = Producto.objects.get(cod_barras=item['cod_barras'], empresa=usuario.empresa)
            except Producto.DoesNotExist:
                raise serializers.ValidationError(f"Producto con código {item['cod_barras']} no encontrado")

            # Crear VentaProducto
            VentaProducto.objects.create(
                venta=venta,
                producto=producto_obj,
                cantidad=item['cantidad'],
                precio_unitario=item['precio_unitario']
            )

            # Descontar stock
            producto_obj.cantidad -= item['cantidad']
            producto_obj.save()

        return venta
