import React, {Fragment, useState, useEffect,useRef} from "react";
import { useParams } from 'react-router-dom';
import ReCAPTCHA from "react-google-recaptcha";

export default function RegistrationForm(props) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("");
    const [message, setMessage] = useState(null);
    const [event, setEvent] = useState(null);
    const [submitting, setSubmitting] = useState(false)
    let {eventId} = useParams();
    const recaptcha = useRef()

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = await recaptcha.current.executeAsync();
        setSubmitting(true);
        if(!token){
            setMessage("Captcha Not Resolved ");
            setSubmitting(false);
            return;
        }
        const headers = new Headers();
        headers.append("Content-Type", "application/json");
        try {
            let res = await fetch("/api/v1/attendees/", {
                method: "POST",
                headers: headers,
                body: JSON.stringify({
                    'name': name,
                    'email': email,
                    'phone': mobile,
                    'event': event.id,
                    'recap_token': token,
                }),
            });
            const resJson = await res.json();
            if (res.status === 201) {
                setName("");
                setEmail("");
                setMobile("")
                setMessage("Registration successful");
                recaptcha.current.reset();
                setSubmitting(false)

            } else {
                recaptcha.current.reset();
                setMessage("Some error occurred");
                setSubmitting(false)
            }
        } catch (err) {
            recaptcha.current.reset();
            setSubmitting(false)
            setMessage("Some error occurred");
            console.log(err);
        }
    };

    useEffect(() => {
         fetch('/api/v1/events/'+eventId+'/')
            .then(response => response.json())
            .then(data => setEvent(data));
    }, []);

    return (
        <Fragment>
            <h4 className="text-primary">{event && event.title}</h4>
            <p className="mb-4">{event && event.description}</p>
            <form onSubmit={handleSubmit}>
                <div className="row g-4">
                    <div className="col-lg-12 col-xl-6">
                        <div className="form-floating">
                            <input type="text" className="form-control border-0" id="name" value={name}
                                   onChange={(e) => setName(e.target.value)}
                                   placeholder="Your Full Name"/>
                            <label htmlFor="name">Your Name</label>
                        </div>
                    </div>
                    <div className="col-lg-12 col-xl-6">
                        <div className="form-floating">
                            <input type="email" className="form-control border-0" id="email" value={email}
                                   onChange={(e) => setEmail(e.target.value)}
                                   placeholder="Your Email"/>
                            <label htmlFor="email">Your Email</label>
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="form-floating">
                            <input type="phone" className="form-control border-0" id="phone" value={mobile}
                                   onChange={(e) => setMobile(e.target.value)}
                                   placeholder="Phone"/>
                            <label htmlFor="phone">Your Phone</label>
                        </div>
                    </div>
                    <div className="col-12">
                        <ReCAPTCHA
                            ref={recaptcha}
                            size="invisible"
                            sitekey="6Ldjm20aAAAAAPf-4jJIgW2-sqOuJwZIXyRZ20zb"
                        />
                    </div>
                    { submitting && <div className="col-12">
                        <img width={50} src={'/static/assets/images/Loading_icon2.gif'} alt="Submitting .. "/>
                    </div>}
                    <div className="col-12">
                        {message && <p className="text-primary">{message}</p>}
                        <button className="btn btn-primary w-100 py-3" type="submit">Register</button>
                    </div>
                </div>
            </form>
        </Fragment>
    )
};