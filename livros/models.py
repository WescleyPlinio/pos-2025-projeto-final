from django.db import models

class Editora(models.Model):
    nome = models.CharField(max_length=50)

class Autor(models.Model):
    nome = models.CharField(max_length=50)

class Livro(models.Model):
    STATUS_CHOICES = [
        ("Novo", "Novo"),
        ("Seminovo", "Seminovo"),
        ("Velho", "Velho"),
    ]

    titulo = models.CharField(max_length=50)
    autor = models.ForeignKey(Autor, on_delete=models.CASCADE, related_name="livros_escritos")
    editora = models.ForeignKey(Editora, on_delete=models.CASCADE, related_name="livros")
    ano_lancamento = models.DateField(auto_now=False, auto_now_add=False)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES)
    paginas = models.IntegerField()