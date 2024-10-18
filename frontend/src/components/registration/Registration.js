import React, {Fragment} from "react";
import RegistrationForm from "./RegistrationForm";

export default function Registration(){
    return(
        <Fragment>
            <div className="container-fluid offer-section pb-5 py-5">
                <div className="container pb-5">
                    <div className="row g-4">
                        <div className="bg-light p-5 rounded h-100 wow fadeInUp" data-wow-delay="0.2s">
                             <RegistrationForm title="Registration" subtitle="Register for event of Sheikh Ahmadullah's Europe tour hosted by 'Darul Ihsan Berlin e.V'"/>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
)
}