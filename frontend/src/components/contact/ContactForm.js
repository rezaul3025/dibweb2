import React, {Fragment, useRef, useState} from "react";
import ReCAPTCHA from "react-google-recaptcha";
import Spinner from "../nav/Spinner";

export default function ContactForm(props) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");
    const [infoMessage, setInfoMessage] = useState(null);
    const [errors, setErrors] = useState([]);
    const [submitting, setSubmitting] = useState(false)
    const recaptcha = useRef()

    const handleSubmit = async (e) => {
        e.preventDefault();

        setSubmitting(true);


        if(checkProperties(validateContactData())){
            setErrors(validateContactData());
            setSubmitting(false);
            setInfoMessage('');
            return;
        }

        const token = await recaptcha.current.executeAsync();

        if (!token) {
            setInfoMessage("Captcha Not Resolved ");
            setSubmitting(false);
            return;
        }

        const headers = new Headers();
        headers.append("Content-Type", "application/json");
        try {
            let res = await fetch("/api/v1/contactus/", {
                method: "POST",
                headers: headers,
                body: JSON.stringify({
                    'name': name,
                    'email': email,
                    'phone': phone,
                    'subject': subject,
                    'message': message,
                    'recap_token': token,
                }),
            });
            const resJson = await res.json();
            if (res.status === 201) {
                setName("");
                setEmail("");
                setPhone("");
                setMessage("");
                setSubject("");
                setInfoMessage("Thanks for your message, we will get back as soon as possible.");
                recaptcha.current.reset();
                setSubmitting(false)
                setErrors({});

            } else {
                recaptcha.current.reset();
                setInfoMessage("Some error occurred");
                setSubmitting(false)
            }
        } catch (err) {
            recaptcha.current.reset();
            setSubmitting(false)
            setInfoMessage("Some error occurred");
            console.log(err);
        }
    };

    function checkProperties(obj) {
        for (const key in obj) {
            if (obj[key] !== null && obj[key] !== "")
            return true;
        }
        return false;
    }

    const validateContactData = () => {

        let errorOnChange = {};

        if (phone && !/^\+49|0049|0[1-9][0-9]{1,14}$/.test(phone)) {
            errorOnChange.phone_error = 'Not a valid phone number';
        } else {
            errorOnChange.phone_error = '';
        }

        if (!subject) {
            errorOnChange.subject_error = 'Subject is required filed';
        } else if (checkForSpecialChar(subject)) {
            errorOnChange.subject_error = 'Special character not allowed';
        } else if (subject.length > 60) {
            errorOnChange.subject_error = 'Maximum 60 characters allowed';

        } else {
            errorOnChange.subject_error = '';
        }


        if (!email) {
            errorOnChange.email_error = 'Email is required filed';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            errorOnChange.email_error = 'Not a valid email';
        } else if (email.length > 45) {
            errorOnChange.email_error = 'Maximum 45 characters allowed';
        } else {
            errorOnChange.email_error = '';
        }


        if (!name) {
            errorOnChange.name_error = 'Name is required filed';
        } else if (checkForSpecialChar(name)) {
            errorOnChange.name_error = 'Special character not allowed';
        } else if (name.length > 60) {
            errorOnChange.name_error = 'Maximum 60 characters allowed';
        } else {
            errorOnChange.name_error = '';
        }


        if (!message) {
            errorOnChange.message_error = 'Message is required filed';
        } else if (checkForSpecialChar(message)) {
            errorOnChange.message_error = 'Special character not allowed';
        } else if (message.length > 800) {
            errorOnChange.message_error = 'Maximum 800 characters allowed';
        } else {
            errorOnChange.message_error = '';
        }
        return errorOnChange;
    }

    const checkForSpecialChar = (value, name) => {
        return /[`!@#$%^&*()_+\-=\[\]{};':"\\|<>\/?~]/.test(value);
    }

    return (
        <Fragment>
            <h4 className="text-primary">{props.title}</h4>
            <p className="mb-4">{props.subtitle}</p>
            <form onSubmit={handleSubmit}>
                <div className="row g-4">
                    <div className="col-lg-12 col-xl-6">
                        <div className="form-floating">
                            <input type="text" className="form-control border-0" id="name" name="name" value={name}
                                   onChange={(e)=>setName(e.target.value)}
                                   placeholder="Your Name"/>
                            <label htmlFor="name">Your Name<span className="text-danger"><sup>*</sup></span></label>
                            {errors.name_error && <div className="text-warning">{errors.name_error}</div>}
                        </div>
                    </div>
                    <div className="col-lg-12 col-xl-6">
                        <div className="form-floating">
                            <input type="email" className="form-control border-0" id="email" name="email" value={email}
                                   onChange={(e)=>setEmail(e.target.value)}
                                   placeholder="Your Email"/>
                            <label htmlFor="email">Your Email<span className="text-danger"><sup>*</sup></span></label>
                            {errors.email_error && <div className="text-warning">{errors.email_error}</div>}
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="form-floating">
                            <input type="phone" className="form-control border-0" id="phone" name="phone" value={phone}
                                   onChange={(e)=>setPhone(e.target.value)}
                                   placeholder="Phone"/>
                            <label htmlFor="phone">Your Phone</label>
                            {errors.phone_error && <div className="text-warning">{errors.phone_error}</div>}
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="form-floating">
                            <input type="text" className="form-control border-0" id="subject" name="subject"
                                   value={subject} onChange={(e)=>setSubject(e.target.value)}
                                   placeholder="Subject"/>
                            <label htmlFor="subject">Subject[Maximum 60 characters]<span className="text-danger"><sup>*</sup></span></label>
                            {errors.subject_error && <div className="text-warning">{errors.subject_error}</div>}
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="form-floating">
                            <textarea className="form-control border-0" name="message" value={message}
                                      onChange={(e)=>setMessage(e.target.value)}
                                      placeholder="Leave a message here" id="message"
                                      style={{height: '160px'}}></textarea>
                            <label htmlFor="message">Message[Maximum 800 characters]<span
                                className="text-danger"><sup>*</sup></span></label>
                            {errors.message_error && <div className="text-warning">{errors.message_error}</div>}
                        </div>
                    </div>
                    <div className="col-12">
                        <ReCAPTCHA
                            ref={recaptcha}
                            size="invisible"
                            sitekey={process.env.REACT_APP_G_ReCAPTCHA_S_KEY}/>
                    </div>
                    <div className="col-12">
                        {infoMessage}
                        <button className="btn btn-primary w-100 py-3" type="submit">{submitting && <Spinner height="2rem"
                                                                                              width="2rem"/>} Send
                            Message
                        </button>
                    </div>
                </div>
            </form>
        </Fragment>
    );
};