from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from django.core.mail import send_mail
from django.contrib.auth.tokens import default_token_generator
from django.utils.encoding import force_bytes, force_str
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.contrib.auth import get_user_model

User = get_user_model()


# 🔹 LOGIN
class LoginView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        nombre_usuario = request.data.get("nombre_usuario")
        password = request.data.get("password")

        user = authenticate(request, nombre_usuario=nombre_usuario, password=password)
        if user is not None:
            refresh = RefreshToken.for_user(user)
            return Response({
                "refresh": str(refresh),
                "access": str(refresh.access_token),
                "user": {
                    "id": user.id,
                    "nombre_usuario": user.nombre_usuario,
                    "empresa": user.empresa,
                    "puesto": user.puesto,
                }
            })
        return Response({"error": "Credenciales inválidas"}, status=status.HTTP_401_UNAUTHORIZED)


# 🔹 LOGOUT
class LogoutView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        try:
            refresh_token = request.data["refresh"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response({"message": "Sesión cerrada correctamente"}, status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


# 🔹 PASSWORD RESET (solicitar link por email)
class PasswordResetRequestView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        nombre_usuario = request.data.get("nombre_usuario")
        try:
            user = User.objects.get(nombre_usuario=nombre_usuario)
            uid = urlsafe_base64_encode(force_bytes(user.pk))
            token = default_token_generator.make_token(user)

            reset_url = f"http://localhost:4200/reset-password/{uid}/{token}"  # 🔹 URL del front
            send_mail(
                "Recuperación de contraseña",
                f"Para resetear tu contraseña hacé click aquí: {reset_url}",
                "no-reply@miapp.com",
                [user.email],
                fail_silently=False,
            )
            return Response({"message": "Se envió un email con instrucciones"})
        except User.DoesNotExist:
            return Response({"error": "Usuario no encontrado"}, status=status.HTTP_404_NOT_FOUND)


# 🔹 PASSWORD RESET (confirmar nueva contraseña)
class PasswordResetConfirmView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request, uidb64, token):
        try:
            uid = force_str(urlsafe_base64_decode(uidb64))
            user = User.objects.get(pk=uid)
            if not default_token_generator.check_token(user, token):
                return Response({"error": "Token inválido"}, status=status.HTTP_400_BAD_REQUEST)

            new_password = request.data.get("password")
            user.set_password(new_password)
            user.save()
            return Response({"message": "Contraseña actualizada correctamente"})
        except Exception:
            return Response({"error": "Algo salió mal"}, status=status.HTTP_400_BAD_REQUEST)
