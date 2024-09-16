from datetime import timedelta

from dibweb2.settings.common import *

# DATABASES = {
#    'default': {
#        'ENGINE': 'django.db.backends.mysql',
#        'NAME': os.environ.get('DB_NAME'),
#        'USER': os.environ.get('DB_USER'),
#        'PASSWORD': os.environ.get('DB_PASSWORD'),
#        'HOST': os.environ.get('DB_HOST'),
#        'PORT': '3306',
#        'OPTIONS': {'charset': 'utf8mb4'},
#        'TIME_ZONE': 'Europe/Berlin',
#    }
# }

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}

SIGNUP_URL = 'http://prayer.darulihsan-berlin.com/signup'
SMTP_HOST = 'smtp.gmail.com'
SMTP_PORT = 465
SMTP_USER = 'dibev.events@gmail.com'
SMTP_PASS = os.environ.get('SMTP_PASS')
SMTP_EMAIL_FROM = 'dibev.events@gmail.com'

SIMPLE_JWT = {
    'REFRESH_TOKEN_LIFETIME': timedelta(days=15),
    'ROTATE_REFRESH_TOKENS': True,
}
