from django.db import models
from django.utils import timezone
from apps.productos.models import Producto  # asegúrate que la app sea correcta


class Venta(models.Model):
    METODOS_PAGO = [
        ('EF', 'Efectivo'),
        ('DB', 'Débito'),
        ('CR', 'Crédito'),
        ('MP', 'Mercado Pago'),
        ('TR', 'Transferencia'),
    ]

    fecha = models.DateTimeField(default=timezone.now)
    metodo_pago = models.CharField(max_length=2, choices=METODOS_PAGO)
    nro_transferencia = models.CharField(max_length=100, blank=True, null=True)
    monto_total = models.DecimalField(max_digits=10, decimal_places=2)
    pago = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    vuelto = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)

    productos = models.ManyToManyField(Producto, through='VentaProducto')

    
    empresa = models.CharField(max_length=100, blank=True, null=True)  # Nombre de la empresa

    creado = models.DateTimeField(auto_now_add=True)
    actualizado = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Venta #{self.id} - {self.fecha.strftime('%d/%m/%Y %H:%M')}"


class VentaProducto(models.Model):
    venta = models.ForeignKey(Venta, on_delete=models.CASCADE)
    producto = models.ForeignKey(Producto, on_delete=models.SET_NULL, null=True, blank=True)
    cantidad = models.PositiveIntegerField(default=1)

    # 🔹 Snapshot del precio en el momento de la venta
    precio_unitario = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)

    def subtotal(self):
        return self.cantidad * self.precio_unitario

    def __str__(self):
        return f"{self.producto.nombre_producto if self.producto else 'Producto eliminado'} x {self.cantidad} (Venta {self.venta.id})"
