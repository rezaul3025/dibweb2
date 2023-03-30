from notice_board.settings.common import  *

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}

SIGNUP_URL = 'http://127.0.0.1:8000/signup'
SMTP_HOST = 'smtp.gmail.com'
SMTP_PORT = 465
SMTP_USER = 'dibev.events@gmail.com'
SMTP_PASS = 'jbckwzopenqhznhk'
SMTP_EMAIL_FROM = 'dibev.events@gmail.com'