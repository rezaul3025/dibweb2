import React,{Fragment} from "react";

export default function ContactAddress(){
    return(
        <Fragment>
            <h4 className="text-primary mb-4">Get in Touch</h4>
            <div className="row g-4">
                <div className="col-md-6">
                    <div className="contact-add-item">
                        <div className="contact-icon text-primary mb-4">
                            <i className="fas fa-map-marker-alt fa-2x"></i>
                        </div>
                        <div>
                            <h4>Address</h4>
                            <p className="mb-0" style={{cursor:'pointer'}} title="Click to copy address">Brunnenstraße 122, 13355 Berlin </p>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="contact-add-item">
                        <div className="contact-icon text-primary mb-4">
                            <i className="fas fa-envelope fa-2x"></i>
                        </div>
                        <div>
                            <h4>Mail Us</h4>
                            <p className="mb-0">info@daurlihsan-berlin.de</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="contact-add-item">
                        <div className="contact-icon text-primary mb-4">
                            <i className="fa fa-phone-alt fa-2x"></i>
                        </div>
                        <div>
                            <h4>Telephone</h4>
                            <p className="mb-0">+49 176 5779 1221 (9:00 - 18:00)</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="contact-add-item">
                        <div className="contact-icon text-primary mb-4">
                            <i className="fab fa-firefox-browser fa-2x"></i>
                        </div>
                        <div>
                            <h4>Web</h4>
                            <p className="mb-0">www.darulihsan-berlin.com</p>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};