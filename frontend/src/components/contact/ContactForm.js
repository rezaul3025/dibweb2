import React,{Fragment} from "react";

export default function ContactForm(props){
    return(
        <Fragment>
            <h4 className="text-primary">{props.title}</h4>
            <p className="mb-4">{props.subtitle}</p>
            <form>
                <div className="row g-4">
                    <div className="col-lg-12 col-xl-6">
                        <div className="form-floating">
                            <input type="text" className="form-control border-0" id="name"
                                   placeholder="Your Name"/>
                            <label htmlFor="name">Your Name</label>
                        </div>
                    </div>
                    <div className="col-lg-12 col-xl-6">
                        <div className="form-floating">
                            <input type="email" className="form-control border-0" id="email"
                                   placeholder="Your Email"/>
                            <label htmlFor="email">Your Email</label>
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="form-floating">
                            <input type="phone" className="form-control border-0" id="phone"
                                   placeholder="Phone"/>
                            <label htmlFor="phone">Your Phone</label>
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="form-floating">
                            <input type="text" className="form-control border-0" id="subject"
                                   placeholder="Subject"/>
                            <label htmlFor="subject">Subject</label>
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="form-floating">
                                                    <textarea className="form-control border-0"
                                                              placeholder="Leave a message here" id="message"
                                                              style={{height: '160px'}}></textarea>
                            <label htmlFor="message">Message</label>
                        </div>

                    </div>
                    <div className="col-12">
                        <button className="btn btn-primary w-100 py-3">Send Message</button>
                    </div>
                </div>
            </form>
        </Fragment>
    );
};