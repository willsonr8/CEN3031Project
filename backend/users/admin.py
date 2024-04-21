from django.contrib import admin
from .models import UserAccount

# Register the UserAccount model with the admin site
class UserAccountAdmin(admin.ModelAdmin):
    list_display = ('email', 'first_name', 'date_of_birth', 'is_active', 'is_staff')
    search_fields = ('email', 'first_name')

admin.site.register(UserAccount, UserAccountAdmin)
