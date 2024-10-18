import React,{Fragment} from "react";

export default function ContactBreadcrumb(){
    return(
        <Fragment>
            <div className="container-fluid bg-breadcrumb">
                <div className="container text-center py-5" style={{maxWidth: '900px'}}>
                    <h4 className="text-white display-4 mb-4 wow fadeInDown" data-wow-delay="0.1s">Contact Us</h4>
                    <ol className="breadcrumb d-flex justify-content-center mb-0 wow fadeInDown" data-wow-delay="0.3s">
                        <li className="breadcrumb-item"><a href="/">Home</a></li>
                        <li className="breadcrumb-item active text-primary">Contact</li>
                    </ol>
                </div>
            </div>
        </Fragment>
    );
};