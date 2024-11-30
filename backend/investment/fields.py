from generics.fields import GenericRelatedField
from investment.models import InvestmentPlan




class InvestmentPlanRelatedField(GenericRelatedField):
    model_class = InvestmentPlan
    model_label = "InvestmentPlan"
    look_up = "id"

    # def to_representation(self, user):
    #     profile = user.profile
    #     return {
    #         "handle": profile.handle,
    #         "name": user.name,
    #         "user_type": user.user_type,
    #         "email": user.email,
    #         "profile_id": profile.profile_id,
    #         "avatar": self.context["request"].build_absolute_uri(profile.avatar.url),
    #         "bio": profile.bio,
    #     }

    def get_object(self, value):
        return self.model_class.objects.filter(id=value).first()
