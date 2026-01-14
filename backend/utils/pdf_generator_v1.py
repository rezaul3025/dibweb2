# utils/pdf_generator.py
from io import BytesIO
from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import SimpleDocTemplate, Table, TableStyle, Paragraph, Spacer
from reportlab.lib.units import inch
from django.http import HttpResponse
import random
import string


def generate_payment_receipt(payment):
    """Generate PDF receipt for a payment"""
    buffer = BytesIO()
    doc = SimpleDocTemplate(
        buffer,
        pagesize=A4,
        topMargin=0.5 * inch,
        bottomMargin=0.5 * inch,
        leftMargin=0.5 * inch,
        rightMargin=0.5 * inch
    )
    elements = []

    styles = getSampleStyleSheet()

    # Header styles
    header_style = ParagraphStyle(
        'Header',
        parent=styles['Heading1'],
        fontSize=24,
        textColor=colors.HexColor('#2d3748'),
        spaceAfter=10,
        alignment=1,
    )

    subheader_style = ParagraphStyle(
        'SubHeader',
        parent=styles['Heading2'],
        fontSize=18,
        textColor=colors.HexColor('#4a5568'),
        spaceAfter=20,
        alignment=1,
    )

    # Header
    elements.append(Paragraph("Darul Ihsan Berlin Academy", header_style))
    elements.append(Paragraph("FEE PAYMENT RECEIPT", subheader_style))
    elements.append(Spacer(1, 20))

    # Student and Payment Details
    details_data = [
        ['Receipt Number:', payment.receipt_number],
        ['Date:', payment.created_date.strftime('%d-%m-%Y')],
        ['Student Name:', payment.student.full_name],
        ['Student ID:', payment.student.student_id],
        ['Class:', payment.student.get_classes],
    ]

    details_table = Table(details_data, colWidths=[2 * inch, 4 * inch])
    details_table.setStyle(TableStyle([
        ('FONT', (0, 0), (-1, -1), 'Helvetica', 10),
        ('BACKGROUND', (0, 0), (0, -1), colors.HexColor('#f7fafc')),
        ('GRID', (0, 0), (-1, -1), 1, colors.grey),
    ]))
    elements.append(details_table)
    elements.append(Spacer(1, 25))

    # Payment Lines
    items_header = ['Description', 'Amount (€)']
    items_data = [items_header]

    for line in payment.payment_lines.all():
        items_data.append([line.title, f"€{line.paid_amount:.2f}"])

    items_data.append(['TOTAL', f"€{payment.total_paid_amount:.2f}"])

    items_table = Table(items_data, colWidths=[4 * inch, 1.5 * inch])
    items_table.setStyle(TableStyle([
        ('FONT', (0, 0), (-1, 0), 'Helvetica-Bold', 10),
        ('FONT', (0, 1), (-1, -1), 'Helvetica', 10),
        ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#4a5568')),
        ('TEXTCOLOR', (0, 0), (-1, 0), colors.white),
        ('ALIGN', (1, 0), (1, -1), 'RIGHT'),
        ('GRID', (0, 0), (-1, -1), 1, colors.grey),
    ]))
    elements.append(items_table)
    elements.append(Spacer(1, 30))

    # Footer
    footer_style = ParagraphStyle(
        'Footer',
        parent=styles['Normal'],
        fontSize=9,
        textColor=colors.HexColor('#718096'),
        alignment=1,
    )

    elements.append(Paragraph(f"Payment Status: {payment.status_display}", footer_style))
    elements.append(Paragraph("This is a computer generated receipt. No signature required.", footer_style))
    elements.append(Paragraph("Thank you for your payment!", footer_style))

    doc.build(elements)
    buffer.seek(0)
    return buffer