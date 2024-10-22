from dibweb2.settings.common import *

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(BASE_DIR,'db.sqlite3'),
    }
}

SIGNUP_URL = 'http://prayer.darulihsan-berlin.com/signup'
SMTP_HOST = 'darulihsan-berlin.com'
SMTP_PORT = 465
SMTP_USER = 'info@darulihsan-berlin.com'
SMTP_PASS = os.environ.get('SMTP_PASS')
SMTP_EMAIL_FROM = 'info@darulihsan-berlin.com'
SIGNUP_QRCODE_IMG =  os.path.join(BASE_DIR, 'media','event_signup.png')
