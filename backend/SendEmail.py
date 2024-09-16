import os
import smtplib
import ssl
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

from django.conf import settings

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

port = 465  # For SSL

# Create a secure SSL context
context = ssl.create_default_context()


class SendEmail(object):
    def sendEmail(self, data):
        port = 465  # For SSL
        # Create a secure SSL context
        context = ssl.create_default_context()
        # print(settings.SMTP_HOST, settings.SMTP_USER,settings.SMTP_PASS, settings.SMTP_PORT, settings.SMTP_EMAIL_FROM, data.email)
        # with smtplib.SMTP_SSL(socket.gethostbyname('smtp.gmail.com'), settings.SMTP_PORT, context=context) as server:
        # print(socket.gethostbyname('smtp.gmail.com')+':465')
        with smtplib.SMTP('smtp.gmail.com:587') as server:
            server.starttls()
            server.login(settings.SMTP_USER, settings.SMTP_PASS)
            msg = MIMEMultipart()
            msg['Subject'] = 'দারুল ইহসান নোটিশ বোর্ড সাইনআপের আমন্ত্রণ'
            msg['From'] = settings.SMTP_EMAIL_FROM
            msg['To'] = data.email

            html = """\
                <html>
                <head></head>
                <body>
                    <h4 style="font-size:15px;">আসসালামু আলাইকুম ওয়া রাহমাতুল্লাহি ওয়া বারাকাতুহ,</h4> 
                    <p>এটি আপনার জন্য দারুল ইহসান নোটিশ বোর্ড সাইন আপ করার জন্য আমন্ত্রণ। সাইন আপ সম্পূর্ণ করার জন্য নীচের লিঙ্কে ক্লিক করুন.</p>
                    <p><a href={}>নোটিশ বোর্ড সাইন আপ</a></p>
                    </body>
                </html>
            """.format(settings.SIGNUP_URL)
            # Record the MIME types of text/html.
            part2 = MIMEText(html, 'html')

            # Attach parts into message container.
            msg.attach(part2)
            # Send the message via local SMTP server.
            # mailsrv = smtplib.SMTP('localhost')
            server.sendmail(settings.SMTP_EMAIL_FROM, data.email, msg.as_string())
            # mailsrv.quit()
