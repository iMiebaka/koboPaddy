from django.contrib import admin
from investment.models import Investment, InvestmentPlan, Wallet, Ledger

# Register your models here.

class InvestmentAdmin(admin.ModelAdmin):
    pass

class InvestmentPlanAdmin(admin.ModelAdmin):
    pass

class WalletAdmin(admin.ModelAdmin):
    pass

class LedgerAdmin(admin.ModelAdmin):
    pass

admin.site.register(InvestmentPlan, InvestmentPlanAdmin)
admin.site.register(Investment, InvestmentAdmin)
admin.site.register(Wallet, WalletAdmin)
admin.site.register(Ledger, LedgerAdmin)
