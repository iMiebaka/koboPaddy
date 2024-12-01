from django.contrib.auth import get_user_model
from account.models import ACCOUNT_TYPE_CHOICES
from rest_framework.test import APIClient, APITestCase
from investment.models import (
    Ledger, Wallet, 
    APPROVAL_STATUS_CHOICES,
    Investment, InvestmentPlan, 
)

User = get_user_model()
client = APIClient()


class UserTest(APITestCase):
    def setUp(self):
        user = User(
            first_name="Test",
            last_name="Investor",
            email="testuser1@example.com",
            account_type = ACCOUNT_TYPE_CHOICES.INVESTOR
        )
        user.set_password("password123")
        user.save()

        self.assertEqual(user.email, "testuser1@example.com")
        
        # Login
        data = {
            "email": user.email,
            "password": "password123"
        }
        response = client.post("/api/account/login", data, format="json")
        self.assertEqual(response.status_code, 400)

        # Verify user
        user.is_verified = True
        user.is_active = True
        user.save()

        response = client.post("/api/account/login", data, format="json")
        self.token = response.json()["access_token"]
        client.credentials(HTTP_AUTHORIZATION=f"Bearer {self.token}")

        # Admin utils
        InvestmentPlan.objects.create(
            plan="Test Investment One",
            active=True,
            min_investment=100,
            interest_rate=5
        )
        InvestmentPlan.objects.create(
            plan="Test Investment Two",
            active=True,
            min_investment=1000,
            interest_rate=40
        )
        self.assertEqual(InvestmentPlan.objects.count(), 2)

    def test_main(self):
        # Check balance
        response = client.get("/api/investment/wallet")
        self.assertEqual(response.json()["amount"], '0.00')
        
        # Credit wallet
        response = client.post("/api/investment/wallet", data={"amount": 100}, format="json")
        self.assertEqual(response.json()["header"], "success")
        response = client.get("/api/investment/wallet")
        self.assertEqual(response.json()["amount"], '0.00')

        # Update Transaction
        ledger = Ledger.objects.filter(status=APPROVAL_STATUS_CHOICES.PENDING).first()
        ledger.status = APPROVAL_STATUS_CHOICES.APPROVED
        ledger.save()
        
        # Confirm credit 
        response = client.get("/api/investment/wallet")
        self.assertEqual(response.json()["amount"], '100.00')

        response = client.post("/api/investment/wallet", data={"amount": 10}, format="json")
        self.assertEqual(response.json()["header"], "success")

        # Update Transaction ❌
        ledger = Ledger.objects.filter(status=APPROVAL_STATUS_CHOICES.PENDING).first()
        ledger.status = APPROVAL_STATUS_CHOICES.REJECTED
        ledger.save()

        # Confirm discredit 
        response = client.get("/api/investment/wallet")
        self.assertEqual(response.json()["amount"], '100.00')


        # Make investment
        investment_one =  InvestmentPlan.objects.get(plan="Test Investment One")
        data = {"id": investment_one.pk, "amount": "10"}
        response = client.post("/api/investment/subcriptions", data=data, format="json")
        self.assertEqual(response.json()['details']['plan'], f'Amount should be above {investment_one.min_investment}')
        
        # Enable azaman vibe
        response = client.post("/api/investment/wallet", data={"amount": 1000000}, format="json")
        self.assertEqual(response.json()["header"], "success")
        # Accept cos they have no choice
        ledger = Ledger.objects.filter(status=APPROVAL_STATUS_CHOICES.PENDING).first()
        ledger.status = APPROVAL_STATUS_CHOICES.APPROVED
        ledger.save()

        data = {"id": investment_one.pk, "amount": 100000}
        response = client.post("/api/investment/subcriptions", data=data, format="json")
        self.assertEqual(response.json()["header"], "success")
