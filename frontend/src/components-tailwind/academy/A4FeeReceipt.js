import React from 'react';
import { useA4Print } from '../hooks/useA4Print';

const A4FeeReceipt = () => {
  const { printRef, printA4 } = useA4Print();

  const receiptData = {
    receiptNo: 'RCPT-2024-001',
    date: new Date().toLocaleDateString(),
    studentName: 'John Doe',
    studentId: 'STU2024001',
    course: 'Computer Science',
    semester: 'Fall 2024',
    items: [
      { description: 'Tuition Fee', amount: 1200.00 },
      { description: 'Library Fee', amount: 50.00 },
      { description: 'Lab Fee', amount: 150.00 },
      { description: 'Sports Fee', amount: 100.00 }
    ],
    total: 1500.00
  };

  const customPrintStyles = `
    .receipt-header {
      text-align: center;
      margin-bottom: 30px;
      border-bottom: 3px double #333;
      padding-bottom: 20px;
    }
    .receipt-details {
      margin: 20px 0;
    }
    .detail-row {
      display: flex;
      justify-content: space-between;
      margin: 8px 0;
      padding: 5px 0;
      border-bottom: 1px solid #eee;
    }
    .items-table {
      width: 100%;
      border-collapse: collapse;
      margin: 20px 0;
    }
    .items-table th,
    .items-table td {
      border: 1px solid #ddd;
      padding: 10px;
      text-align: left;
    }
    .items-table th {
      background-color: #f8f9fa;
    }
    .total-section {
      text-align: right;
      margin-top: 20px;
      font-size: 1.2em;
      font-weight: bold;
    }
    .footer {
      margin-top: 50px;
      text-align: center;
      border-top: 1px solid #333;
      padding-top: 20px;
    }
  `;

  return (
    <div className="p-4">
      <div className="no-print mb-4 text-center">
        <button
          onClick={() => printA4(customPrintStyles)}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg shadow-md"
        >
          Print A4 Receipt
        </button>
      </div>

      <div ref={printRef}>
        <div className="receipt-header">
          <h1 style={{ fontSize: '28px', margin: '0 0 10px 0', color: '#2d3748' }}>
            UNIVERSITY OF TECHNOLOGY
          </h1>
          <h2 style={{ fontSize: '20px', margin: '0 0 20px 0', color: '#4a5568' }}>
            FEE PAYMENT RECEIPT
          </h2>
          <p style={{ margin: '5px 0', color: '#718096' }}>
            123 Education Street, Knowledge City
          </p>
          <p style={{ margin: '5px 0', color: '#718096' }}>
            Phone: (555) 123-4567 | Email: accounts@university.edu
          </p>
        </div>

        <div className="receipt-details">
          <div className="detail-row">
            <strong>Receipt Number:</strong>
            <span>{receiptData.receiptNo}</span>
          </div>
          <div className="detail-row">
            <strong>Date:</strong>
            <span>{receiptData.date}</span>
          </div>
          <div className="detail-row">
            <strong>Student Name:</strong>
            <span>{receiptData.studentName}</span>
          </div>
          <div className="detail-row">
            <strong>Student ID:</strong>
            <span>{receiptData.studentId}</span>
          </div>
          <div className="detail-row">
            <strong>Course:</strong>
            <span>{receiptData.course}</span>
          </div>
          <div className="detail-row">
            <strong>Semester:</strong>
            <span>{receiptData.semester}</span>
          </div>
        </div>

        <table className="items-table">
          <thead>
            <tr>
              <th>Description</th>
              <th style={{ textAlign: 'right', width: '30%' }}>Amount ($)</th>
            </tr>
          </thead>
          <tbody>
            {receiptData.items.map((item, index) => (
              <tr key={index}>
                <td>{item.description}</td>
                <td style={{ textAlign: 'right' }}>
                  {item.amount.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="total-section">
          <div style={{ fontSize: '1.3em', color: '#2d3748' }}>
            Total Amount: ${receiptData.total.toFixed(2)}
          </div>
        </div>

        <div className="footer">
          <p style={{ margin: '10px 0' }}>
            <strong>Payment Status:</strong> PAID
          </p>
          <p style={{ margin: '10px 0', color: '#718096' }}>
            This is a computer generated receipt. No signature required.
          </p>
          <p style={{ margin: '10px 0', color: '#718096', fontSize: '12px' }}>
            Thank you for your payment!
          </p>
        </div>
      </div>
    </div>
  );
};

export default A4FeeReceipt;