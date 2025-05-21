import React, { useState } from 'react';
import { FaPaypal, FaQrcode, FaCopy, FaCheck } from 'react-icons/fa';
import {BuildingLibraryIcon} from "@heroicons/react/24/outline";
import QuoteText from "../QuoteText";

const Donation = () => {
  const [copied, setCopied] = useState({
    name: false,
    iban: false,
  });

  const bankDetails = {
    name: "Darul Ihsan Berlin e.V",
    bank: "KT Bank AG",
    iban: "DE52 5023 4500 0155 3400 01",
  };

  const copyToClipboard = (text, field) => {
    navigator.clipboard.writeText(text);
    setCopied({ ...copied, [field]: true });
    setTimeout(() => setCopied({ ...copied, [field]: false }), 2000);
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg mb-4">
      <h2 className="text-2xl font-bold text-green-500 mb-6 text-center">Support Our Mission</h2>
      <QuoteText
                    text="Whoever builds a mosque for Allah, Allah will build for him a house like it in Paradise."
                    author="Ṣaḥīḥ al-Bukhārī 450, Ṣaḥīḥ Muslim 533"
                    size="sm"
                />
      {/* PayPal Section */}
      <div className="mb-8">
        <div className="flex items-center mb-3">
          <FaPaypal className="text-green-500 mr-2 text-xl"/>
          <h3 className="text-xl font-semibold text-gray-700">PayPal Donation</h3>
        </div>
        <form action="https://www.paypal.com/donate" method="post" target="_top">
          <input type="hidden" name="hosted_button_id" value="5PZFDLV6A5Q46"/>
          <button type="submit"
              className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-3 px-4 rounded-lg transition duration-200 flex items-center justify-center">
            <FaPaypal className="mr-2"/>
            Donate with PayPal
          </button>
        </form>
      </div>

      {/* QR Code Section */}
      <div className="mb-8">
        <div className="flex items-center mb-3">
          <FaQrcode className="text-green-500 mr-2 text-xl" />
          <h3 className="text-xl font-semibold text-gray-700">PayPal QR Code</h3>
        </div>
        <div className="bg-green-50 p-4 rounded-lg flex flex-col items-center">
          {/* Replace with your actual QR code image */}
          <div className="w-40 h-40 bg-white p-2 mb-3 flex items-center justify-center border border-gray-200">
            <span className="text-green-500 text-xs">
              <img src="/static/assets/img/paypal/pay-qr.jpg" alt="Donation QR Code" className="w-40 h-40"/>
            </span>
          </div>
          <p className="text-sm text-gray-600 text-center">Scan to donate via PayPal</p>
        </div>
      </div>

      {/* Bank Transfer Section */}
      <div>
        <h3 className="flex text-xl font-semibold text-gray-700 mb-4">
          <BuildingLibraryIcon className="h-5 w-5 mr-2 mt-1 text-green-500"/>
          Bank Transfer
        </h3>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-500 mb-1">Bank Name</p>
            <div className="p-3 bg-green-50 rounded-lg border border-green-100">
              <p className="text-gray-800">{bankDetails.bank}</p>
            </div>
          </div>

          <div>
            <p className="text-sm text-gray-500 mb-1">Account Name</p>
            <div className="flex items-center p-3 bg-green-50 rounded-lg border border-green-100">
              <p className="text-gray-800 flex-grow">{bankDetails.name}</p>
              <button
                  onClick={() => copyToClipboard(bankDetails.name, 'name')}
                  className="text-green-500 hover:text-green-600 ml-2"
                  aria-label="Copy Name"
              >
                {copied.name ? <FaCheck/> : <FaCopy/>}
              </button>
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">IBAN</p>
            <div className="flex items-center p-3 bg-green-50 rounded-lg border border-green-100">
              <p className="text-gray-800 flex-grow">{bankDetails.iban}</p>
              <button
                onClick={() => copyToClipboard(bankDetails.iban, 'iban')}
                className="text-green-500 hover:text-green-600 ml-2"
                aria-label="Copy IBAN"
              >
                {copied.iban ? <FaCheck /> : <FaCopy />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Thank You Note */}
      <div className="mt-8 p-4 bg-green-50 rounded-lg border border-green-100">
        <p className="text-green-600 text-center">
          Thank you for your support! Your contribution helps us make a difference.
        </p>
      </div>
    </div>
  );
};

export default Donation;