import React, { useRef } from 'react';

/**
 * PaymentReceiptModal
 * Props:
 * - isOpen: boolean
 * - onClose: function
 * - data: {
 *     receiptNo: string|number,
 *     date: string,            // e.g. '2025-11-07'
 *     studentName: string,
 *     amount: string|number,   // e.g. '€120.00'
 *     method?: string,         // e.g. 'Cash' | 'Card' | 'Bank Transfer'
 *     note?: string
 *   }
 */
export default function PaymentReceiptModal({ isOpen, onClose, data }) {
  const printRef = useRef(null);

  if (!isOpen) return null;

  const {
    receiptNo = '—',
    date = '—',
    studentName = '—',
    amount = '—',
    method = '—',
    note = ''
  } = data || {};

  const handlePrint = () => {
    // Print whole page; Tailwind `print:` classes ensure only the card content shows.
    window.print();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 print:hidden"
      aria-modal="true"
      role="dialog"
      aria-label="Payment receipt modal"
    >
      {/* Card */}
      <div
        ref={printRef}
        className="
          relative w-[92%] max-w-md
          rounded-2xl shadow-2xl
          bg-gradient-to-b from-green-50 to-green-100
          border border-green-200
          p-5 sm:p-6
          text-green-900
        "
      >
        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-green-600 text-white shadow">
            {/* Check icon */}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
                 viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round"
                    d="M9 12l2 2 4-4M7.5 4.21a9 9 0 1010.29 0" />
            </svg>
          </span>
          <div>
            <h2 className="text-xl font-semibold leading-tight text-green-800">Payment Receipt</h2>
            <p className="text-xs text-green-700/80">Thank you for your payment</p>
          </div>
        </div>

        {/* Receipt content (this block becomes full-page when printing) */}
        <div className="rounded-xl bg-white/70 backdrop-blur-sm border border-green-200 p-4 print:p-0 print:border-0 print:bg-white">
          <div className="grid grid-cols-1 gap-3 text-sm sm:grid-cols-2">
            <Field label="Receipt No." value={String(receiptNo)} />
            <Field label="Date" value={date} />
            <Field label="Student" value={studentName} wide />
            <Field label="Amount" value={String(amount)} />
            <Field label="Method" value={method} />
            {note ? <Field label="Note" value={note} wide /> : null}
          </div>

          <div className="mt-4 h-px w-full bg-gradient-to-r from-transparent via-green-300 to-transparent" />

          <div className="mt-4 text-[11px] text-green-700/80">
            <p><strong>Issuer:</strong> Your School Name</p>
            <p><strong>Address:</strong> 123 Green Lane, City</p>
          </div>
        </div>

        {/* Actions (hidden on print) */}
        <div className="mt-5 flex items-center justify-end gap-2 print:hidden">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center rounded-xl border border-green-300 bg-white px-3 py-2 text-sm font-medium text-green-800 hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            Close
          </button>
          <button
            type="button"
            onClick={handlePrint}
            className="inline-flex items-center rounded-xl bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            Print
          </button>
        </div>

        {/* X button (hidden on print) */}
        <button
          onClick={onClose}
          aria-label="Close"
          className="print:hidden absolute right-3 top-3 rounded-full p-1 text-green-800 hover:bg-green-200/60 focus:outline-none focus:ring-2 focus:ring-green-400"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
               viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>

      {/* Print-only layout: hide overlay & buttons */}
      {/* The modal container uses `print:hidden`. The card content above uses print-friendly classes. */}
    </div>
  );
}

/** Small helper to render a label/value row */
function Field({ label, value, wide = false }) {
  return (
    <div className={wide ? 'sm:col-span-2' : ''}>
      <div className="text-[11px] uppercase tracking-wide text-green-700/80">{label}</div>
      <div className="rounded-lg border border-green-200 bg-white px-3 py-2 text-green-900">
        {value || '—'}
      </div>
    </div>
  );
}
