from django.contrib.auth import authenticate, login, logout
from django.db import IntegrityError
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render
from django.urls import reverse
from django.contrib.auth.decorators import login_required
from .models import *
from django.db.models import Max
import sys


def index(request):
    data=Listing.objects.all()
    return render(request, "auctions/index.html",{
    "list": data
    })


def login_view(request):
    if request.method == "POST":

        # Attempt to sign user in
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)

        # Check if authentication successful
        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse("index"))
        else:
            return render(request, "auctions/login.html", {
                "message": "Invalid username and/or password."
            })
    else:
        return render(request, "auctions/login.html")


def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("index"))


def register(request):
    if request.method == "POST":
        username = request.POST["username"]
        email = request.POST["email"]

        # Ensure password matches confirmation
        password = request.POST["password"]
        confirmation = request.POST["confirmation"]
        if password != confirmation:
            return render(request, "auctions/register.html", {
                "message": "Passwords must match."
            })

        # Attempt to create new user
        try:
            user = User.objects.create_user(username, email, password)
            user.save()
        except IntegrityError:
            return render(request, "auctions/register.html", {
                "message": "Username already taken."
            })
        login(request, user)
        return HttpResponseRedirect(reverse("index"))
    else:
        return render(request, "auctions/register.html")

def create(request):
    if request.method=="POST":
        user=User.objects.get(pk=request.user.id)
        title=request.POST.get("title")
        desc=request.POST.get("description")
        start_bid=int(request.POST.get("bid"))
        img=request.POST.get("image")
        List=Listing.objects.create(user=user,title=title,description=desc,start_bid=start_bid)
        return HttpResponseRedirect(reverse('index'))
    else:
        return render(request,"auctions/create.html")

def item(request,item_id):
    item=Listing.objects.get(pk=item_id)
    user=User.objects.get(pk=request.user.id)
    wishlist=Wishlist.objects.get(users=user)
    all_comments=item.all_comments.all()
    #-----------Updating Current Bid to Start Bid------------------
    new_bid=request.POST.get("Bid")
    if item.current_bid is None:
        bid=Bid.objects.create(user=user,item=item,bid=int(item.start_bid))
        item.current_bid=bid
        item.save()
    if user != item.user:
    #--------------------------------------------------------------
        if request.method=="POST":
        #------------------Bid---------------------------
            if new_bid is not '':
                if int(new_bid) <= item.current_bid.bid:
                    return render (request,"auctions/item.html",{
                    'message': "Bid should be higher than current bid",
                    "item_id": item_id,
                    "item": item,
                    "all_comments": all_comments
                    })
                    sys.exit()
                else:
                    bid=Bid.objects.create(user=user,item=item,bid=int(new_bid))
                    item.current_bid=bid
                    item.save()
                    return HttpResponseRedirect(reverse("item" , kwargs={'item_id':item_id}))
                    sys.exit()
        #-------------------Comment-----------------------------------
            new_comment=request.POST.get("add_comment")
            if new_comment is not '':
                comment=Comment.objects.create(user=user,item=item,comment=new_comment)
                item.all_comments.add(comment)
                return HttpResponseRedirect(reverse('item', kwargs={'item_id': item_id}))
                sys.exit()


        #-----------------------WishList-------------------------------
            if 'wishlist' in request.POST:
                wishlist.items.add(item)
                return HttpResponseRedirect(reverse('item', kwargs={'item_id':item_id}))
                sys.exit()



        if item in wishlist.items.all():
            return render (request,"auctions/item.html",{
            "item_id": item_id,
            "item": item,
            "all_comments": all_comments,
            "message_wishlist" : "Item Already Exists"
            })

        else:
            return render (request,"auctions/item.html",{
            "item_id": item_id,
            "item": item,
            "all_comments": all_comments,
            'user': user
            })
    else:
        if request.method=='POST':
            if 'close' in request.POST:
                item.status = 'Close'
                item.save()
                return HttpResponseRedirect(reverse('index'))
        if item in wishlist.items.all():
            return render (request,"auctions/item.html",{
            "item_id": item_id,
            "item": item,
            "all_comments": all_comments,
            "message_wishlist" : "Item Already Exists"
            })
        else:
            return render (request,"auctions/item.html",{
            "item_id": item_id,
            "item": item,
            "all_comments": all_comments,
            'user': user
            })

    if item in wishlist.items.all():
        return render (request,"auctions/item.html",{
        "item_id": item_id,
        "item": item,
        "all_comments": all_comments,
        "message_wishlist" : "Item Already Exists"
        })
#-----------------------Closed Bid View ----------------------------

def wishlist(request):
    user=User.objects.get(pk=request.user.id)
    wishlist=Wishlist.objects.get(users=user)
    wishitems=wishlist.items.all()
    return render(request,"auctions/wishlist.html",{
    "wishitems": wishitems
    })
