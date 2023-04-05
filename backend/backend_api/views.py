from rest_framework import viewsets

from .models import Project
from .serializers import ProjectSerializer
# Create your views here.

class ProjectViewSet(viewsets.ReadOnlyModelViewSet):
  queryset = Project.objects.all()
  serializer_class = ProjectSerializer