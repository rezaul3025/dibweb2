import React,{Fragment} from "react";
import ContactBreadcrumb from "./ContactBreadcrumb";
import ContactAddress from "./ContactAddress";
import ContactForm from "./ContactForm";
import ContactMap from "./ContactMap";
import Navbar from "../nav/Navbar";

export default function ContactUs(){
    return(
        <Fragment>
            <Navbar />
            <ContactBreadcrumb />
            <div className="container-fluid contact py-5">
                <div className="container py-5">
                    <div className="row g-5">
                        <div className="col-xl-6">
                            <div className="wow fadeInUp" data-wow-delay="0.2s">
                                <div className="bg-light rounded p-5 mb-5">
                                    <ContactAddress />
                                </div>
                                <div className="bg-light p-5 rounded h-100 wow fadeInUp" data-wow-delay="0.2s">
                                    <ContactForm />
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-6 wow fadeInRight" data-wow-delay="0.2s">
                            <ContactMap />
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};