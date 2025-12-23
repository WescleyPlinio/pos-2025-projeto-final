from rest_framework import viewsets
from livros.api import serializers
from livros import models

class AutorViewSet(viewsets.ModelViewSet):
    serializer_class = serializers.AutorSerializer
    queryset = models.Autor.objects.all()

class EditoraViewSet(viewsets.ModelViewSet):
    serializer_class = serializers.EditoraSerializer
    queryset = models.Editora.objects.all()

class LivroViewSet(viewsets.ModelViewSet):
    serializer_class = serializers.LivroSerializer
    queryset = models.Livro.objects.all()