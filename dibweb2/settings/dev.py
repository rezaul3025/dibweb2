from dibweb2.settings.common import *

ALLOWED_HOSTS = [ 'http://0.0.0.0:8089/','192.168.188.41','192.168.188.57','0.0.0.0','172.26.17.17','192.168.188.32']

DEBUG = True

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(BASE_DIR,'db.sqlite3'),
    }
}

MEDIA_ROOT = os.path.join(Path(BASE_DIR).parents[0], 'frontend', 'static','assets')

SIGNUP_URL = 'http://prayer.darulihsan-berlin.com/signup'
HOST_URL='http://127.0.0.1:8000'
SMTP_HOST = 'darulihsan-berlin.com'
SMTP_PORT = 465
SMTP_USER = 'info@darulihsan-berlin.com'
SMTP_PASS = os.environ.get('SMTP_PASS')
SMTP_EMAIL_FROM = 'info@darulihsan-berlin.com'
SIGNUP_QRCODE_IMG =  os.path.join(BASE_DIR, 'media','event_signup.png')
