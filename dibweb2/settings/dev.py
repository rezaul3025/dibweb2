from dibweb2.settings.common import *

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
SMTP_PASS = 'cuqg uras ftto wbfn'
SMTP_EMAIL_FROM = 'dibev.events@gmail.com'
