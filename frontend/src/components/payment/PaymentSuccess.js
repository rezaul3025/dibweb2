import React, {Fragment} from "react";
import Navbar from "../nav/Navbar";
import {useParams} from "react-router-dom";

export default function PaymentSuccess(){
     const {orderId} = useParams();
    return(
      <Fragment>
            <div className="container-fluid position-relative p-0">
                <Navbar/>
                {/*<!-- Header Start -->*/}
                <div className="container-fluid bg-breadcrumb">
                    <div className="container text-center py-5" style={{maxWidth: '900px'}}>
                        <h4 className="text-white display-4 mb-4 wow fadeInDown" data-wow-delay="0.1s">Payment Success</h4>
                        <ol className="breadcrumb d-flex justify-content-center mb-0 wow fadeInDown"
                            data-wow-delay="0.3s">
                            <li className="breadcrumb-item"><a href="/">Home</a></li>
                            <li className="breadcrumb-item active text-primary">Payment Success</li>
                        </ol>
                    </div>
                </div>
                {/*<!-- Header End -->*/}
            </div>
            <div className="container-fluid about">
                <div className="container py-4">
                    <div className="row g-5 align-items-center">
                        <div className="mx-auto wow fadeInLeft" data-wow-delay="0.2s">
                            <h4 className="text-primary">Payment Success</h4>
                            <div className="row g-4 py-5">
                                <div className="col-md-6 col-lg-12 wow fadeInUp h-25" data-wow-delay="0.2s">
                                    <h4 className="text-primary">
                                        {'Thanks, your payment successfully, you will get a email about your ticket, order Id: ' + orderId}
                                    </h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}