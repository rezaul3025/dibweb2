import React, {Fragment, useState} from "react"
import PayPalDonateButton from "./PayPalDonateButton";
import PayPalQrCode from "./PayPalQrCode";
import BankDetails from "./BankDetails";

export default function PayPalAndBankDetails(){
    return(
        <Fragment>
            <div className="row g-4 justify-content-center">
                <PayPalDonateButton/>
                <PayPalQrCode/>
                <BankDetails/>
            </div>
        </Fragment>
    )
}