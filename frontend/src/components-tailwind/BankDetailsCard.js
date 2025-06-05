import React from "react";

import { useState } from 'react';
import { DocumentDuplicateIcon, QrCodeIcon } from '@heroicons/react/24/outline';
import {QRCode} from "react-qr-code";

const BankDetailsCard = () => {
  const [copied, setCopied] = useState(false);
  const bankDetails = {
    name: "Darul Ihsan Berlin e.V.",
    bank: "TK Bank AG",
    iban: "DE52502345000155340001"
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-xs">
      {/* Bank Details with Copy */}
      <div className="space-y-3">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-xs text-gray-500">Account Name</p>
            <p className="text-sm font-medium">{bankDetails.name}</p>
          </div>
          <button
            onClick={() => copyToClipboard(bankDetails.name)}
            className="text-gray-400 hover:text-gray-600"
          >
            <DocumentDuplicateIcon className="h-4 w-4" />
          </button>
        </div>

        <div className="flex justify-between items-start">
          <div>
            <p className="text-xs text-gray-500">IBAN</p>
            <p className="text-sm font-medium">{bankDetails.iban}</p>
          </div>
          <button
            onClick={() => copyToClipboard(bankDetails.iban)}
            className="text-gray-400 hover:text-gray-600"
          >
            <DocumentDuplicateIcon className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* QR Code Section */}
      <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
        <div className="flex items-center">
          <div className="bg-gray-100 p-1.5 rounded mr-3">
            <QRCode
              value={JSON.stringify(bankDetails)}
              size={64}
              bgColor="transparent"
              fgColor="#111827" // gray-900
            />
          </div>
          <p className="text-xs text-gray-600">Scan for bank details</p>
        </div>
        <button className="text-xs text-blue-600 hover:text-blue-800">
          Download QR
        </button>
      </div>

      {/* Copied Notification */}
      {copied && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-3 py-1.5 rounded">
          Copied to clipboard!
        </div>
      )}
    </div>
  );
};

export default BankDetailsCard;