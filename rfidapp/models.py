from django.db import models



# Create your models here.


class Tag(models.Model):

    tag = models.CharField(max_length=50, default="")
    
    def __str__(self):
        return self.tag


class Names(models.Model):
    name = models.CharField(max_length=50)
    surname = models.CharField(max_length=50, default="")
    tag = models.OneToOneField(Tag, on_delete=models.CASCADE)

    def __str__(self):
        return self.name
