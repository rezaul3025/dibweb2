import React from "react";

export default function PayPalQrCode() {
    return (
        <div className="p-4 bg-light">
            <div className="col-md-12 col-lg-12 col-xl-12">
                <div className="text-center bg-light">
                    <p> Scan QR-Code to pay via PayPal</p>
                    <img className="text-center" src="/static/assets/img/paypal/pay-qr.jpg"
                         alt="PayPal Pay QR code" width="230" height="230"/>
                </div>
            </div>
        </div>
    )
}