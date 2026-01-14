import React from 'react';
import { useA4Print } from '../hooks/useA4Print';
import moment from "moment";

const A4FeeReceipt = ({student, payment, printRef}) => {

  return (
    <div className="p-4">
      <div ref={printRef}>
        <div className="receipt-header">
          <h1 style={{ fontSize: '28px', margin: '0 0 10px 0', color: '#2d3748' }}>
            Darul Ihsan Berlin Academy
          </h1>
          <h2 style={{ fontSize: '20px', margin: '0 0 20px 0', color: '#4a5568' }}>
            FEE PAYMENT RECEIPT
          </h2>
          <p style={{ margin: '5px 0', color: '#718096' }}>
            Brunnenstraße 122, 13355 Berlin
          </p>
          <p style={{ margin: '5px 0', color: '#718096' }}>
            Phone: +49 176 5779 1221  | Web: www.darulihsan-berlin.com
          </p>
        </div>

        <div className="receipt-details">
          <div className="detail-row">
            <strong>Receipt Number: </strong>
            <span>{payment.id+'_'+ moment(payment.created_date).format('MM_YYYY')}</span>
          </div>
          <div className="detail-row">
            <strong>Date: </strong>
            <span>{moment(payment.created_date).format('DD-MM-YYYY')}</span>
          </div>
          <div className="detail-row">
            <strong>Student Name: </strong>
            <span>{student.first_name+' '+student.last_name}</span>
          </div>
          <div className="detail-row">
            <strong>Student ID: </strong>
            <span>{student.classes+'_'+student.id}</span>
          </div>
          <div className="detail-row">
            <strong>Class: </strong>
            <span>{student.classes}</span>
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
            {payment.payment_lines.map((item, index) => (
              <tr key={index}>
                <td>{item.title}</td>
                <td style={{ textAlign: 'right' }}>
                  {item.paid_amount}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="total-section">
          <div style={{ fontSize: '1.3em', color: '#2d3748' }}>
            Total Amount: {payment.total_paid_amount}
          </div>
        </div>

        <div className="footer">
          <p style={{ margin: '10px 0' }}>
            <strong>Payment Status:</strong> {payment.status_display}
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