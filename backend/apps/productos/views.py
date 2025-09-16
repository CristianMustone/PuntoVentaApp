from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404
from .models import Producto
from .serializers import ProductoSerializer


# 1️⃣ Listar todos los productos de la empresa del usuario
class ProductoListView(generics.ListAPIView):
    serializer_class = ProductoSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        empresa = self.request.user.empresa
        return Producto.objects.filter(activo=True, empresa=empresa)


# 2️⃣ Productos con stock bajo para la empresa del usuario
class ProductoStockBajoView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        limite = request.query_params.get("limite", 10)
        try:
            limite = int(limite)
        except ValueError:
            limite = 10

        empresa = request.user.empresa
        productos = Producto.objects.filter(
            activo=True, cantidad__lt=limite, empresa=empresa
        )
        serializer = ProductoSerializer(productos, many=True)
        return Response(serializer.data)


# 3️⃣ Editar un producto específico (de la empresa del usuario)
class ProductoUpdateView(generics.UpdateAPIView):
    serializer_class = ProductoSerializer
    lookup_field = "cod_barras"
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        empresa = self.request.user.empresa
        return Producto.objects.filter(empresa=empresa)


# 4️⃣ Eliminar un producto específico (soft delete, solo de su empresa)
class ProductoDeleteView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def delete(self, request, cod_barras):
        empresa = request.user.empresa
        producto = get_object_or_404(Producto, cod_barras=cod_barras, empresa=empresa)
        producto.activo = False
        producto.save()
        return Response({"mensaje": f"Producto {producto.nombre_producto} eliminado correctamente"})


# 5️⃣ Crear un nuevo producto (asignando empresa automáticamente)
class ProductoCreateView(generics.CreateAPIView):
    serializer_class = ProductoSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        empresa = self.request.user.empresa
        serializer.save(empresa=empresa)
