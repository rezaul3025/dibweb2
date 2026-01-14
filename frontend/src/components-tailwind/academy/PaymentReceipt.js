import React from "react";

/**
 * PaymentReceipt.jsx
 * - Print-ready payment receipt component
 * - TailwindCSS, emerald/green theme
 * - A4-friendly layout, hides UI controls when printing
 *
 * Usage:
 * <PaymentReceipt data={yourData} onClose={() => {}} />
 */

const currency = (value, currency = "EUR", locale = "en-DE") =>
    (Number(value) || 0).toLocaleString(locale, {style: "currency", currency});

const FallbackLogo = () => (
    <div className="h-12 w-12 rounded-xl bg-emerald-600 flex items-center justify-center text-white font-bold">
        <span>₹</span>
    </div>
);

const Field = ({label, value}) => (
    <div className="flex gap-2 text-sm">
        <span className="text-emerald-800/80 font-medium min-w-24">{label}:</span>
        <span className="text-gray-900">{value || "—"}</span>
    </div>
);

const Divider = () => <div className="h-px bg-emerald-200 my-3"/>;

const ReceiptHeader = ({orgName, orgAddress, orgEmail, orgPhone, orgLogoUrl}) => (
    <header className="flex items-center gap-4">
        {orgLogoUrl ? (
            <img src={orgLogoUrl} alt="Logo" className="h-12 w-12 rounded-xl object-cover"/>
        ) : (
            <FallbackLogo/>)
        }
        <div>
            <h1 className="text-2xl font-semibold text-emerald-800 leading-tight">{orgName}</h1>
            <p className="text-xs text-emerald-700/80">
                {orgAddress}
                {orgEmail ? ` • ${orgEmail}` : ""}
                {orgPhone ? ` • ${orgPhone}` : ""}
            </p>
        </div>
    </header>
);

const Barcode = ({value = ""}) => {
    // Simple decorative barcode (not scannable). For a real barcode/QR, plug in a lib.
    const bars = (value || "000000").toString().split("").map((d, i) => ({
        w: 1 + (parseInt(d, 10) % 3),
        h: 18 + (parseInt(d, 10) % 4) * 4,
        k: i,
    }));
    return (
        <div className="flex items-end gap-[2px]" aria-hidden>
            {bars.map(b => (
                <div key={b.k} className="bg-emerald-700" style={{width: b.w, height: b.h}}/>
            ))}
        </div>
    );
};

