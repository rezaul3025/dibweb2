import React, {Fragment} from "react";
import MultiStepForm from "./MultiStepForm";
import {useParams} from "react-router-dom";

export default function Registration(){
    let {eventId} = useParams();

    return(
        <Fragment>
            <div className="container-fluid offer-section pb-5 py-5">
                <div className="container pb-5">
                    <div className="row g-4">
                        <div className="bg-light p-5 rounded h-100 wow fadeInUp" data-wow-delay="0.2s">
                             <MultiStepForm eventId={eventId}/>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
)
}