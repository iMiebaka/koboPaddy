from rest_framework import serializers


class GenericRelatedField(serializers.RelatedField):
    required = ["model_class", "model_label", "look_up"]

    def __init__(self, **kwargs):
        if missing := list(filter(lambda x: not hasattr(self, x), self.required)):
            msg = f"Required object attributes {missing} missing."
            raise Exception(msg)
        super().__init__(**kwargs)

    def to_representation(self, value):
        raise NotImplementedError()

    def to_internal_value(self, value):
        if not value:
            raise serializers.ValidationError("This field is required.")

        if not str(value).isdigit():
            raise serializers.ValidationError("This field must be an integer.")

        if instance := self.get_object(int(value)):
            return instance

        msg = f"{self.model_label} with {self.look_up} '{value}' does not exist."
        raise serializers.ValidationError(msg)

    def get_queryset(self):
        return self.model.objects.all()

    def get_object(self, value):
        raise NotImplementedError()
