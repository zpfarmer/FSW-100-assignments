from django.contrib import admin

from .models import Todo, Location
# Register your models here.
admin.site.register(Todo)
admin.site.register(Location)