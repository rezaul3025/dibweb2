// PaymentForm.jsx
import React, {useEffect, useRef, useState} from 'react';
import axios from 'axios';

const AddPayment = ({studentId, onSuccess, onCancel}) => {
    const [formData, setFormData] = useState({
        student_id: studentId || '',
        payment_method: 'CASH',
        notes: '',
        payment_lines: []
    });

    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const scrollContainerRef = useRef(null);

    // Payment options (same as before)
    const PAYMENT_METHODS = [
        {value: 'CASH', label: 'Cash'},
        {value: 'CARD', label: 'Credit/Debit Card'},
        {value: 'BANK_TRANSFER', label: 'Bank Transfer'},
        {value: 'UPI', label: 'UPI Payment'},
        {value: 'CHEQUE', label: 'Cheque'},
        {value: 'ONLINE', label: 'Online Payment'},
        {value: 'OTHER', label: 'Other'}
    ];

    const PAYMENT_TYPES = [
        {value: 'TUITION', label: 'Tuition Fee'},
        {value: 'HOSTEL', label: 'Hostel Fee'},
        {value: 'MESS', label: 'Mess Fee'},
        {value: 'LIBRARY', label: 'Library Fee'},
        {value: 'LABORATORY', label: 'Laboratory Fee'},
        {value: 'EXAMINATION', label: 'Examination Fee'},
        {value: 'SPORTS', label: 'Sports Fee'},
        {value: 'MEDICAL', label: 'Medical Fee'},
        {value: 'TRANSPORT', label: 'Transport Fee'},
        {value: 'DEVELOPMENT', label: 'Development Fee'},
        {value: 'SECURITY', label: 'Security Fee'},
        {value: 'CAUTION', label: 'Caution Deposit'},
        {value: 'REGISTRATION', label: 'Registration Fee'},
        {value: 'ADMISSION', label: 'Admission Fee'},
        {value: 'LATE_FEE', label: 'Late Fee'},
        {value: 'FINE', label: 'Fine'},
        {value: 'OTHER', label: 'Other'}
    ];

    const MONTHS = [
        {value: 1, label: 'January'},
        {value: 2, label: 'February'},
        {value: 3, label: 'March'},
        {value: 4, label: 'April'},
        {value: 5, label: 'May'},
        {value: 6, label: 'June'},
        {value: 7, label: 'July'},
        {value: 8, label: 'August'},
        {value: 9, label: 'September'},
        {value: 10, label: 'October'},
        {value: 11, label: 'November'},
        {value: 12, label: 'December'}
    ];

    const currentYear = new Date().getFullYear();
    const YEARS = Array.from({length: 6}, (_, i) => currentYear - 2 + i);

    useEffect(() => {
        fetchStudents();
    }, []);

    // Auto-scroll to bottom when new payment lines are added
    useEffect(() => {
        if (scrollContainerRef.current && formData.payment_lines.length > 0) {
            const scrollContainer = scrollContainerRef.current;
            scrollContainer.scrollTop = scrollContainer.scrollHeight;
        }
    }, [formData.payment_lines.length]);

    const fetchStudents = async () => {
        try {
            const response = await axios.get('/api/students/');
            setStudents(response.data.results || response.data);
        } catch (error) {
            console.error('Error fetching students:', error);
        }
    };

    const addPaymentLine = () => {
        setFormData(prev => ({
            ...prev,
            payment_lines: [
                ...prev.payment_lines,
                {
                    type: 'TUITION',
                    paid_amount: 0,
                    expected_amount: 0,
                    month: new Date().getMonth() + 1,
                    year: currentYear,
                    title: ''
                }
            ]
        }));
    };

    const updatePaymentLine = (index, field, value) => {
        setFormData(prev => {
            const updatedLines = [...prev.payment_lines];
            updatedLines[index] = {
                ...updatedLines[index],
                [field]: value
            };

            // Auto-generate title for certain payment types
            if (field === 'type' || field === 'month' || field === 'year') {
                const typeObj = PAYMENT_TYPES.find(t => t.value === updatedLines[index].type);
                const monthObj = MONTHS.find(m => m.value === updatedLines[index].month);

                if (typeObj && monthObj && updatedLines[index].year) {
                    updatedLines[index].title = `${typeObj.label} - ${monthObj.label} ${updatedLines[index].year}`;
                } else if (typeObj && updatedLines[index].year) {
                    updatedLines[index].title = `${typeObj.label} - ${updatedLines[index].year}`;
                } else {
                    updatedLines[index].title = typeObj?.label || '';
                }
            }

            return {...prev, payment_lines: updatedLines};
        });
    };

    const removePaymentLine = (index) => {
        setFormData(prev => ({
            ...prev,
            payment_lines: prev.payment_lines.filter((_, i) => i !== index)
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrors({});

        try {
            const response = await axios.post('/api/payments/', formData);
            onSuccess(response.data);
        } catch (error) {
            if (error.response?.data) {
                setErrors(error.response.data);
            } else {
                setErrors({non_field_errors: ['An error occurred while submitting the form']});
            }
        } finally {
            setLoading(false);
        }
    };

    const calculateTotals = () => {
        const totalPaid = formData.payment_lines.reduce((sum, line) =>
            sum + (parseFloat(line.paid_amount) || 0), 0
        );
        const totalExpected = formData.payment_lines.reduce((sum, line) =>
            sum + (parseFloat(line.expected_amount) || 0), 0
        );

        return {totalPaid, totalExpected};
    };

    const {totalPaid, totalExpected} = calculateTotals();

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-auto">
                <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
                    <h2 className="text-2xl font-bold mb-6 text-gray-800">Create New Payment</h2>

                    {errors.non_field_errors && (
                        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                            {errors.non_field_errors.map((error, idx) => (
                                <p key={idx}>{error}</p>
                            ))}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Student Selection */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Student *
                                </label>
                                <select
                                    value={formData.student_id}
                                    onChange={(e) => setFormData(prev => ({...prev, student_id: e.target.value}))}
                                    className="w-full px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    required
                                    disabled={!!studentId}
                                >
                                    <option value="">Select Student</option>
                                    {students.map(student => (
                                        <option key={student.id} value={student.id}>
                                            {student.name} - {student.registration_id}
                                        </option>
                                    ))}
                                </select>
                                {errors.student_id && (
                                    <p className="mt-1 text-sm text-red-600">{errors.student_id}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Payment Method *
                                </label>
                                <select
                                    value={formData.payment_method}
                                    onChange={(e) => setFormData(prev => ({...prev, payment_method: e.target.value}))}
                                    className="w-full px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    required
                                >
                                    {PAYMENT_METHODS.map(method => (
                                        <option key={method.value} value={method.value}>
                                            {method.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Notes */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Notes
                            </label>
                            <textarea
                                value={formData.notes}
                                onChange={(e) => setFormData(prev => ({...prev, notes: e.target.value}))}
                                rows={1}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Additional notes or comments..."
                            />
                            {errors.notes && (
                                <p className="mt-1 text-sm text-red-600">{errors.notes}</p>
                            )}
                        </div>

                        {/* Payment Lines - SCROLLABLE SECTION */}

                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold text-gray-800">
                                Payment Items ({formData.payment_lines.length})
                            </h3>
                            <button
                                type="button"
                                onClick={addPaymentLine}
                                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors"
                            >
                                + Add Item
                            </button>
                        </div>

                        {/* Scrollable Container */}
                        <div
                            ref={scrollContainerRef}
                            className="max-h-80 overflow-y-auto scrollbar-thin scrollbar-thumb-blue-300 scrollbar-track-gray-100 hover:scrollbar-thumb-blue-400"
                        >
                            {formData.payment_lines.length === 0 ? (
                                <div className="text-center py-6 text-gray-500">
                                    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24"
                                         stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1}
                                              d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                                    </svg>
                                    <p className="mt-2">No payment items added yet.</p>
                                    <p className="text-sm">Click "Add Item" to start adding payment lines.</p>
                                </div>
                            ) : (
                                <div className="space-y-2">
                                    {formData.payment_lines.map((line, index) => (
                                        <div
                                            key={index}
                                            className="border border-gray-300 rounded-lg p-2 bg-white shadow-sm hover:shadow-md transition-shadow"
                                        >
                                            <div className="flex justify-between items-start mb-3">
                                                <h4 className="font-medium text-gray-700 flex items-center">
                                                <span
                                                    className="inline-flex items-center justify-center w-6 h-6 bg-blue-100 text-blue-800 rounded-full text-sm mr-2">
                                                    {index + 1}
                                                </span>
                                                    Payment Line #{index + 1}
                                                </h4>
                                                <button
                                                    type="button"
                                                    onClick={() => removePaymentLine(index)}
                                                    className="text-red-500 hover:text-red-700 hover:bg-red-50 p-1 rounded transition-colors"
                                                    title="Remove this payment line"
                                                >
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor"
                                                         viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round"
                                                              strokeWidth={2}
                                                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                                                    </svg>
                                                </button>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                                                {/* Payment Type */}
                                                <div>
                                                    <label className="block text-xs font-medium text-gray-600 mb-1">
                                                        Type *
                                                    </label>
                                                    <select
                                                        value={line.type}
                                                        onChange={(e) => updatePaymentLine(index, 'type', e.target.value)}
                                                        className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                                        required
                                                    >
                                                        {PAYMENT_TYPES.map(type => (
                                                            <option key={type.value} value={type.value}>
                                                                {type.label}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>

                                                {/* Month */}
                                                <div>
                                                    <label className="block text-xs font-medium text-gray-600 mb-1">
                                                        Month
                                                    </label>
                                                    <select
                                                        value={line.month || ''}
                                                        onChange={(e) => updatePaymentLine(index, 'month', parseInt(e.target.value))}
                                                        className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                                    >
                                                        <option value="">Select Month</option>
                                                        {MONTHS.map(month => (
                                                            <option key={month.value} value={month.value}>
                                                                {month.label}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>

                                                {/* Year */}
                                                <div>
                                                    <label className="block text-xs font-medium text-gray-600 mb-1">
                                                        Year *
                                                    </label>
                                                    <select
                                                        value={line.year}
                                                        onChange={(e) => updatePaymentLine(index, 'year', parseInt(e.target.value))}
                                                        className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                                        required
                                                    >
                                                        {YEARS.map(year => (
                                                            <option key={year} value={year}>
                                                                {year}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>

                                                {/* Title */}
                                                <div className="md:col-span-2 lg:col-span-2">
                                                    <label className="block text-xs font-medium text-gray-600 mb-1">
                                                        Description
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={line.title}
                                                        onChange={(e) => updatePaymentLine(index, 'title', e.target.value)}
                                                        className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                                        placeholder="Auto-generated description"
                                                    />
                                                </div>

                                                {/* Expected Amount */}
                                                <div>
                                                    <label className="block text-xs font-medium text-gray-600 mb-1">
                                                        Ex. Amount *
                                                    </label>
                                                    <div className="relative">
                                                            <span
                                                                className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">$</span>
                                                        <input
                                                            type="number"
                                                            step="0.01"
                                                            min="0"
                                                            value={line.expected_amount}
                                                            onChange={(e) => updatePaymentLine(index, 'expected_amount', parseFloat(e.target.value))}
                                                            className="w-full pl-6 pr-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                                            required
                                                        />
                                                    </div>
                                                </div>

                                                {/* Paid Amount */}
                                                <div>
                                                    <label className="block text-xs font-medium text-gray-600 mb-1">
                                                        Paid Amount *
                                                    </label>
                                                    <div className="relative">
                                                            <span
                                                                className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">$</span>
                                                        <input
                                                            type="number"
                                                            step="0.01"
                                                            min="0"
                                                            value={line.paid_amount}
                                                            onChange={(e) => updatePaymentLine(index, 'paid_amount', parseFloat(e.target.value))}
                                                            className="w-full pl-6 pr-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Line Status */}
                                            {line.expected_amount > 0 && (
                                                <div className="mt-3 pt-3 border-t border-gray-100">
                                                    <div className="flex justify-between items-center text-xs">
                                                    <span className={`px-2 py-1 rounded ${
                                                        line.paid_amount >= line.expected_amount
                                                            ? 'bg-green-100 text-green-800'
                                                            : line.paid_amount > 0
                                                                ? 'bg-yellow-100 text-yellow-800'
                                                                : 'bg-red-100 text-red-800'
                                                    }`}>
                                                        {line.paid_amount >= line.expected_amount
                                                            ? 'FULLY PAID'
                                                            : line.paid_amount > 0
                                                                ? 'PARTIAL'
                                                                : 'PENDING'
                                                        }
                                                    </span>
                                                        <span className="text-gray-600">
                                                        Remaining: ${(line.expected_amount - line.paid_amount).toFixed(2)}
                                                    </span>
                                                    </div>
                                                </div>
                                            )}

                                            {line.paid_amount > line.expected_amount && (
                                                <p className="mt-2 text-xs text-red-600 flex items-center">
                                                    <svg className="w-4 h-4 mr-1" fill="currentColor"
                                                         viewBox="0 0 20 20">
                                                        <path fillRule="evenodd"
                                                              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                                              clipRule="evenodd"/>
                                                    </svg>
                                                    Paid amount cannot exceed expected amount
                                                </p>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Totals Summary - Always visible below scrollable area */}
                        {/*{formData.payment_lines.length > 0 && (
                            <div
                                className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                    <div className="text-center">
                                        <span className="font-medium text-gray-600">Total Expected:</span>
                                        <div className="text-lg font-bold text-blue-700">
                                            ${totalExpected.toFixed(2)}
                                        </div>
                                    </div>
                                    <div className="text-center">
                                        <span className="font-medium text-gray-600">Total Paid:</span>
                                        <div className="text-lg font-bold text-green-700">
                                            ${totalPaid.toFixed(2)}
                                        </div>
                                    </div>
                                    <div className="text-center">
                                        <span className="font-medium text-gray-600">Balance:</span>
                                        <div className={`text-lg font-bold ${
                                            totalPaid >= totalExpected ? 'text-green-700' : 'text-red-700'
                                        }`}>
                                            ${(totalExpected - totalPaid).toFixed(2)}
                                        </div>
                                    </div>
                                    <div className="text-center">
                                        <span className="font-medium text-gray-600">Status:</span>
                                        <div className={`text-lg font-bold ${
                                            totalPaid >= totalExpected ? 'text-green-700' :
                                                totalPaid > 0 ? 'text-yellow-700' : 'text-red-700'
                                        }`}>
                                            {totalPaid >= totalExpected ? 'FULLY PAID' :
                                                totalPaid > 0 ? 'PARTIAL' : 'PENDING'}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        */}

                        {/* Form Actions */}
                        <div className="flex justify-end space-x-3">
                            <button
                                type="button"
                                onClick={onCancel}
                                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={loading || formData.payment_lines.length === 0}
                                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                {loading ? (
                                    <span className="flex items-center">
                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none"
                                     viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                            strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor"
                                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Creating...
                            </span>
                                ) : (
                                    'Create Payment'
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddPayment;