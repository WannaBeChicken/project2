from django.contrib.auth.models import AbstractUser
from django.db import models

class Bid(models.Model):
    bid=models.IntegerField()

class User(AbstractUser):
    pass
    user=models.ManyToManyField(Bid)

class Listing(models.Model):
    user=models.ForeignKey(User,on_delete=models.CASCADE)
    title=models.CharField(max_length=64)
    start_bid=models.IntegerField()
    description=models.CharField(max_length=200)

    def __str__(self):
        return f"{self.user}: {self.title}"

class Comment(models.Model):
    comment=models.CharField(max_length=200)
    user=models.ForeignKey(User,on_delete="models.CASCADE")
