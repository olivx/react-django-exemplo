from django.db import models

# Create your models here.
class Customers(models.Model):
    first_name = models.CharField('First name', max_length=255)
    last_name = models.CharField('Last name', max_length=255)
    email = models.EmailField('E-mail')
    phone = models.CharField(max_length=20)
    address = models.TextField(blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    create_at = models.DateTimeField("Create At", auto_now_add=True)
    update_at  = models.DateTimeField("Update At", auto_now=True)

    def __str__(self):
        return self.first_name

    class Meta:
       ordering = ['-id']

    