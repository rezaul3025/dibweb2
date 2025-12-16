from django.views import View
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.db import transaction
from django.core.exceptions import ValidationError
from django.utils import timezone
from decimal import Decimal
import json
import logging

from .models import Payment, PaymentLine, Student

logger = logging.getLogger(__name__)


@method_decorator(csrf_exempt, name='dispatch')
class PaymentCreateView(View):
    """
    POST endpoint to create a payment with payment lines
    """

    def post(self, request, *args, **kwargs):
        try:
            # Parse request data
            try:
                data = json.loads(request.body)
            except json.JSONDecodeError:
                return JsonResponse({
                    'error': 'Invalid JSON format'
                }, status=400)

            # Validate required fields
            validation_errors = self.validate_request_data(data)
            if validation_errors:
                return JsonResponse({
                    'error': 'Validation failed',
                    'details': validation_errors
                }, status=400)

            # Create payment with transaction to ensure atomicity
            with transaction.atomic():
                # Create Payment instance
                payment = self.create_payment(data)

                # Create PaymentLine instances
                payment_lines_data = data.get('payment_lines', [])
                payment_lines = self.create_payment_lines(payment, payment_lines_data)

                # Update payment status based on payment lines
                payment.update_status()

                # Prepare response data
                response_data = self.prepare_response_data(payment, payment_lines)

                return JsonResponse(response_data, status=201)

        except Student.DoesNotExist:
            return JsonResponse({
                'error': 'Student not found'
            }, status=404)
        except ValidationError as e:
            return JsonResponse({
                'error': 'Data validation failed',
                'details': e.message_dict if hasattr(e, 'message_dict') else str(e)
            }, status=400)
        except Exception as e:
            logger.error(f"Error creating payment: {str(e)}", exc_info=True)
            return JsonResponse({
                'error': 'Internal server error',
                'details': str(e)
            }, status=500)

    def validate_request_data(self, data):
        """Validate the incoming request data"""
        errors = {}

        # Validate student_id
        student_id = data.get('student_id')
        if not student_id:
            errors['student_id'] = 'Student ID is required'
        elif not isinstance(student_id, int):
            errors['student_id'] = 'Student ID must be an integer'

        # Validate payment_method
        payment_method = data.get('payment_method', 'CASH')
        valid_payment_methods = [choice[0] for choice in Payment.PAYMENT_METHODS]
        if payment_method not in valid_payment_methods:
            errors['payment_method'] = f'Invalid payment method. Must be one of: {", ".join(valid_payment_methods)}'

        # Validate status if provided
        status = data.get('status', 'PENDING')
        valid_statuses = [choice[0] for choice in Payment.STATUS_CHOICES]
        if status not in valid_statuses:
            errors['status'] = f'Invalid status. Must be one of: {", ".join(valid_statuses)}'

        # Validate payment_lines
        payment_lines = data.get('payment_lines', [])
        if not payment_lines:
            errors['payment_lines'] = 'At least one payment line is required'
        else:
            for i, line in enumerate(payment_lines):
                line_errors = self.validate_payment_line(line)
                if line_errors:
                    errors[f'payment_lines.{i}'] = line_errors

        return errors

    def validate_payment_line(self, line_data):
        """Validate a single payment line"""
        errors = {}

        # Validate type
        line_type = line_data.get('type')
        valid_types = [choice[0] for choice in PaymentLine.TYPE_CHOICES]
        if not line_type:
            errors['type'] = 'Type is required'
        elif line_type not in valid_types:
            errors['type'] = f'Invalid type. Must be one of: {", ".join(valid_types)}'

        # Validate expected_amount
        expected_amount = line_data.get('expected_amount')
        if expected_amount is None:
            errors['expected_amount'] = 'Expected amount is required'
        else:
            try:
                expected_amount_decimal = Decimal(str(expected_amount))
                if expected_amount_decimal <= 0:
                    errors['expected_amount'] = 'Expected amount must be greater than 0'
            except:
                errors['expected_amount'] = 'Expected amount must be a valid number'

        # Validate paid_amount
        paid_amount = line_data.get('paid_amount', 0)
        try:
            paid_amount_decimal = Decimal(str(paid_amount))
            if paid_amount_decimal < 0:
                errors['paid_amount'] = 'Paid amount cannot be negative'

            # Validate paid_amount doesn't exceed expected_amount
            if expected_amount and paid_amount_decimal > Decimal(str(expected_amount)):
                errors['paid_amount'] = 'Paid amount cannot exceed expected amount'
        except:
            errors['paid_amount'] = 'Paid amount must be a valid number'

        # Validate month if provided
        month = line_data.get('month')
        if month is not None:
            if not isinstance(month, int) or month < 1 or month > 12:
                errors['month'] = 'Month must be between 1 and 12'

        # Validate year if provided
        year = line_data.get('year', timezone.now().year)
        if not isinstance(year, int) or year < timezone.now().year - 5 or year > timezone.now().year + 5:
            errors['year'] = 'Year is invalid'

        return errors

    def create_payment(self, data):
        """Create a Payment instance"""
        student = Student.objects.get(id=data['student_id'])

        payment = Payment.objects.create(
            student=student,
            payment_method=data.get('payment_method', 'CASH'),
            status=data.get('status', 'PENDING'),
            notes=data.get('notes')
        )

        return payment

    def create_payment_lines(self, payment, payment_lines_data):
        """Create PaymentLine instances"""
        payment_lines = []

        for line_data in payment_lines_data:
            payment_line = PaymentLine.objects.create(
                payment_ref=payment,
                type=line_data['type'],
                expected_amount=Decimal(str(line_data['expected_amount'])),
                paid_amount=Decimal(str(line_data.get('paid_amount', 0))),
                month=line_data.get('month'),
                year=line_data.get('year', timezone.now().year)
            )
            payment_lines.append(payment_line)

        return payment_lines

    def prepare_response_data(self, payment, payment_lines):
        """Prepare response data structure"""
        return {
            'id': payment.id,
            'student_id': payment.student.id,
            'student_name': str(payment.student),
            'created_date': payment.created_date.isoformat(),
            'payment_method': payment.payment_method,
            'payment_method_display': payment.get_payment_method_display(),
            'status': payment.status,
            'status_display': payment.status_display,
            'notes': payment.notes,
            'total_paid_amount': float(payment.total_paid_amount),
            'total_expected_amount': float(payment.total_expected_amount),
            'is_fully_paid': payment.is_fully_paid,
            'receipt_number': payment.receipt_number,
            'payment_for': payment.payment_for,
            'payment_lines': [
                {
                    'id': line.id,
                    'type': line.type,
                    'type_display': line.get_type_display(),
                    'expected_amount': float(line.expected_amount),
                    'paid_amount': float(line.paid_amount),
                    'remaining_amount': float(line.remaining_amount),
                    'payment_percentage': line.payment_percentage,
                    'is_fully_paid': line.is_fully_paid,
                    'month': line.month,
                    'month_display': line.get_month_display() if line.month else None,
                    'year': line.year,
                    'title': line.title,
                    'created_at': line.created_at.isoformat()
                }
                for line in payment_lines
            ]
        }