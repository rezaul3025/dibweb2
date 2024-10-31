import React, {Fragment, useRef, useState} from "react";
import ReCAPTCHA from "react-google-recaptcha";

export default function ContactForm(props){
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState(null);
    const [infoMessage, setInfoMessage] = useState(null);
    const [errors, setErrors] = useState({});
    const [submitting, setSubmitting] = useState(false)
    const recaptcha = useRef()

     const handleSubmit = async (e) => {
        e.preventDefault();
        const token = await recaptcha.current.executeAsync();
        setSubmitting(true);
        if(!token){
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
            await res.json();
            if (res.status === 201) {
                setName("");
                setEmail("");
                setPhone("")
                setInfoMessage("Thanks for your message, we will get back as soon as possible.");
                recaptcha.current.reset();
                setSubmitting(false)

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

    const onChangeHandler = (e) =>{
        const name = e.target.name;
        const value = e.target.value;
        console.log(e.target.value)
        if(name ==='message'){
            if(!value){
                 setErrors({'message_error':'Message is required filed'})
            }
            if(/[ `!@#$%^&*()_+\-=\[\]{};':"\\|<>\/?~]/.test(value)){
                setErrors({'message_error':'Special character not allowed'})
            }
            console.log(value)
        }
    }

    return(
        <Fragment>
            <h4 className="text-primary">{props.title}</h4>
            <p className="mb-4">{props.subtitle}</p>
            <form onSubmit={handleSubmit}>
                <div className="row g-4">
                    <div className="col-lg-12 col-xl-6">
                        <div className="form-floating">
                            <input type="text" className="form-control border-0" id="name" name="name" value={name} onChange={(e)=>setName(e.target.value)}
                                   placeholder="Your Name"/>
                            <label htmlFor="name">Your Name</label>
                        </div>
                    </div>
                    <div className="col-lg-12 col-xl-6">
                        <div className="form-floating">
                            <input type="email" className="form-control border-0" id="email" name="email" value={email} onChange={(e)=>setEmail(e.target.value)}
                                   placeholder="Your Email"/>
                            <label htmlFor="email">Your Email</label>
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="form-floating">
                            <input type="phone" className="form-control border-0" id="phone" name="phone" value={phone} onChange={(e)=>setPhone(e.target.value)}
                                   placeholder="Phone"/>
                            <label htmlFor="phone">Your Phone</label>
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="form-floating">
                            <input type="text" className="form-control border-0" id="subject" name="subject" value={subject} onChange={(e)=> setSubject(e.target.value)}
                                   placeholder="Subject"/>
                            <label htmlFor="subject">Subject</label>
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="form-floating">
                                                    <textarea className="form-control border-0" name="message" value={message} onChange={(e)=>onChangeHandler}
                                                              placeholder="Leave a message here" id="message"
                                                              style={{height: '160px'}}></textarea>
                            <label htmlFor="message">Message</label>
                            {errors.message_error && <div className="text-warning">{errors.message_error}</div>}
                        </div>
                    </div>
                    <div className="col-12">
                        <ReCAPTCHA
                            ref={recaptcha}
                            size="invisible"
                            sitekey={process.env.REACT_APP_G_ReCAPTCHA_S_KEY} />
                    </div>
                    <div className="col-12">
                        {infoMessage}
                        <button className="btn btn-primary w-100 py-3" type="submit">Send Message</button>
                    </div>
                </div>
            </form>
        </Fragment>
    );
};