from django.contrib import admin
from .models import Message
from .models import SearchHistory
from .models import Prescription

admin.site.register(Message)

# Register the SearchHistory model with the admin site
class SearchHistoryAdmin(admin.ModelAdmin):
    list_display = ('user', 'query', 'created_at')
    list_filter = ('user', 'created_at')
    search_fields = ('query',)

admin.site.register(SearchHistory, SearchHistoryAdmin)

# Register the Prescription model with the admin site
@admin.register(Prescription)
class PrescriptionAdmin(admin.ModelAdmin):
    list_display = ('medication_name', 'user', 'rxid', 'dosage', 'expiration_date', 'pharmacy_name')
    list_filter = ('pharmacy_name', 'expiration_date')
    search_fields = ('medication_name', 'user__username', 'rxid')