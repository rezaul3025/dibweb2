import React from "react";

/**
 * PaymentReceipt — minimal printable receipt component
 * Theme: green / light green
 *
 * Props:
 *  - schoolName: string
 *  - schoolAddress: string
 *  - receiptNo: string | number
 *  - studentName: string
 *  - date: string | Date
 *  - amount: number
 *  - currency: string (e.g., "EUR")
 *  - method: string (e.g., "Cash", "Card", "Bank Transfer")
 *  - notes?: string
 *  - receivedBy?: string
 */
export default function PaymentReceiptMin({
  schoolName = "Your School Name",
  schoolAddress = "Street, City, Country",
  receiptNo = "000001",
  studentName = "Student Name",
  date = new Date().toISOString().slice(0, 10),
  amount = 0,
  currency = "EUR",
  method = "Cash",
  notes = "",
  receivedBy = "Accounts Desk",
}) {
  const fmt = (n) =>
    new Intl.NumberFormat(undefined, {
      style: "currency",
      currency,
      currencyDisplay: "symbol",
      minimumFractionDigits: 2,
    }).format(Number(n || 0));

  const onPrint = () => window.print();

  return (
    <div className="min-h-screen bg-green-50 print:bg-white flex items-start justify-center p-4">
      {/* Toolbar (hidden on print) */}
      <div className="fixed top-3 left-1/2 -translate-x-1/2 z-10 print:hidden">
        <div className="bg-white border border-green-200 shadow/50 shadow-sm rounded-2xl px-3 py-2 flex items-center gap-2">
          <button
            onClick={onPrint}
            className="px-3 py-1.5 rounded-xl bg-green-600 text-white hover:bg-green-700 active:scale-[.99] transition"
          >
            Print Receipt
          </button>
        </div>
      </div>

      {/* A4-friendly content wrapper */}
      <div className="w-full max-w-[800px] print:max-w-none print:w-[210mm] print:min-h-[148mm]">
        <div className="bg-white border border-green-200 rounded-2xl shadow-sm print:shadow-none overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-green-600 to-green-500 text-white p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h1 className="text-2xl font-semibold tracking-tight">{schoolName}</h1>
                <p className="opacity-90 text-sm">{schoolAddress}</p>
              </div>
              <div className="text-right">
                <p className="uppercase text-xs opacity-90">Receipt No.</p>
                <p className="text-xl font-bold tabular-nums">{String(receiptNo)}</p>
              </div>
            </div>
          </div>

          {/* Body */}
          <div className="p-6 print:p-8">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              <div className="rounded-xl border border-green-200 bg-green-50 px-4 py-3">
                <p className="text-xs uppercase text-green-700/80">Student</p>
                <p className="font-medium text-green-900">{studentName}</p>
              </div>
              <div className="rounded-xl border border-green-200 bg-green-50 px-4 py-3">
                <p className="text-xs uppercase text-green-700/80">Date</p>
                <p className="font-medium text-green-900 tabular-nums">
                  {typeof date === "string" ? date : new Date(date).toISOString().slice(0, 10)}
                </p>
              </div>
              <div className="rounded-xl border border-green-200 bg-green-50 px-4 py-3">
                <p className="text-xs uppercase text-green-700/80">Amount</p>
                <p className="font-semibold text-green-900 tabular-nums">{fmt(amount)}</p>
              </div>
            </div>

            {/* Details table */}
            <div className="overflow-hidden rounded-2xl border border-green-200">
              <table className="w-full text-sm">
                <tbody>
                  <tr className="odd:bg-white even:bg-green-50/40">
                    <td className="px-4 py-3 text-green-800/90 font-medium w-40">Payment Method</td>
                    <td className="px-4 py-3 text-green-900">{method}</td>
                  </tr>
                  <tr className="odd:bg-white even:bg-green-50/40">
                    <td className="px-4 py-3 text-green-800/90 font-medium">Received By</td>
                    <td className="px-4 py-3 text-green-900">{receivedBy}</td>
                  </tr>
                  {notes ? (
                    <tr className="odd:bg-white even:bg-green-50/40">
                      <td className="px-4 py-3 text-green-800/90 font-medium align-top">Notes</td>
                      <td className="px-4 py-3 text-green-900 whitespace-pre-line">{notes}</td>
                    </tr>
                  ) : null}
                </tbody>
              </table>
            </div>

            {/* Acknowledgement */}
            <div className="mt-8 flex items-end justify-between">
              <div className="text-green-800">
                <p className="text-sm">Thank you for your payment.</p>
                <p className="text-xs opacity-80">This is a computer-generated receipt.</p>
              </div>
              <div className="text-right">
                <div className="h-10"></div>
                <p className="text-sm text-green-900 border-t border-green-300 inline-block pt-1">Authorized Signature</p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-green-100 text-green-800 text-xs px-6 py-3 flex items-center justify-between print:px-8">
            <span>Receipt generated on {new Date().toLocaleString()}</span>
            <span className="opacity-80">Keep this for your records</span>
          </div>
        </div>
      </div>

      {/* Extra print tweaks */}
      <style>{`
        @page { size: A4; margin: 12mm; }
        @media print {
          html, body { background: #ffffff !important; }
        }
      `}</style>
    </div>
  );
}

/**
 * Example usage:
 *
 * <PaymentReceipt
 *   schoolName="Springfield High School"
 *   schoolAddress="742 Evergreen Terrace, Springfield"
 *   receiptNo="2025-00042"
 *   studentName="John Doe"
 *   date="2025-11-07"
 *   amount={120}
 *   currency="EUR"
 *   method="Bank Transfer"
 *   notes="Monthly fee for November."
 *   receivedBy="Ms. Krabappel"
 * />
 */
