import React, {Fragment, useState} from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

export default function PaypalDetailsPopUp(props) {

    const initialOptions = {
    clientId: "test",
    currency: "EUR",
    intent: "capture",
    };

    return (
        <Fragment>
            <div className="modal fade" id="paypalDetailsPopUp" data-bs-backdrop="static" data-bs-keyboard="false"
                 tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="staticBackdropLabel">Pay with PayPal</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <div className="col-md-6 col-lg-6 col-xl-8 align-self-center">
                                    <PayPalScriptProvider  options={initialOptions}>
                                        <PayPalButtons amount={props.amount} style={{ layout: "horizontal" }} />
                                    </PayPalScriptProvider>
                                </div>
                                <div className="col-md-6 col-lg-6 col-xl-4">
                                    <img width={140} height={140} src={'/static/assets/images/bank_transfer_qrc.png'}
                                         alt="Bank transfer QR code"/>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-outline-primary" data-bs-dismiss="modal"><i
                                className="fa-sharp fa-solid fa-xmark"></i> Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
};