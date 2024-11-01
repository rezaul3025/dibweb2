from datetime import timedelta

from dibweb2.settings.common import *

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': os.environ.get('DB_NAME'),
        'USER': os.environ.get('DB_USER'),
        'PASSWORD': os.environ.get('DB_PASSWORD'),
        'HOST': os.environ.get('DB_HOST'),
        'PORT': '3306',
        'OPTIONS': {'charset': 'utf8',
                    'use_unicode': True,},
        'TIME_ZONE': 'Europe/Berlin',
    }
 }

#DATABASES = {
#    'default': {
#        'ENGINE': 'django.db.backends.sqlite3',
#        'NAME': os.path.join(BASE_DIR,'db.sqlite3'),
#    }
#}

DEBUG = True

MEDIA_ROOT = '/home/ru3675hi2cgp/public_html/prayer.darulihsan-berlin.com/static/assets'

SIGNUP_URL = 'http://prayer.darulihsan-berlin.com/signup'
HOST_URL='http://prayer.darulihsan-berlin.com'
SMTP_HOST = 'darulihsan-berlin.com'
SMTP_PORT = 465
SMTP_USER = 'info@darulihsan-berlin.com'
SMTP_PASS = os.environ.get('SMTP_PASS')
SMTP_EMAIL_FROM = 'info@darulihsan-berlin.com'
SIGNUP_QRCODE_IMG =  os.path.join(BASE_DIR, 'media','event_signup.png')

SIMPLE_JWT = {
    'REFRESH_TOKEN_LIFETIME': timedelta(days=15),
    'ROTATE_REFRESH_TOKENS': True,
}
