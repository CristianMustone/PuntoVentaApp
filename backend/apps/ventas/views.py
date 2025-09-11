from rest_framework import generics, permissions
from .models import Venta
from .serializers import VentaSerializer

# 🔹 Lista todas las ventas
class VentaListView(generics.ListAPIView):
    queryset = Venta.objects.all().order_by("-fecha")
    serializer_class = VentaSerializer
    permission_classes = [permissions.IsAuthenticated]  # Solo logueados pueden ver
