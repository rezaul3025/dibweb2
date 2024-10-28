import React, {Fragment, useState, useEffect,useRef} from "react";
import { useParams } from 'react-router-dom';
import ReCAPTCHA from "react-google-recaptcha";
import Spinner from "../nav/Spinner";

export default function RegistrationForm(props) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("");
    const [message, setMessage] = useState(null);
    const [event, setEvent] = useState(null);
    const [errors, setErrors] = useState({});
    const [submitting, setSubmitting] = useState(false)
    let {eventId} = useParams();
    const recaptcha = useRef()

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        isFamilyTicket:false,
        numberOfAdult:0,
        numberOfChild:0
    });

    const handleChange = (e) => {
        let { name, value } = e.target;

        if(name === 'isFamilyTicket'){
            value = e.target.checked
        }
        console.log(value)
        setFormData({
            ...formData,
            [name]: value,
        });
        const newErrors = validateForm(formData);
        setErrors(newErrors);
    };

    const handleOnblur=()=>{
        const newErrors = validateForm(formData);
        setErrors(newErrors);
    }

    const validateForm = (data) => {
        const errors = {};

        if (!data.name.trim()) {
            errors.name = 'Name is required';
            return errors;
        }
        if (data.name.length > 100) {
            errors.name = 'Name is too long, must be less then 100';
            return errors;
        }

        if (!data.email.trim()) {
            errors.email = 'Email is required';
            return errors
        }
        if(!/\S+@\S+\.\S+/.test(data.email)) {
            errors.email = 'Email is invalid';
            return errors
        }

        if (!data.phone) {
            console.log(data.phone.length)
            errors.phone = 'Phone number is required';
            return errors;
        }
        if (data.phone.length < 3 || data.phone.length > 15) {
            errors.phone = 'Phone number not in valid length';
            return errors;
        }
        if(!/^\d+$/.test(data.phone.length)){
            errors.phone = 'Not a valid phone number';
            return errors;
        }

        if (!data.isFamilyTicket && data.numberOfAdult<=0) {
            errors.numberOfAdult = 'At least one adult ticket required to buy';
            return errors;
        }
        if(!data.isFamilyTicket && (data.numberOfAdult < 1 || data.numberOfAdult > 9)) {
            errors.numberOfAdult = 'Minimum 1 and maximum 8 adult ticket can be buy at a time';
            return errors
        }

        if (!data.isFamilyTicket && !data.numberOfChild) {
            errors.numberOfChild = 'Minimum 1 and maximum 6 children ticket can be buy at a time';
            return errors
        }
    };



    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = validateForm(formData);
        setErrors(newErrors);
         if (Object.keys(newErrors).length >= 0) {
             setMessage("Cannot continue due to validation errors.");
             return;
         }

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
                            <input type="text" className="form-control border-0" id="name"
                                   value={formData.name}
                                   name="name"
                                   onChange={handleChange}
                                   onBlur={handleOnblur}
                                   placeholder="Your Full Name" />
                            <label htmlFor="name">Your Name</label>
                            {errors && errors.name && (
                                <span className="error-message">
                                    {errors.name}
                                </span>
                            )}
                        </div>
                    </div>
                    <div className="col-lg-12 col-xl-6">
                        <div className="form-floating">
                            <input type="email" className="form-control border-0" id="email"
                                   name="email"
                                   value={formData.email}
                                   onChange={handleChange}
                                   onBlur={handleOnblur}
                                   placeholder="Your Email"/>
                            <label htmlFor="email">Your Email</label>
                            {errors && errors.email && (
                                <span className="error-message">
                                    {errors.email}
                                </span>
                            )}
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="form-floating">
                            <input type="text" className="form-control border-0"
                                   id="phone"
                                   name="phone"
                                   value={formData.phone}
                                   onChange={handleChange}
                                    onBlur={handleOnblur}
                                   placeholder="Phone"/>
                            <label htmlFor="phone">Your Phone</label>
                            {errors && errors.phone && (
                                <span className="error-message">
                                    {errors.phone}
                                </span>
                            )}
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="form-check">
                            <input type="checkbox" className="border-0 form-check-input"
                                   id="isFamilyTicket"
                                   name="isFamilyTicket"
                                   checked={formData.isFamilyTicket}
                                   onChange={handleChange}
                                    onBlur={handleOnblur}
                                  />
                            <label className="form-check-label" htmlFor="isFamilyTicket">Family ticket(2 adults, 3
                                Children[7-18 age])</label>
                            {errors && errors.isFamilyTicket && (
                                <span className="error-message">
                                    {errors.isFamilyTicket}
                                </span>
                            )}
                        </div>
                    </div>
                    { !formData.isFamilyTicket && <Fragment>
                        <div className="col-12 col-xl-6">
                            <div className="form-floating">
                                <input type="number" className="form-control border-0"
                                       id="numberOfAdult"
                                       name="numberOfAdult"
                                       value={formData.numberOfAdult}
                                       onChange={handleChange}
                                       onBlur={handleOnblur}
                                       min={1}
                                       max={8}
                                       placeholder="Phone"/>
                                <label htmlFor="numberOfAdult">Number of Adults </label>
                                {errors && errors.numberOfAdult && (
                                <span className="error-message">
                                    {errors.numberOfAdult}
                                </span>
                            )}
                            </div>
                        </div>
                        <div className="col-12 col-xl-6">
                            <div className="form-floating">
                                <input type="number" className="form-control border-0"
                                       id="numberOfChild"
                                       name="numberOfChild"
                                       value={formData.numberOfChild}
                                       onChange={handleChange}
                                       placeholder="Phone"
                                    min={0}
                                       max={8}
                                />
                                <label htmlFor="numberOfChild">Number of Children </label>
                            </div>
                        </div>
                    </Fragment>}
                    <div className="col-12">
                        <ReCAPTCHA
                            ref={recaptcha}
                            size="invisible"
                            sitekey="6Ldjm20aAAAAAPf-4jJIgW2-sqOuJwZIXyRZ20zb"
                        />
                    </div>


                    <div className="col-12">
                        {message && <p className="text-primary">{message}</p>}
                        <button
                            className={formData.name && formData.email && formData.phone ? 'btn btn-primary w-100 py-3' : 'disabled btn btn-primary w-100 py-3'}
                            type="submit">
                            {submitting && <Spinner width="2rem" height="2rem"/>} Register
                        </button>
                    </div>
                </div>
            </form>
        </Fragment>
    )
};