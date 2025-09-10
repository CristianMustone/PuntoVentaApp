from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser


class CustomUserAdmin(UserAdmin):
    model = CustomUser
    list_display = ('nombre_usuario', 'empresa', 'puesto', 'is_staff', 'is_active')
    list_filter = ('is_staff', 'is_active')
    fieldsets = (
        (None, {'fields': ('nombre_usuario', 'password')}),
        ('Información personal', {'fields': ('empresa', 'puesto')}),
        ('Permisos', {'fields': ('is_staff', 'is_active', 'is_superuser', 'groups', 'user_permissions')}),
        ('Fechas importantes', {'fields': ('last_login', 'date_joined')}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('nombre_usuario', 'empresa', 'puesto', 'password1', 'password2', 'is_staff', 'is_active')}
        ),
    )
    search_fields = ('nombre_usuario',)
    ordering = ('nombre_usuario',)


admin.site.register(CustomUser, CustomUserAdmin)
