from django.shortcuts import render
from django.http import HttpResponse
import requests


   
def movies(request): 
   
    response = requests.get('http://localhost:5000/api/movies')
    movies = response.json()
    return render(request , 'movie.html' ,{'movies': movies}) 

   
def comments(request): 
   
   
    return render(request , 'comments.html') 
  