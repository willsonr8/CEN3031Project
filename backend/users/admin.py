from django.contrib import admin
from .models import UserAccount

class UserAccountAdmin(admin.ModelAdmin):
    list_display = ('email', 'first_name', 'date_of_birth', 'is_active', 'is_staff')
    search_fields = ('email', 'first_name')

admin.site.register(UserAccount, UserAccountAdmin)