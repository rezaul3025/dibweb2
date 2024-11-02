import React, {Fragment, useState} from "react";

export default function Donation() {
    const [amount, setAmount] = useState(0.0);
    const [error, setError] = useState('')
    const donationInfo = {
        amount: amount,
        type: 'Donation'
    };
    const onChangeHandler = event => {
        const moneyRegx = "/^(\\d+|\\d{1,3}(\\.\\d{3})*)(,\\d+)?$/"
        const value = event.target.value;
        setAmount(value);
        if (/^(?!0\.00)\d{1,4}(,\d{3})*(\.\d\d)?$/.test(value)) {
            setError('')
        } else {
            setError('Only number allowed, maximum 4 digits before decimal')
        }
    };

    return (
        <Fragment>
            <div className="container-fluid feature pb-5 py-5">
                <div id="donation" className="container pb-5">
                    <div className="text-center mx-auto pb-5 wow fadeInUp" data-wow-delay="0.2s"
                         style={{maxWidth: '800px'}}>
                        <h4 className="text-primary">Donation</h4>
                        <h1 className="display-5 mb-4">“Whoever builds a mosque for Allah, Allah will build for him a
                            house like it in
                            Paradise.”</h1>
                        <p className="mb-0">Source: Ṣaḥīḥ al-Bukhārī 450, Ṣaḥīḥ Muslim 533.</p>
                    </div>
                    <div className="p-5 rounded h-100 wow fadeInUp" data-wow-delay="0.2s">
                        <div className="row g-4 justify-content-center">
                            <div className="col-md-12 col-lg-12 col-xl-8">
                                <form action="https://www.paypal.com/donate" method="post" target="_top">
                                    <input type="hidden" name="hosted_button_id" value="5PZFDLV6A5Q46"/>
                                    <button type="submit" className="btn btn-primary w-100 btn-lg">
                                        <i className="fa-solid fa-brands fa-paypal"></i> Donate with PayPal
                                    </button>
                                </form>
                            </div>
                            <div className="col-md-12 col-lg-12 col-xl-8">
                                <div className="text-center pb-4">
                                    <h3 className="text-primary">OR</h3>
                                    <p> Scan QR-Code to donate</p>
                                    <img className="align-content-center" src="/static/assets/img/paypal/pay-qr.jpg"
                                         alt="PayPal Pay QR code" width="300" height="300"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};