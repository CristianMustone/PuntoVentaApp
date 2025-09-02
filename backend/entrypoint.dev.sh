#!/bin/sh
set -e

# Espera a la DB (opcional: agregar wait-for-it si querés)
python manage.py migrate
python manage.py runserver 0.0.0.0:8000
