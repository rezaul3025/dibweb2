import React from "react";

/**
 * Printable Payment Invoice (Green / Light-Green theme)
 * - TailwindCSS styling
 * - Clean A4-friendly layout
 * - Print button (hidden when printing)
 * - Reusable via props; sensible defaults for quick drop-in
 */

const currency = (n) =>
  new Intl.NumberFormat(undefined, { style: "currency", currency: "EUR" }).format(
    Number(n || 0)
  );

export default function PaymentInvoice({
  brand = {
    name: "Greenfield Academy",
    address: "42 Learning Ave, Berlin",
    email: "accounts@greenfield.ac",
    phone: "+49 30 1234567",
  },
  student = {
    name: "Aisha Rahman",
    address: "123 Main St, Berlin",
    email: "aisha@example.com",
    phone: "+49 176 1111111",
  },
  meta = {
    invoiceNo: "INV-2025-0012",
    issueDate: "2025-11-06",
    dueDate: "2025-11-20",
    reference: "Monthly Tuition"
  },
  items = [
    { id: 1, description: "Tuition (November)", qty: 1, unitPrice: 150 },
    { id: 2, description: "Lab Fee", qty: 1, unitPrice: 20 },
  ],
  payments = [
    // Optional: list recent payments applied to this invoice
    { id: 1, date: "2025-11-05", method: "Cash", amount: 50 },
  ],
  notes = "Thank you for your prompt payment.",
  taxRate = 0.0, // e.g. 0.19 for 19%
}) {
  const subTotal = items.reduce((s, it) => s + Number(it.qty || 0) * Number(it.unitPrice || 0), 0);
  const tax = subTotal * (taxRate || 0);
  const paymentsTotal = payments.reduce((s, p) => s + Number(p.amount || 0), 0);
  const grandTotal = subTotal + tax;
  const balanceDue = Math.max(0, grandTotal - paymentsTotal);

  return (
    <div className="min-h-screen w-full bg-green-50/70 print:bg-white">
      {/* Print styles to control page */}
      <style>{`
        @page { size: A4; margin: 16mm; }
        @media print {
          html, body { background: white !important; }
        }
      `}</style>

      <div className="mx-auto max-w-3xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Toolbar (hidden in print) */}
        <div className="mb-4 flex items-center justify-between print:hidden">
          <h1 className="text-xl font-semibold text-emerald-700">Payment Invoice</h1>
          <div className="flex gap-2">
            <button
              onClick={() => window.print()}
              className="rounded-2xl border border-emerald-300 bg-emerald-600 px-4 py-2 text-white shadow-sm transition hover:bg-emerald-700"
            >
              Print
            </button>
          </div>
        </div>

        {/* Invoice Card */}
        <div className="rounded-2xl border border-green-200 bg-white shadow-sm print:shadow-none">
          {/* Header */}
          <div className="flex flex-col gap-4 border-b border-green-200 p-6 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <div className="inline-flex items-center gap-2">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600 text-white font-bold shadow">G</span>
                <div>
                  <p className="text-lg font-semibold text-emerald-800">{brand.name}</p>
                  <p className="text-sm text-emerald-700/80">{brand.address}</p>
                  <p className="text-sm text-emerald-700/80">{brand.email} • {brand.phone}</p>
                </div>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm uppercase tracking-wide text-emerald-700/70">Invoice</p>
              <p className="text-xl font-bold text-emerald-800">{meta.invoiceNo}</p>
              <div className="mt-2 text-sm text-emerald-700/80">
                <p><span className="font-medium">Issue Date:</span> {meta.issueDate}</p>
                <p><span className="font-medium">Due Date:</span> {meta.dueDate}</p>
                {meta.reference && (
                  <p><span className="font-medium">Reference:</span> {meta.reference}</p>
                )}
              </div>
            </div>
          </div>

          {/* Bill To */}
          <div className="grid gap-6 p-6 sm:grid-cols-2">
            <div className="rounded-xl border border-green-200 bg-green-50 p-4">
              <p className="text-sm font-semibold text-emerald-700">Bill To</p>
              <p className="mt-1 text-lg font-medium text-emerald-900">{student.name}</p>
              <p className="text-sm text-emerald-800/80">{student.address}</p>
              <p className="text-sm text-emerald-800/80">{student.email}</p>
              <p className="text-sm text-emerald-800/80">{student.phone}</p>
            </div>
            <div className="rounded-xl border border-green-200 bg-green-50 p-4">
              <p className="text-sm font-semibold text-emerald-700">Summary</p>
              <div className="mt-2 space-y-1 text-sm text-emerald-900/90">
                <div className="flex justify-between"><span>Subtotal</span><span>{currency(subTotal)}</span></div>
                <div className="flex justify-between"><span>Tax ({Math.round((taxRate||0)*100)}%)</span><span>{currency(tax)}</span></div>
                <div className="flex justify-between"><span>Payments</span><span>- {currency(paymentsTotal)}</span></div>
                <div className="mt-2 h-px bg-green-200" />
                <div className="flex justify-between text-base font-semibold text-emerald-800"><span>Balance Due</span><span>{currency(balanceDue)}</span></div>
              </div>
            </div>
          </div>

          {/* Items */}
          <div className="px-6 pb-6">
            <table className="w-full table-auto border-collapse overflow-hidden rounded-xl">
              <thead>
                <tr className="bg-emerald-600 text-left text-sm text-white">
                  <th className="px-4 py-3">Description</th>
                  <th className="px-4 py-3 text-right">Qty</th>
                  <th className="px-4 py-3 text-right">Unit Price</th>
                  <th className="px-4 py-3 text-right">Line Total</th>
                </tr>
              </thead>
              <tbody>
                {items.map((it) => {
                  const line = Number(it.qty || 0) * Number(it.unitPrice || 0);
                  return (
                    <tr key={it.id} className="odd:bg-green-50">
                      <td className="px-4 py-3 text-emerald-900">{it.description}</td>
                      <td className="px-4 py-3 text-right text-emerald-900/90">{it.qty}</td>
                      <td className="px-4 py-3 text-right text-emerald-900/90">{currency(it.unitPrice)}</td>
                      <td className="px-4 py-3 text-right font-medium text-emerald-900">{currency(line)}</td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan={4} className="px-4 py-2 text-right text-xs text-emerald-700/70">
                    Prices shown in EUR
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>

          {/* Payments Applied (optional) */}
          {payments?.length > 0 && (
            <div className="px-6 pb-6">
              <p className="mb-2 text-sm font-semibold text-emerald-700">Payments Applied</p>
              <div className="overflow-hidden rounded-xl border border-green-200">
                <table className="w-full table-auto border-collapse text-sm">
                  <thead className="bg-green-100">
                    <tr className="text-emerald-900">
                      <th className="px-4 py-2 text-left">Date</th>
                      <th className="px-4 py-2 text-left">Method</th>
                      <th className="px-4 py-2 text-right">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {payments.map((p) => (
                      <tr key={p.id} className="odd:bg-white even:bg-green-50">
                        <td className="px-4 py-2">{p.date}</td>
                        <td className="px-4 py-2">{p.method}</td>
                        <td className="px-4 py-2 text-right">{currency(p.amount)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="flex flex-col gap-4 border-t border-green-200 p-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-emerald-800/80">{notes}</p>
            <div className="text-right">
              <p className="text-xs uppercase tracking-wide text-emerald-700/70">Authorized Signature</p>
              <div className="mt-2 h-12 w-56 rounded-xl border-b-2 border-dashed border-emerald-400" />
            </div>
          </div>
        </div>

        {/* Subtle watermark / brand (print-visible) */}
        <div className="mt-3 text-center text-xs text-emerald-700/60">
          Generated by Greenfield Billing
        </div>
      </div>
    </div>
  );
}

// --- DEMO WRAPPER (Optional): shows a live preview when this file is rendered directly ---
export function DemoInvoice() {
  return <PaymentInvoice />;
}
