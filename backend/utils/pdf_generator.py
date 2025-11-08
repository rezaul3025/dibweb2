# utils/pdf_generator.py
from io import BytesIO

from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
from reportlab.platypus import SimpleDocTemplate, Table, TableStyle, Paragraph, Spacer


def generate_payment_receipt(payment):
    """Generate PDF receipt matching the HTML structure"""
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

    # Custom styles matching your HTML
    header_style = ParagraphStyle(
        'Header',
        parent=styles['Heading1'],
        fontSize=28,
        textColor=colors.HexColor('#2d3748'),
        spaceAfter=10,
        alignment=1,  # Center
    )

    subheader_style = ParagraphStyle(
        'SubHeader',
        parent=styles['Heading2'],
        fontSize=20,
        textColor=colors.HexColor('#4a5568'),
        spaceAfter=20,
        alignment=1,
    )

    address_style = ParagraphStyle(
        'Address',
        parent=styles['Normal'],
        fontSize=10,
        textColor=colors.HexColor('#718096'),
        alignment=1,
        spaceAfter=5,
    )

    detail_label_style = ParagraphStyle(
        'DetailLabel',
        parent=styles['Normal'],
        fontSize=10,
        textColor=colors.black,
        fontName='Helvetica-Bold',
    )

    detail_value_style = ParagraphStyle(
        'DetailValue',
        parent=styles['Normal'],
        fontSize=10,
        textColor=colors.black,
    )

    footer_style = ParagraphStyle(
        'Footer',
        parent=styles['Normal'],
        fontSize=9,
        textColor=colors.HexColor('#718096'),
        alignment=1,
        spaceBefore=10,
    )

    # Header Section
    elements.append(Paragraph("Darul Ihsan Berlin Academy", header_style))
    elements.append(Paragraph("FEE PAYMENT RECEIPT", subheader_style))
    elements.append(Paragraph("Brunnenstraße 122, 13355 Berlin", address_style))
    elements.append(Paragraph("Phone: +49 176 5779 1221 | Web: www.darulihsan-berlin.com", address_style))
    elements.append(Spacer(1, 20))

    # Receipt Details Section
    details_data = [
        [Paragraph('<b>Receipt Number:</b>', detail_label_style),
         Paragraph(payment.receipt_number, detail_value_style)],
        [Paragraph('<b>Date:</b>', detail_label_style),
         Paragraph(payment.created_date.strftime('%d-%m-%Y'), detail_value_style)],
        [Paragraph('<b>Student Name:</b>', detail_label_style),
         Paragraph(payment.student.full_name, detail_value_style)],
        [Paragraph('<b>Student ID:</b>', detail_label_style),
         Paragraph(payment.student.student_id, detail_value_style)],
        [Paragraph('<b>Class:</b>', detail_label_style),
         Paragraph(payment.student.get_classes, detail_value_style)],
        [Paragraph('<b>Payment For:</b>', detail_label_style),
         Paragraph(payment.payment_for, detail_value_style)],
    ]

    details_table = Table(details_data, colWidths=[2 * inch, 4 * inch])
    details_table.setStyle(TableStyle([
        ('LEFTPADDING', (0, 0), (-1, -1), 16),
        ('RIGHTPADDING', (0, 0), (-1, -1), 0),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 8),
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
    ]))
    elements.append(details_table)
    elements.append(Spacer(1, 25))

    # Items Table
    items_header = [
        Paragraph('<b>Description</b>', detail_label_style),
        Paragraph('<b>Amount (€)</b>', detail_label_style)
    ]

    items_data = [items_header]

    for line in payment.payment_lines.all():
        items_data.append([
            Paragraph(line.title, detail_value_style),
            Paragraph(f"€{line.paid_amount:.2f}", detail_value_style)
        ])

    items_table = Table(items_data, colWidths=[4 * inch, 1.5 * inch])
    items_table.setStyle(TableStyle([
        ('ALIGN', (0, 0), (0, -1), 'LEFT'),
        ('ALIGN', (1, 0), (1, -1), 'RIGHT'),
        ('FONT', (0, 0), (-1, 0), 'Helvetica-Bold', 10),
        ('FONT', (0, 1), (-1, -1), 'Helvetica', 10),
        ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#f8f9fa')),
        ('TEXTCOLOR', (0, 0), (-1, 0), colors.HexColor('#2d3748')),
        ('GRID', (0, 0), (-1, -1), 1, colors.HexColor('#e2e8f0')),
        ('BOTTOMPADDING', (0, 0), (-1, 0), 12),
        ('TOPPADDING', (0, 0), (-1, 0), 12),
        ('BOTTOMPADDING', (0, 1), (-1, -1), 8),
        ('TOPPADDING', (0, 1), (-1, -1), 8),
        ('LEFTPADDING', (0, 0), (-1, -1), 12),
        ('RIGHTPADDING', (0, 0), (-1, -1), 12),
    ]))
    elements.append(items_table)
    elements.append(Spacer(1, 20))

    # Total Section
    total_style = ParagraphStyle(
        'Total',
        parent=styles['Normal'],
        fontSize=15,
        textColor=colors.HexColor('#2d3748'),
        alignment=2,  # Right alignment
        leftIndent=0,
    )

    # Create a table to ensure consistent width and padding
    total_table_data = [[
        Paragraph(f"Total Amount: €{payment.total_paid_amount:.2f}", total_style)
    ]]

    total_table = Table(total_table_data, colWidths=[6 * inch])  # Adjust based on your page width
    total_table.setStyle(TableStyle([
        ('ALIGN', (0, 0), (-1, -1), 'RIGHT'),
        ('RIGHTPADDING', (0, 0), (-1, -1), 20),  # Additional right padding
        ('LEFTPADDING', (0, 0), (-1, -1), 0),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 5),
        ('TOPPADDING', (0, 0), (-1, -1), 5),
    ]))

    elements.append(total_table)
    elements.append(Spacer(1, 25))

    # Footer Section
    elements.append(Paragraph(f"<b>Payment Status:</b> {payment.status_display}", footer_style))
    elements.append(Paragraph("This is a computer generated receipt. No signature required.", footer_style))
    elements.append(Paragraph("Thank you for your payment!", footer_style))

    doc.build(elements)
    buffer.seek(0)
    return buffer