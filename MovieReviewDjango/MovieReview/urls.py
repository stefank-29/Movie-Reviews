from django.urls import path
from . import views
urlpatterns = [
    path('', views.movies, name='movies'),
    path('comments/<int:pk>', views.comments, name='comments'),
    
]