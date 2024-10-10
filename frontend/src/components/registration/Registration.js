import React, {Fragment} from "react";
import ContactForm from "../contact/ContactForm";

export default function Registration(){
    return(
        <Fragment>
            <div className="container-fluid offer-section pb-5 py-5">
                <div className="container pb-5">
                    <div className="row g-4">
                        <div className="bg-light p-5 rounded h-100 wow fadeInUp" data-wow-delay="0.2s">
                             <ContactForm title="Registration" subtitle="Plesse register for the event"/>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
)
}