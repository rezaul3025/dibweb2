import React, {useState} from "react";
import {QRCode} from 'react-qr-code';
import {
    BuildingLibraryIcon,
    DocumentDuplicateIcon,
    EnvelopeIcon,
    GlobeAltIcon,
    MapPinIcon,
    PhoneIcon,
    QrCodeIcon
} from '@heroicons/react/24/outline';
import {useTranslation} from "react-i18next";
import {Link} from "react-router-dom";

const FooterV3 = () => {
    const [copiedField, setCopiedField] = useState(null);

    const bankDetails = {
        name: "Darul Ihsan Berlin e.V",
        iban: "DE52 5023 4500 0155 3400 01",
    };

    const copyToClipboard = (text, fieldName) => {
        navigator.clipboard.writeText(text);
        setCopiedField(fieldName);
        setTimeout(() => setCopiedField(null), 2000);
    };

    const openTermsAndConditionsPdf = () => {
        window.open('/static/assets/pdf/terms_and_conditions.pdf', '_blank');
    };

    const { t } = useTranslation();

    return (
        <footer className="bg-gray-900 text-gray-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

                    {/* Company Info */}
                    <div className="md:col-span-2 lg:col-span-1">
                        <div className="flex items-center mb-4">
                            {/*<img className="h-16 w-16" src={'/static/assets/images/dib-logo-new.png'} alt="Logo"/> */}
                            <div className="flex items-center space-x-2">
                                <Link to={'/'}>
                                    <img className="h-16 w-18" src={'/static/assets/images/dib-logo-new_v2.png'}
                                         alt="Logo"/>
                                </Link>
                                <h3 className="text-green-500 text-xl font-bold">{t('DIB')}</h3>
                            </div>
                        </div>
                        <p className="mb-4 text-justify break-words">{t('Footer.DescText')}</p>
                        <div className="flex space-x-4">
                            <a href="https://www.facebook.com/profile.php?id=100068090377582" target="_blank" className="text-green-500 hover:text-green-700">
                                <span className="sr-only">Facebook</span>
                                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path fillRule="evenodd"
                                          d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                                          clipRule="evenodd"/>
                                </svg>
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-white text-sm font-semibold uppercase tracking-wider mb-4">{t('Footer.QuickLinks')}</h4>
                        <ul className="space-y-2">
                            <li><Link to={'/membership/'} className="hover:text-green-500">{t('Membership.title')}</Link></li>
                            <li><Link to={'/donation-tailwind/'} className="hover:text-green-500">{t('Donation.title')}</Link></li>
                            <li><Link to={'/download/'} className="hover:text-green-500">{t('Download.title')}</Link></li>
                            <li><Link to={'/academy/'} className="hover:text-green-500">{t('Academy.nav_title')}</Link></li>
                            <li><Link to={'/vision/'} className="hover:text-green-500">{t('Vision.title')}</Link></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-white text-sm font-semibold uppercase tracking-wider mb-4">{t('Footer.ContactUs')}</h4>
                        <ul className="space-y-3">
                            <li className="flex items-start">
                                <MapPinIcon className="h-5 w-5 mr-3 mt-0.5 flex-shrink-0 text-green-500"/>
                                <span>Brunnenstraße 122, 13355 Berlin</span>
                            </li>
                            <li className="flex items-center">
                                <PhoneIcon className="h-5 w-5 mr-3 flex-shrink-0 text-green-500"/>
                                <span>+49 176 5779 1221 (9:00 - 18:00)</span>
                            </li>
                            <li className="flex items-center">
                                <EnvelopeIcon className="h-5 w-5 mr-3 flex-shrink-0 text-green-500"/>
                                <span>info@daurlihsan-berlin.de</span>
                            </li>
                        </ul>
                    </div>

                    {/* Bank Details Card with QR and Copy */}
                    <div className="bg-gray-800 p-5 rounded-lg border border-gray-700">
                        <div className="flex items-center justify-between mb-4">
                            <h4 className="text-white font-medium flex items-center">
                                <BuildingLibraryIcon className="h-5 w-5 mr-2 text-green-500"/>
                                {t('Footer.BankDetails')}
                            </h4>
                            {copiedField && (
                                <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded">
                  Copied!
                </span>
                            )}
                        </div>

                        <div className="space-y-3 text-sm">
                            {/* Account Name */}
                            <div className="group">
                                <div className="flex justify-between items-center">
                                    <p className="text-gray-400">{t('AcName')}</p>
                                    <button
                                        onClick={() => copyToClipboard(bankDetails.name, 'name')}
                                        className="text-green-500 hover:text-green-900 group-hover:opacity-100 transition"
                                    >
                                        <DocumentDuplicateIcon className="h-4 w-4"/>
                                    </button>
                                </div>
                                <p className="text-white font-mono">{bankDetails.name}</p>
                            </div>

                            {/* IBAN */}
                            <div className="group">
                                <div className="flex justify-between items-center">
                                    <p className="text-gray-400">IBAN</p>
                                    <button
                                        onClick={() => copyToClipboard(bankDetails.iban, 'iban')}
                                        className="text-green-500 hover:text-green-900 group-hover:opacity-100 transition"
                                    >
                                        <DocumentDuplicateIcon className="h-4 w-4"/>
                                    </button>
                                </div>
                                <p className="text-white font-mono">{bankDetails.iban}</p>
                            </div>

                            {/* QR Code Section */}
                            <div className="pt-3 mt-3 border-t border-gray-700 flex items-center justify-between">
                                <div className="bg-white p-1 rounded flex items-center justify-center">
                                    <div className="w-16 h-16 flex items-center justify-center">
                                        <QRCode
                                            value={JSON.stringify(bankDetails)}
                                            size={64}
                                            bgColor="white"
                                            fgColor="#111827"
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-col space-y-2">
                                    <button
                                        className="text-xs bg-green-500 hover:bg-green-700 text-white px-3 py-1 rounded flex items-center">
                                        <DocumentDuplicateIcon className="h-3 w-3 mr-1"/>
                                        {t('Footer.CopyAll')}
                                    </button>
                                    <button
                                        className="text-xs bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded flex items-center">
                                        <GlobeAltIcon className="h-3 w-3 mr-1"/>
                                        {t('download')} QR
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div
                    className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-gray-400 text-sm">© {new Date().getFullYear()} {t('DIB')} All rights
                        reserved.</p>
                    <div className="flex space-x-6 mt-4 md:mt-0">
                        <a href="#" onClick={()=>openTermsAndConditionsPdf()} className="text-gray-400 hover:text-white text-sm">Terms & Conditions</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default FooterV3;
