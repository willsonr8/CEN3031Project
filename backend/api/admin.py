from django.contrib import admin
from .models import Message
from .models import SearchHistory

admin.site.register(Message)

class SearchHistoryAdmin(admin.ModelAdmin):
    list_display = ('user', 'query', 'created_at')
    list_filter = ('user', 'created_at')
    search_fields = ('query',)

admin.site.register(SearchHistory, SearchHistoryAdmin)