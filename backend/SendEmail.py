import os
from django.conf import settings
import smtplib
import ssl
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

port = 465  # For SSL

# Create a secure SSL context
context = ssl.create_default_context()


class SendEmail(object):
    def sendEmail(self, data):
        port = 465  # For SSL
        # Create a secure SSL context
        context = ssl.create_default_context()
        #with smtplib.SMTP_SSL("smtp.gmail.com", port, context=context) as server:
        with smtplib.SMTP('localhost:2525') as server:
            #server.login("dibev.events@gmail.com", "Aprdibev198743389")
            msg = MIMEMultipart('related')
            msg['Subject'] = 'দারুল ইহসান নোটিশ বোর্ড সাইনআপের আমন্ত্রণ'
            msg['From'] = 'dibev.events@gmail.com'
            msg['To'] = data.email

            html = """\
                <html>
                <head></head>
                <body>
                    <h4 style="font-size:15px;">আসসালামু আলাইকুম ওয়া রাহমাতুল্লাহি ওয়া বারাকাতুহ,</h4> 
                    <p>এটি আপনার জন্য দারুল ইহসান নোটিশ বোর্ড সাইন আপ করার জন্য আমন্ত্রণ। সাইন আপ সম্পূর্ণ করার জন্য নীচের লিঙ্কে ক্লিক করুন.</p>
                    <p><a href={}&email={}>নোটিশ বোর্ড সাইন আপ</a></p>
                    </body>
                </html>
            """.format(settings.SIGNUP_URL, data.email)
            # Record the MIME types of text/html.
            part2 = MIMEText(html, 'html')

            # Attach parts into message container.
            msg.attach(part2)
            # Send the message via local SMTP server.
            # mailsrv = smtplib.SMTP('localhost')
            server.sendmail('dibev.events@gmail.com', data.email, msg.as_string())
            # mailsrv.quit()