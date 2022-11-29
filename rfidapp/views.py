from rest_framework.response import Response
from .serializer import TagSerializers
from .models import Tag, Names
from rest_framework.decorators import api_view
from rest_framework import status
from django.shortcuts import render, redirect

# Create your views here.


@api_view(['GET', 'POST'])
def api(request):
    if request.method == 'GET':
        instance = Tag.objects.all()
        serializer = TagSerializers(instance, many=True)
        return Response(serializer.data)

    if request.method == 'POST':
        serializer = TagSerializers(data=request.data)
        if serializer.is_valid():
            serializer.save()

        return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(['GET', 'PUT', 'DELETE'])
def apidetails(request, id):
    try:
        instance = Tag.objects.get(pk=id)
    except Tag.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = TagSerializers(instance)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = TagSerializers(instance, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        instance.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


def home(request):
    tags = Names.objects.all()
    return render(request, 'index.html', {"tags": tags})


def dashboard(request):
    names = Names.objects.all()

    return render(request, 'all_data.html', {'names': names})


def add(request):
    if request.method == 'POST':
        firstname = request.POST["first"]
        lastname = request.POST["last"]
        tagid = request.POST.get('rfid')
        # print(tagid)
        # instance = Names(name=firstname, surname=lastname, tag=Tag.tag)
        # instance.save()
        return redirect('home')

    taglists = []
    tags = Tag.objects.all()
    for i in tags:
        taglists.append(i.tag)
    context = {
        "taglists": list(set(taglists)),
    }
    # print(list(set(taglist)))
    return render(request, 'add.html', context)
