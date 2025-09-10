from django.contrib import admin
from .models import Venta, VentaProducto


class VentaProductoInline(admin.TabularInline):
    model = VentaProducto
    extra = 1


@admin.register(Venta)
class VentaAdmin(admin.ModelAdmin):
    list_display = ('id', 'fecha', 'metodo_pago', 'monto_total')
    list_filter = ('metodo_pago', 'fecha')
    search_fields = ('nro_transferencia',)
    inlines = [VentaProductoInline]


@admin.register(VentaProducto)
class VentaProductoAdmin(admin.ModelAdmin):
    list_display = ('venta', 'producto', 'cantidad')
    list_filter = ('venta', 'producto')