const PaymentReceipt = ({
                            data = {
                                orgName: "GreenLeaf Academy",
                                orgAddress: "123 Main St, Berlin, DE",
                                orgEmail: "billing@greenleaf.academy",
                                orgPhone: "+49 30 123456",
                                orgLogoUrl: "",

                                receiptNo: "GLA-2025-00123",
                                date: new Date().toISOString().slice(0, 10),

                                student: {
                                    name: "Aisha Rahman",
                                    id: "STU-1024",
                                    class: "10-A",
                                    shift: "Morning",
                                    address: "Prenzlauer Allee 10, Berlin",
                                },

                                items: [
                                    {label: "Monthly Fee (November)", qty: 1, unitPrice: 120, total: 120},
                                    {label: "Lab Fee", qty: 1, unitPrice: 20, total: 20},
                                ],

                                totals: {
                                    subTotal: 140,
                                    discount: 10,
                                    paid: 130,
                                    balance: 0,
                                    currency: "EUR",
                                },

                                notes: "Thank you for your payment.",
                                cashier: "Rezaul Karim",
                            },
                            onClose,
                        }) => {
    const {
        orgName,
        orgAddress,
        orgEmail,
        orgPhone,
        orgLogoUrl,
        receiptNo,
        date,
        student,
        items,
        totals,
        notes,
        cashier
    } = data;
    const grand = (totals?.subTotal || 0) - (totals?.discount || 0);

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 transition-opacity duration-300 opacity-100">
            <div
                className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen"
                              aria-hidden="true">&#8203;</span>
                <div
                    className="inline-block align-bottom bg-emerald-50/60 rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                    <div>
                        <div className="min-h-screen w-full bg-emerald-50/60 print:bg-white p-4 sm:p-6">
                            {/* Controls (hidden when printing) */}
                            <div className="flex gap-2 justify-end mb-4 print:hidden">
                                <button
                                    onClick={() => window.print()}
                                    className="px-4 py-2 rounded-xl bg-emerald-600 text-white shadow hover:bg-emerald-700 transition"
                                >
                                    Print Receipt
                                </button>
                                {onClose && (
                                    <button
                                        onClick={onClose}
                                        className="px-4 py-2 rounded-xl bg-emerald-100 text-emerald-800 hover:bg-emerald-200 border border-emerald-300"
                                    >
                                        Close
                                    </button>
                                )}
                            </div>

                            <main
                                className="mx-auto max-w-3xl bg-white rounded-2xl shadow-sm print:shadow-none border border-emerald-100 print:border-0">
                                {/* Top banner */}
                                <div
                                    className="bg-gradient-to-r from-emerald-600 to-emerald-500 text-white rounded-t-2xl p-5">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h2 className="text-xl font-semibold tracking-wide">Payment Receipt</h2>
                                            <p className="text-emerald-50/90 text-xs">Official acknowledgement for
                                                tuition and related fees</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm">Receipt No:</p>
                                            <p className="font-mono text-base">{receiptNo}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Body */}
                                <div className="p-6">
                                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6">
                                        <ReceiptHeader
                                            orgName={orgName}
                                            orgAddress={orgAddress}
                                            orgEmail={orgEmail}
                                            orgPhone={orgPhone}
                                            orgLogoUrl={orgLogoUrl}
                                        />
                                        <div className="flex flex-col items-end">
                                            <span className="text-xs text-emerald-800/80">Date</span>
                                            <span className="font-medium text-gray-900">{date}</span>
                                            <div className="mt-2"><Barcode value={receiptNo}/></div>
                                        </div>
                                    </div>

                                    <Divider/>

                                    {/* Student block */}
                                    <section
                                        className="grid sm:grid-cols-2 gap-4 bg-emerald-50/70 rounded-xl p-4 border border-emerald-100">
                                        <Field label="Student" value={student?.name}/>
                                        <Field label="Student ID" value={student?.id}/>
                                        <Field label="Class" value={student?.class}/>
                                        <Field label="Shift" value={student?.shift}/>
                                        <div className="sm:col-span-2"><Field label="Address" value={student?.address}/>
                                        </div>
                                    </section>

                                    {/* Items */}
                                    <section className="mt-6">
                                        <div className="overflow-hidden rounded-xl border border-emerald-200">
                                            <table className="w-full text-sm">
                                                <thead className="bg-emerald-100/70 text-emerald-900">
                                                <tr>
                                                    <th className="text-left p-3">Description</th>
                                                    <th className="text-right p-3 w-20">Qty</th>
                                                    <th className="text-right p-3 w-32">Unit</th>
                                                    <th className="text-right p-3 w-32">Total</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {(items || []).map((it, idx) => (
                                                    <tr key={idx} className={idx % 2 ? "bg-emerald-50/40" : "bg-white"}>
                                                        <td className="p-3 text-gray-900">{it.label}</td>
                                                        <td className="p-3 text-right tabular-nums">{it.qty}</td>
                                                        <td className="p-3 text-right tabular-nums">{currency(it.unitPrice, totals?.currency)}</td>
                                                        <td className="p-3 text-right font-medium tabular-nums">{currency(it.total, totals?.currency)}</td>
                                                    </tr>
                                                ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </section>

                                    {/* Totals */}
                                    <section className="mt-6 grid sm:grid-cols-2 gap-4">
                                        <div
                                            className="text-xs text-emerald-800/80 bg-emerald-50/60 rounded-xl p-4 border border-emerald-100">
                                            <p className="mb-1">Notes</p>
                                            <p className="text-gray-800 text-sm whitespace-pre-wrap">{notes || ""}</p>
                                        </div>
                                        <div className="sm:ml-auto">
                                            <div className="rounded-xl border border-emerald-200 overflow-hidden">
                                                <div className="flex justify-between p-3 bg-white text-sm">
                                                    <span className="text-emerald-900">Subtotal</span>
                                                    <span
                                                        className="tabular-nums">{currency(totals?.subTotal, totals?.currency)}</span>
                                                </div>
                                                <div
                                                    className="flex justify-between p-3 bg-white text-sm border-t border-emerald-100">
                                                    <span className="text-emerald-900">Discount</span>
                                                    <span
                                                        className="tabular-nums">- {currency(totals?.discount, totals?.currency)}</span>
                                                </div>
                                                <div
                                                    className="flex justify-between p-3 bg-emerald-50/70 text-sm border-t border-emerald-100">
                                                    <span className="font-medium text-emerald-900">Grand Total</span>
                                                    <span
                                                        className="font-semibold tabular-nums">{currency(grand, totals?.currency)}</span>
                                                </div>
                                                <div
                                                    className="flex justify-between p-3 bg-emerald-100/70 text-sm border-t border-emerald-100">
                                                    <span className="text-emerald-900">Paid</span>
                                                    <span
                                                        className="font-medium tabular-nums">{currency(totals?.paid, totals?.currency)}</span>
                                                </div>
                                                <div
                                                    className="flex justify-between p-3 bg-emerald-200/60 text-sm border-t border-emerald-100">
                                                    <span className="font-medium text-emerald-900">Balance</span>
                                                    <span
                                                        className="font-semibold tabular-nums">{currency(totals?.balance, totals?.currency)}</span>
                                                </div>
                                            </div>

                                            <div className="mt-3 text-right text-xs text-emerald-800/80">
                                                <p>Cashier: <span className="text-gray-900 font-medium">{cashier}</span>
                                                </p>
                                            </div>
                                        </div>
                                    </section>

                                    <Divider/>

                                    <footer className="flex items-center justify-between text-xs text-emerald-800/80">
                                        <p>Generated by GreenLeaf Billing • This is a computer-generated receipt.</p>
                                        <p className="font-mono">{receiptNo}</p>
                                    </footer>
                                </div>
                            </main>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentReceipt;
