import React, {Fragment, useState, useEffect} from "react";
import {Link} from "react-router-dom";
import moment from "moment"
import Spinner from "../nav/Spinner";

export default function Event(){
    const [events, setEvents] = useState(null);
    const [loading, setLoading] = useState(false)

     useEffect(() => {
         setLoading(true);
         fetch('/api/v1/events/')
            .then(response => response.json())
            .then(data => {
                setEvents(data)
                setLoading(false);
            }).catch(error => {
                setLoading(false);
         });
    }, []);

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
                        {loading && <Spinner width="6rem" height="6rem"/> }
                         { events != null && events.map((event) => (
                            <div className="col-md-12 col-lg-12 col-xl-4 wow fadeInUp d-flex align-items-stretch" key={event.id}
                                 data-wow-delay="0.2s">
                                <div className="card">
                                    <img src={'/static/assets'+event.poster_image} className="card-img-top" alt={event.poster_image}/>
                                    <div className="card-body">
                                        <h5 className="card-title">{event.title}</h5>
                                        <p className="card-text ">
                                            {event.description}
                                        </p>
                                        <h6><i className="fas fa-map-marker-alt text-primary me-2"></i>{event.address}
                                        </h6>
                                        <h6><i className="fas fa-regular fa-clock text-primary me-2"></i> {moment(event.event_datetime).format("LLL")}
                                        </h6>

                                        <a href={event.map_location} target="_blank"><i className="fa-solid fa-map-location text-primary me-2"></i> Google Map
                                        </a>
                                    </div>
                                    <div className="align-bottom p-4">
                                        <Link to={"/registration/"+event.id+"/"} className="btn btn-primary align-bottom">Buy Ticket
                                            >></Link>
                                    </div>
                                </div>
                            </div>
                         ))}
                    </div>
                </div>
            </div>
        </Fragment>
    )
}