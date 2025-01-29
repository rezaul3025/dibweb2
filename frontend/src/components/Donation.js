import React, {Fragment} from "react";
import PayPalAndBankDetails from "./payment/PayPalAndBankDetails";

export default function Donation() {

    return (
        <Fragment>
            <div className="container-fluid feature pb-5 py-5">
                <div id="donation" className="container pb-5">
                    <div className="text-center mx-auto pb-5 wow fadeInUp" data-wow-delay="0.2s"
                         style={{maxWidth: '800px'}}>
                        <h4 className="text-primary">Donation</h4>
                        <h4 className="display-5 mb-4">“Whoever builds a mosque for Allah, Allah will build for him a
                            house like it in
                            Paradise.”</h4>
                        <p className="mb-0">Source: Ṣaḥīḥ al-Bukhārī 450, Ṣaḥīḥ Muslim 533.</p>
                    </div>
                    <div className="p-5 rounded h-100 wow fadeInUp" data-wow-delay="0.2s">
                        <PayPalAndBankDetails />
                    </div>
                </div>
            </div>
        </Fragment>
    );
};