from django.contrib import admin
from .models import Producto


@admin.register(Producto)
class ProductoAdmin(admin.ModelAdmin):
    list_display = ('nombre_producto', 'precio', 'cantidad', 'cod_barras', 'creado', 'actualizado', 'empresa')
    search_fields = ('nombre_producto', 'cod_barras')
    list_filter = ('creado', 'actualizado', 'empresa')
    ordering = ('nombre_producto',)
