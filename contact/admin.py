from django.contrib import admin
from contact.models import contact

# Register your models here.
class contactadmin(admin.ModelAdmin):
    list_display=('contact_name','contact_email','contact_message')
admin.site.register(contact,contactadmin)
