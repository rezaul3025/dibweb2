import React from "react";

export default function PayPalDonateButton(){

    return (
        <div className="col-md-12 col-lg-12 col-xl-12">
            <form action="https://www.paypal.com/donate" method="post" target="_top">
                <input type="hidden" name="hosted_button_id" value="5PZFDLV6A5Q46"/>
                <button type="submit" className="btn btn-primary w-100 btn-lg">
                    <i className="fa-solid fa-brands fa-paypal"></i> PayPal
                </button>
            </form>
        </div>
    )
}