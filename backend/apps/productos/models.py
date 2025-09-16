from django.db import models


class Producto(models.Model):
    nombre_producto = models.CharField(max_length=200)
    precio = models.DecimalField(max_digits=10, decimal_places=2)
    cantidad = models.PositiveIntegerField(default=0)
    cod_barras = models.CharField(max_length=100)
    empresa = models.CharField(max_length=100, blank=True, null=True)
    descripcion = models.TextField(blank=True, null=True)

    # Hasta 4 imágenes (opcionales)
    imagen1 = models.ImageField(upload_to='productos/', blank=True, null=True)
    imagen2 = models.ImageField(upload_to='productos/', blank=True, null=True)
    imagen3 = models.ImageField(upload_to='productos/', blank=True, null=True)
    imagen4 = models.ImageField(upload_to='productos/', blank=True, null=True)

    # Soft delete → en lugar de eliminar, se desactiva
    activo = models.BooleanField(default=True)

    creado = models.DateTimeField(auto_now_add=True)
    actualizado = models.DateTimeField(auto_now=True)

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=['empresa', 'cod_barras'], name='unique_empresa_cod_barras'
            )
        ]

    def __str__(self):
        return f"{self.nombre_producto} ({self.cod_barras})"
