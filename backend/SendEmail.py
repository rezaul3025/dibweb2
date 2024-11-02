import smtplib
from email.mime.image import MIMEImage
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

import qrcode
from django.conf import settings

class SendEmail(object):
    def ticket_confirmation(self, attendee_data, event_data):
        with smtplib.SMTP_SSL(host=settings.SMTP_HOST, port=settings.SMTP_PORT) as server:
            server.login(settings.SMTP_USER, settings.SMTP_PASS)
            msg = MIMEMultipart()
            msg['Subject'] = 'Your ticket for {} on {}'.format(event_data.title, event_data.event_datetime)
            msg['From'] = settings.SMTP_EMAIL_FROM
            msg['To'] = attendee_data.email

            html = """\
                <html>
                <head></head>
                <body>
                    <h4 style="font-size:15px;">Dear {},</h4> 
                    <p>Your Ticket details:</p>
                    <p><b>{}</b></p>
                    <p>{}</p>
                    <p>Date & Time: {}</p>
                    <p>Location: <a href='{}'>{}</a></p>
                    <p>Please show the QR code on the entrance</>
                    <img src="cid:image1" alt="Logo" style="width:518px;height:518px;"><br>
                    <p><h4 style="font-size:15px;">QR Code</h4></p>  
                </body>
                </html>
            """.format(attendee_data.name, attendee_data.ticket_info, event_data.title, event_data.event_datetime, event_data.map_location, event_data.address)
            # Record the MIME types of text/html.
            part2 = MIMEText(html, 'html')

            # Attach parts into message container.
            msg.attach(part2)
            sendEmail = SendEmail()

            sendEmail.geneRateQrCode(settings.HOST_URL+'/verify/{}/{}/'.format(attendee_data.id, attendee_data.payment_reference))
            fp = open(settings.SIGNUP_QRCODE_IMG, 'rb')
            msgImage = MIMEImage(fp.read())
            fp.close()

            # Define the image's ID as referenced above
            msgImage.add_header('Content-ID', '<image1>')
            msg.attach(msgImage)

            server.sendmail(settings.SMTP_EMAIL_FROM, attendee_data.email, msg.as_string())
            # mailsrv.quit()

    def resend_ticket_purchase_email(self, attendee_data, event_data):
        pLink='{}/payment/{}/'.format(settings.HOST_URL, attendee_data.id)
        with smtplib.SMTP_SSL(host=settings.SMTP_HOST, port=settings.SMTP_PORT) as server:
            server.login(settings.SMTP_USER, settings.SMTP_PASS)
            msg = MIMEMultipart()
            msg['Subject'] = 'Please complete your ticket purchase for {} on {}'.format(event_data.title, event_data.event_datetime)
            msg['From'] = settings.SMTP_EMAIL_FROM
            msg['To'] = attendee_data.email

            html = """\
                            <html>
                            <head></head>
                            <body>
                                <h4 style="font-size:15px;">Dear {},</h4> 
                                <p>Please go to the following link to complete the ticket purchase:</p>
                                <p><a href='{}'>{}</a></p>
                                <p> Event : {} </p>
                                <p>Ticket you have chosen: {} </p> 
                                <p>Date & Time: {}</p>
                                <p>Location: <a href='{}'>{}</a></p>
                            </body>
                            </html>
                        """.format(attendee_data.name, pLink, pLink, event_data.title, attendee_data.ticket_info,
                                   event_data.event_datetime, event_data.map_location, event_data.address)
            # Record the MIME types of text/html.
            part2 = MIMEText(html, 'html')

            # Attach parts into message container.
            msg.attach(part2)
            server.sendmail(settings.SMTP_EMAIL_FROM, attendee_data.email, msg.as_string())

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
