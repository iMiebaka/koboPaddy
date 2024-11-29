from django.contrib import admin
from investment.models import Inventment, InvestmentPlan, Wallet, Ledger

# Register your models here.

class InventmentAdmin(admin.ModelAdmin):
    pass

class InvestmentPlanAdmin(admin.ModelAdmin):
    pass

class WalletAdmin(admin.ModelAdmin):
    pass

class LedgerAdmin(admin.ModelAdmin):
    pass

admin.site.register(InvestmentPlan, InvestmentPlanAdmin)
admin.site.register(Inventment, InventmentAdmin)
admin.site.register(Wallet, WalletAdmin)
admin.site.register(Ledger, LedgerAdmin)
