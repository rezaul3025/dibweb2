# utils/email_utils.py
from django.core.mail import EmailMessage
from django.template.loader import render_to_string
from io import BytesIO
from .pdf_generator import generate_payment_receipt
import logging

logger = logging.getLogger(__name__)


def send_payment_receipt_email(payment):
    """Send payment receipt via email to student"""
    try:
        student = payment.student
        if not student.email:
            return False, "Student has no email address"

        # Generate PDF
        pdf_buffer = generate_payment_receipt(payment)

        # Create email
        subject = f"Payment Receipt - {payment.receipt_number}"

        html_message = render_to_string('emails/payment_receipt.html', {
            'student': student,
            'payment': payment,
        })

        plain_message = f"""
        Dear {student.full_name},

        Thank you for your payment. Please find your receipt attached.

        Receipt Number: {payment.receipt_number}
        Amount: €{payment.total_paid_amount:.2f}
        Date: {payment.created_date.strftime('%Y-%m-%d')}

        Best regards,
        Darul Ihsan Berlin Academy
        """

        email = EmailMessage(
            subject=subject,
            body=plain_message,
            from_email='accounts@darulihsan-berlin.com',
            to=[student.email],
        )
        email.attach(
            f"receipt_{payment.receipt_number}.pdf",
            pdf_buffer.getvalue(),
            'application/pdf'
        )

        email.send()
        logger.info(f"Receipt email sent to {student.email}")
        return True, "Email sent successfully"

    except Exception as e:
        logger.error(f"Failed to send email: {str(e)}")
        return False, str(e)