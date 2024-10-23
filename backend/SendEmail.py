import os
import smtplib
import ssl
from email.mime.image import MIMEImage
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

import qrcode
from django.conf import settings

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

port = 465  # For SSL

# Create a secure SSL context
context = ssl.create_default_context()


class SendEmail(object):
    def sendEmail(self, data):
        with smtplib.SMTP_SSL(host=settings.SMTP_HOST, port=settings.SMTP_PORT) as server:
            server.login(settings.SMTP_USER, settings.SMTP_PASS)
            msg = MIMEMultipart()
            msg['Subject'] = 'Your registration on Sheikh Ahmadullah talk at Darul Ihsan Berlin e.V'
            msg['From'] = settings.SMTP_EMAIL_FROM
            msg['To'] = data['email']

            html = """\
                <html>
                <head></head>
                <body>
                    <h4 style="font-size:15px;">Dear {},</h4> 
                    <p>Your DIB event details:</p>
                    <p>Sheikh Ahmadullah talk at Darul Ihsan Berlin e.V</p>
                    <p>10 November 2024</p>
                    <a href='https://goo.gl/maps/9dktuCs7rHC7yf6h7'>Brunnenstraße 122, 13355 Berlin</a>
                    <img src="cid:image1" alt="Logo" style="width:518px;height:518px;"><br>
                    <p><h4 style="font-size:15px;">QR Code</h4></p>  
                    <h3>Location</h3>
                    <hr/>
                    <a href='https://goo.gl/maps/9dktuCs7rHC7yf6h7'>Google Map</a>
                     <div className="rounded h-100">
                        <iframe className="rounded h-100 w-100"
                        style={{height: '400px'}}
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2742.579579632027!2d13.3912745770041!3d52.540414272066585!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47a85189789b79db%3A0x6c3999b02d78ed28!2sDarul%20Ihsan%20Berlin%20(Mosque)!5e1!3m2!1sen!2sde!4v1726469346147!5m2!1sen!2sde"
                        allowFullScreen="" loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"></iframe>
                     </div>
                    
                     </body>
                </html>
            """.format(data['name'])
            # Record the MIME types of text/html.
            part2 = MIMEText(html, 'html')

            # Attach parts into message container.
            msg.attach(part2)
            sendEmail = SendEmail()
            sendEmail.geneRateQrCode(data['name'] + ',' + data['phone'])
            fp = open(settings.SIGNUP_QRCODE_IMG, 'rb')
            msgImage = MIMEImage(fp.read())
            fp.close()

            # Define the image's ID as referenced above
            msgImage.add_header('Content-ID', '<image1>')
            msg.attach(msgImage)

            server.sendmail(settings.SMTP_EMAIL_FROM, data['email'], msg.as_string())
            # mailsrv.quit()

    def geneRateQrCode(self, data):
        qr = qrcode.QRCode(
            version=1,
            error_correction=qrcode.constants.ERROR_CORRECT_L,
            box_size=12,
            border=4,
        )
        qr.add_data(data)
        qr.make(fit=True)

        img = qr.make_image()
        # print(QRCODE_ROOT)
        img.save(settings.SIGNUP_QRCODE_IMG)
