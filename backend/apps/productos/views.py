from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404
from .models import Producto
from .serializers import ProductoSerializer

# 1️⃣ Listar todos los productos
class ProductoListView(generics.ListAPIView):
    queryset = Producto.objects.filter(activo=True)
    serializer_class = ProductoSerializer
    permission_classes = [permissions.IsAuthenticated]


# 2️⃣ Productos con stock bajo (menor al valor enviado por query param)
class ProductoStockBajoView(APIView):
    # permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        limite = request.query_params.get("limite", 10)  # default: 10
        try:
            limite = int(limite)
        except ValueError:
            limite = 10

        productos = Producto.objects.filter(activo=True, cantidad__lt=limite)
        serializer = ProductoSerializer(productos, many=True)
        return Response(serializer.data)


# 3️⃣ Editar un producto específico
class ProductoUpdateView(generics.UpdateAPIView):
    queryset = Producto.objects.all()
    serializer_class = ProductoSerializer
    lookup_field = "cod_barras"  # editamos usando código de barras
    # permission_classes = [permissions.IsAuthenticated]


# 4️⃣ Eliminar un producto específico (soft delete)
class ProductoDeleteView(APIView):
    # permission_classes = [permissions.IsAuthenticated]

    def delete(self, request, cod_barras):
        producto = get_object_or_404(Producto, cod_barras=cod_barras)
        producto.activo = False  # 🔹 soft delete
        producto.save()
        return Response({"mensaje": f"Producto {producto.nombre_producto} eliminado correctamente"})
