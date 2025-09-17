from rest_framework import generics, permissions
from .models import Venta
from .serializers import VentaSerializer

# 🔹 Lista todas las ventas
class VentaListView(generics.ListAPIView):
    # queryset = Venta.objects.all().order_by("-fecha")
    serializer_class = VentaSerializer
    permission_classes = [permissions.IsAuthenticated]  # Solo logueados pueden ver
    def get_queryset(self):
        empresa = self.request.user.empresa  # asumiendo que tu modelo de usuario tiene el campo empresa
        return Venta.objects.filter(empresa=empresa).order_by("-fecha")
    
class VentaCreateView(generics.CreateAPIView):
    queryset = Venta.objects.all()
    serializer_class = VentaSerializer
    permission_classes = [permissions.IsAuthenticated]  # Solo logueados pueden crear
    