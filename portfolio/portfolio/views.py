from django.shortcuts import render ,redirect
from django.core.mail import send_mail

from django.http import HttpRequest,HttpResponseRedirect
from contact.models import contact
from django.conf import settings
from portfolio.settings import EMAIL_HOST_USER

def home(request):
    return render(request, 'home.html')
def about(request):
    return render(request, 'about.html')
def skills(request):
    return render(request, 'skills.html')
def projects(request):
    return render(request, 'projects.html')
def contact_(request):
    print("hello")
    if request.method=="POST":
        print("post")
        name=request.POST.get("name")
        email=request.POST.get("email")
        message_=request.POST.get("message")
        # contactdata=contact.objects.all()
        # data={'contactdata':contactdata}
        
        
    contact.objects.create(contact_name=name,
                            contact_email=email,
                            contact_message=message_

        )
    

    send_mail(
        subject=name,
        message=f"""
        email-{email} 
        message-{message_}
        """,
        from_email=EMAIL_HOST_USER,
        recipient_list=['pushpenderrana270@gmail.com'],
        fail_silently=False,
        )


    return render(request, 'contact.html')