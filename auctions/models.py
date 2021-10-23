from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    pass

class Listing(models.Model):
    user=models.ForeignKey('User',on_delete=models.CASCADE)
    title=models.CharField(max_length=64)
    start_bid=models.IntegerField()
    description=models.CharField(max_length=200)
    current_bid=models.ForeignKey('Bid',on_delete=models.CASCADE, blank=True,null=True)

    def __str__(self):
        return f"{self.user}: {self.title}"

class Bid(models.Model):
    bid=models.IntegerField()
    item=models.ForeignKey('Listing',on_delete=models.CASCADE)
    user=models.ForeignKey('User',on_delete=models.CASCADE)
    def __str__(self):
        return f"{self.bid}"
class Comment(models.Model):
    comment=models.CharField(max_length=200)
    user=models.ForeignKey('User',on_delete=models.CASCADE)
