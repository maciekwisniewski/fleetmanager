import os

from django.core.wsgi import get_wsgi_application

import sys   
sys.path.append('/home/maciek/dev/fleetmanager/fleetmanager')
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "fleetmanager.settings")
application = get_wsgi_application()
