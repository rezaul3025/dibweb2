import React, {Fragment} from "react";
import BankDetailsPopUp from "./BankDetailsPopUp";

export default function Payment(props) {
    return (
        <Fragment>
            <div className="container-fluid feature pb-5 py-5">
                <div id="donation" className="container pb-5">
                    <div className="text-center mx-auto pb-5 wow fadeInUp" data-wow-delay="0.2s"
                         style={{maxWidth: '800px'}}>
                        <h4 className="text-primary">{props.paymentType} Payment</h4>
                        <p className="mb-0">{props.message}</p>
                    </div>
                    <div className="rounded h-100 wow fadeInUp" data-wow-delay="0.2s">
                        <div className="row g-4 p-2">
                            <div className="row g-4">
                                <div className="col-md-6 col-lg-6 col-xl-4"></div>
                                <div className="col-md-6 col-lg-6 col-xl-4 wow fadeInUp" data-wow-delay="0.2s">
                                    <div className="feature-item p-4">
                                        <div className="feature-icon p-2 mb-4">
                                            <h2 className="text-primary"><i
                                                className="fas fa-solid fa-euro-sign"></i> {props.amount}
                                            </h2>
                                        </div>
                                        <h4></h4>
                                        <p className="mb-4">
                                        </p>
                                        <button className="btn btn-primary p-2"> <i className="fa-brands fa-paypal"> </i> PayPal
                                        </button>
                                        &nbsp;&nbsp;
                                        <button className="btn btn-primary p-2" data-bs-toggle="modal" data-bs-target="#staticBackdrop" ><i
                                            className="fas fa-thin fa-money-bill-transfer"> </i> Bank Transfer
                                        </button>
                                    </div>
                                </div>
                                <div className="col-md-6 col-lg-6 col-xl-4"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <BankDetailsPopUp />
        </Fragment>
    );
};