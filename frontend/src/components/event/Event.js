import React, {Fragment} from "react";
import {Link} from "react-router-dom";

export default function Event(){
    return(
        <Fragment>
            <div className="container-fluid offer-section pb-5 py-5">
                <div className="container pb-5">
                    <div className="text-center mx-auto pb-5 wow fadeInUp" data-wow-delay="0.2s"
                         style={{maxWidth: '800px'}}>
                        <h4 className="text-primary">Event(s)</h4>
                        <p className="mb-0">All up coming event(s)</p>
                    </div>
                    <div className="row g-4">
                        <div className="col-md-6 col-lg-6 col-xl-3 wow fadeInUp d-flex align-items-stretch"
                             data-wow-delay="0.2s">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">Sheikh Ahmadullah's Europe tour</h5>
                                    <p className="card-text ">Sheikh Ahmadullah's Europe tour hosted by "Darul Ihsan Berlin e.V"
                                    <hr/>
                                        Ahmadullah, better known as Sheikh Ahmadullah (Bengali: শায়খ আহমদুল্লাহ),
                                        is a Bangladeshi Islamic figure,[1] negotiator and social activist.
                                        He founded and serves as chairman of the As Sunnah Foundation.
                                    </p>
                                </div>
                                <div className="align-bottom p-4">
                                    <Link to={"/registration/"} className="btn btn-primary align-bottom">Register >></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}