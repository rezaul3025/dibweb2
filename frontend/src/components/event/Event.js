import React, {Fragment, useState, useEffect} from "react";
import moment from "moment"
import Spinner from "../nav/Spinner";
import BankDetails from "../payment/BankDetails";

export default function Event() {
    const [events, setEvents] = useState(null);
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true);
        const eventTemp = [];
        fetch('/api/v1/events/')
            .then(response => response.json())
            .then(data => {
                setEvents(data)
                setLoading(false);
            }).catch(error => {
            setLoading(false);
        });

    }, []);

    return (
        <Fragment>
            <div className="container-fluid offer-section pb-5 py-5">
                <div className="container pb-5">
                    <div className="text-center mx-auto pb-5 wow fadeInUp" data-wow-delay="0.2s"
                         style={{maxWidth: '800px'}}>
                        <h4 className="text-primary">Event(s)</h4>
                        <p className="mb-0">All up coming event(s)</p>
                    </div>
                    <div className="row g-4">
                        {loading && <Spinner width="6rem" height="6rem"/>}
                        {events != null && events.map((event) => (
                            <div className="col-md-12 col-lg-12 col-xl-12 wow fadeInUp d-flex align-items-stretch"
                                 key={event.id}
                                 data-wow-delay="0.2s">
                                {event.enabled && <div className="card">
                                    <img src={'/static/assets' + event.poster_image} className="card-img-top"
                                         alt={event.poster_image}/>
                                    <div className="card-body">
                                        <h5 className="card-title">{event.title}</h5>
                                        <p className="card-text ">
                                            {event.description}
                                        </p>
                                        <h6><i
                                            className="fas fa-solid fa-location-crosshairs  text-primary me-2"></i>{event.place}
                                        </h6>
                                        <h6 className="pt-2"><i
                                            className="fas fa-map-marker-alt text-primary me-2"></i>{event.address}
                                        </h6>
                                        <h6 className="py-2"><i
                                            className="fas fa-regular fa-clock text-primary me-2"></i> {moment(event.event_datetime).format("LLL")}
                                        </h6>

                                        <a href={event.map_location} target="_blank"><i
                                            className="fa-solid fa-map-location text-primary me-2"></i> Signup
                                        </a>
                                        <ul className="list-group list-group-flush pt-2">
                                            <li className="list-group-item"><small>Ticket price:</small></li>
                                            <li className="list-group-item"><small>Adult </small><i
                                                className="text-primary fas fa-solid fa-euro-sign"></i><span
                                                className="text-primary">20</span></li>
                                            <li className="list-group-item"><small>Children from age 5 to 17 </small><i
                                                className="text-primary fas fa-solid fa-euro-sign"></i><span
                                                className="text-primary">10</span></li>
                                            <li className="list-group-item">
                                                <small>Reference for both bank and payal : <b>MDI_Ahmadullah Event
                                                    Ticket</b></small>
                                            </li>
                                        </ul>
                                        <BankDetails/>
                                    </div>
                                    {//event.enabled && event.attendee_limit > event.attendee_count &&
                                        //  <div className="align-bottom p-3">
                                        //      <Link to={"/registration/" + event.id + "/"}
                                        //           className="btn btn-primary align-bottom">Buy With PayPal
                                        //     >></Link>
                                        //</div>
                                    }
                                </div>}
                            </div>
                        ))}

                    </div>
                    <div className="text-center mx-auto p-4 wow fadeInUp" data-wow-delay="0.2s"
                         style={{maxWidth: '800px'}}>
                        <h6 className="mb-0">All previous event(s)</h6>
                    </div>
                    <div className="row g-4">
                        {loading && <Spinner width="6rem" height="6rem"/>}
                        {events != null && events.map((event) => (
                            <div className="col-md-12 col-lg-12 col-xl-12 wow fadeInUp d-flex align-items-stretch"
                                 key={event.id}
                                 data-wow-delay="0.2s">
                                {!event.enabled && <div className="card">
                                    <img src={'/static/assets' + event.poster_image} className="card-img-top"
                                         alt={event.poster_image}/>
                                    <div className="card-body">
                                        <h5 className="card-title">{event.title}</h5>
                                        <p className="card-text ">
                                            {event.description}
                                        </p>
                                        <h6><i
                                            className="fas fa-solid fa-location-crosshairs  text-primary me-2"></i>{event.place}
                                        </h6>
                                        <h6 className="pt-2"><i
                                            className="fas fa-map-marker-alt text-primary me-2"></i>{event.address}
                                        </h6>
                                        <h6 className="py-2"><i
                                            className="fas fa-regular fa-clock text-primary me-2"></i> {moment(event.event_datetime).format("LLL")}
                                        </h6>

                                        <a href={event.map_location} target="_blank"><i
                                            className="fa-solid fa-map-location text-primary me-2"></i> Signup
                                        </a>
                                        <ul className="list-group list-group-flush pt-2">
                                            <li className="list-group-item"><small>Ticket price:</small></li>
                                            <li className="list-group-item"><small>Adult </small><i
                                                className="text-primary fas fa-solid fa-euro-sign"></i><span
                                                className="text-primary">20</span></li>
                                            <li className="list-group-item"><small>Children from age 5 to 17 </small><i
                                                className="text-primary fas fa-solid fa-euro-sign"></i><span
                                                className="text-primary">10</span></li>
                                        </ul>
                                    </div>
                                    {//event.enabled && event.attendee_limit > event.attendee_count &&
                                        //  <div className="align-bottom p-3">
                                        //      <Link to={"/registration/" + event.id + "/"}
                                        //           className="btn btn-primary align-bottom">Buy With PayPal
                                        //     >></Link>
                                        //</div>
                                    }
                                </div>}
                            </div>
                        ))}

                    </div>
                </div>
            </div>
        </Fragment>
    )
}