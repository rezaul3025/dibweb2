import React from "react";
import {QRCode} from 'react-qr-code';
import {
    BuildingLibraryIcon,
    DevicePhoneMobileIcon,
    EnvelopeIcon,
    MapPinIcon,
    QrCodeIcon
} from '@heroicons/react/24/outline';

const FooterV2 = () => {
    return (
        <footer className="bg-gray-900 text-gray-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">

                    {/* Company Info */}
                    <div className="col-span-1 md:col-span-2 lg:col-span-1">
                        <h3 className="text-white text-xl font-bold mb-4">Financial Solutions</h3>
                        <p className="mb-4">Providing trusted banking services since 1985.</p>
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-400 hover:text-white">
                                <span className="sr-only">Facebook</span>
                                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path fillRule="evenodd"
                                          d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                                          clipRule="evenodd"/>
                                </svg>
                            </a>
                            {/* Add other social icons */}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-white text-sm font-semibold uppercase tracking-wider mb-4">Quick Links</h4>
                        <ul className="space-y-2">
                            <li><a href="#" className="hover:text-white">Online Banking</a></li>
                            <li><a href="#" className="hover:text-white">Loan Calculator</a></li>
                            <li><a href="#" className="hover:text-white">Rates</a></li>
                            <li><a href="#" className="hover:text-white">Contact Us</a></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-white text-sm font-semibold uppercase tracking-wider mb-4">Contact</h4>
                        <ul className="space-y-3">
                            <li className="flex items-start">
                                <MapPinIcon className="h-5 w-5 mr-3 flex-shrink-0"/>
                                <span>123 Finance Street, Banking District</span>
                            </li>
                            <li className="flex items-center">
                                <DevicePhoneMobileIcon className="h-5 w-5 mr-3 flex-shrink-0"/>
                                <span>+1 (555) 123-4567</span>
                            </li>
                            <li className="flex items-center">
                                <EnvelopeIcon className="h-5 w-5 mr-3 flex-shrink-0"/>
                                <span>support@financial.com</span>
                            </li>
                        </ul>
                    </div>

                    {/* Bank Details Card with QR */}
                    <div className="bg-gray-800 p-5 rounded-lg border border-gray-700">
                        <div className="flex items-center mb-3">
                            <BuildingLibraryIcon className="h-6 w-6 text-blue-400 mr-2"/>
                            <h4 className="text-white font-medium">Bank Transfer Details</h4>
                        </div>

                        <div className="space-y-3 text-sm">
                            <div>
                                <p className="text-gray-400">Account Name</p>
                                <p className="text-white">Financial Solutions Inc.</p>
                            </div>

                            <div>
                                <p className="text-gray-400">Account Number</p>
                                <p className="text-white">1234 5678 9012 3456</p>
                            </div>

                            <div>
                                <p className="text-gray-400">SWIFT/BIC</p>
                                <p className="text-white">FNCLUS33</p>
                            </div>

                            <div className="flex items-center justify-between pt-3 border-t border-gray-700">
                                <div className="bg-white p-1 rounded">
                                    <div className="w-20 h-20 bg-gray-200 flex items-center justify-center">
                                        <QrCodeIcon className="h-8 w-8 text-gray-600"/>
                                        <QRCode
                                            value="Bank:Financial Solutions|Acc:123456789012|SWIFT:FNCLUS33"
                                            size={80}
                                            bgColor="transparent"
                                            fgColor="#111827"
                                        />
                                    </div>
                                </div>
                                <button className="text-xs bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded">
                                    Download QR
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div className="mt-12 pt-8 border-t border-gray-800 text-center text-sm text-gray-400">
                    <p>© {new Date().getFullYear()} Financial Solutions. All rights reserved.</p>
                    <div className="mt-2 flex justify-center space-x-6">
                        <a href="#" className="hover:text-white">Privacy Policy</a>
                        <a href="#" className="hover:text-white">Terms of Service</a>
                        <a href="#" className="hover:text-white">Security</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default FooterV2;