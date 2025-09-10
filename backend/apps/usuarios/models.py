from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db import models
from django.utils import timezone


class CustomUserManager(BaseUserManager):
    def create_user(self, nombre_usuario, empresa, puesto, password=None, **extra_fields):
        if not nombre_usuario:
            raise ValueError("El usuario debe tener un nombre de usuario")
        user = self.model(
            nombre_usuario=nombre_usuario,
            empresa=empresa,
            puesto=puesto,
            **extra_fields
        )
        user.set_password(password)  # 🔒 encripta la contraseña
        user.save(using=self._db)
        return user

    def create_superuser(self, nombre_usuario, empresa, puesto, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self.create_user(nombre_usuario, empresa, puesto, password, **extra_fields)


class CustomUser(AbstractBaseUser, PermissionsMixin):
    nombre_usuario = models.CharField(max_length=150, unique=True)
    empresa = models.CharField(max_length=150, blank=True, null=True)
    puesto = models.CharField(max_length=150, blank=True, null=True)

    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    date_joined = models.DateTimeField(default=timezone.now)

    USERNAME_FIELD = 'nombre_usuario'
    REQUIRED_FIELDS = ['empresa', 'puesto']

    objects = CustomUserManager()

    def __str__(self):
        return self.nombre_usuario
