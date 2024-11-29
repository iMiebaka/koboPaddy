# Generated by Django 5.1.3 on 2024-11-29 11:13

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('investment', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='investmentplan',
            name='image',
            field=models.ImageField(blank=True, null=True, upload_to='plans', validators=[django.core.validators.FileExtensionValidator(['png', 'jpg', 'jpeg', 'webp'])]),
        ),
    ]
