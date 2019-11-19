from rest_framework.routers import SimpleRouter
from . import views

router = SimpleRouter()
router.register(r'customers', views.CustomersViewSet, views.CustomersViewSet.name)

urlpatterns = router.urls
