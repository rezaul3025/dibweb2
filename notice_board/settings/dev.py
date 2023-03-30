from notice_board.settings.common import  *

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}

SIGNUP_URL = 'http://prayer.darulihsan-berlin.com/signup'
SMTP_HOST = 'n3plcpnl0152.prod.ams3.secureserver.net'
SMTP_PORT = '465'
SMTP_USER = 'info@prayer.darulihsan-berlin.com'
SMTP_PASS = os.environ.get('SMTP_PASS')
SMTP_EMAIL_FROM = 'info@prayer.darulihsan-berlin.com'