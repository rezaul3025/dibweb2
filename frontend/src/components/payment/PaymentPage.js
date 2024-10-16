import React,{Fragment} from "react";
import Navbar from "../nav/Navbar";
import Payment from "./Payment";
import { useLocation } from 'react-router-dom';

export default function PaymentPage(){
    const location = useLocation();
    const type = location.state !== null?location.state.type:'';
    const amount = location.state !== null?location.state.amount:0;

    return(
        <Fragment>
            <div className="container-fluid position-relative p-0">
                <Navbar/>
                {/*<!-- Header Start -->*/}
                <div className="container-fluid bg-breadcrumb">
                    <div className="container text-center py-5" style={{maxWidth: '900px'}}>
                        <h4 className="text-white display-4 mb-4 wow fadeInDown" data-wow-delay="0.1s">Payment</h4>
                        <ol className="breadcrumb d-flex justify-content-center mb-0 wow fadeInDown"
                            data-wow-delay="0.3s">
                            <li className="breadcrumb-item"><a href="/">Home</a></li>
                            <li className="breadcrumb-item active text-primary">Payment</li>
                        </ol>
                    </div>
                    {amount} - {type}
                </div>
                {/*<!-- Header End -->*/}
            </div>
            <Payment paymentType={type} amount={amount}/>
        </Fragment>
    );
};