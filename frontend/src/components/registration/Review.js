import {Button, Col, Row} from "antd";
import React, {useContext, useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import MultiStepFormContext from "./MultiStepFormContext";
import ReCAPTCHA from "react-google-recaptcha";
import Spinner from "../nav/Spinner";


const Review = (props) => {
    const {personalDetails, numberOfAttendee, next, prev} = useContext(MultiStepFormContext);
    const [message, setMessage] = useState('')
    const [submitting, setSubmitting] = useState(false)
    const navigate = useNavigate();
    const recaptcha = useRef()

    const numberOfAdult = numberOfAttendee.family_ticket ? 2 : numberOfAttendee.numberOfAdults;
    const numberOfChild = numberOfAttendee.family_ticket ? 3 : numberOfAttendee.numberOfChild;
    const ticketPrice = numberOfAttendee.family_ticket ? 50 : numberOfAdult * 20 + numberOfChild * 10;
    const ticketInfo = numberOfAttendee.family_ticket ?
        'Family Ticket(2 Adults and 3 Children) 50 Eur'
        :numberOfAdult + ' Adult x 20 Eur + ' + numberOfChild + ' Children x 10 Eur  = ' + ticketPrice + ' Eur'

    const onSubmit = async () => {
         setSubmitting(true)
        const token = await recaptcha.current.executeAsync();

        if (!token) {
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
                    'name': personalDetails.name,
                    'email': personalDetails.email,
                    'phone': personalDetails.phone,
                    'event': props.eventId,
                    'data_privacy_st_confirm':'true',
                    'ticket_info':ticketInfo,
                    'price':ticketPrice,
                    'is_email_send':false,
                    'payment_type':'None',
                    'is_payment_confirm':false,
                    'recap_token': token,
                }),
            });
            const resJson = await res.json();
            if (res.status === 201) {
                console.log(resJson.id);
                setMessage("Registration successful");
                recaptcha.current.reset();
                setSubmitting(false);
                navigate('/payment/'+resJson.id+'/');

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
    }


    return (
        <div className={"details__wrapper"}>
            <Row>
                <Col span={24}>
                    <h4>Personal Details</h4>
                    <p>Full Name: {personalDetails.name}</p>
                    <p>Email: {personalDetails.email}</p>
                    <p>Phone: {personalDetails.phone}</p>
                    <p>Phone: {props.eventId}</p>
                </Col>
                <Col span={30}>
                <h4>Total ticket cost</h4>

                    <p>{ticketInfo}</p>

                    <div className="form__item button__items d-flex justify-content-between">
                        <ReCAPTCHA
                            ref={recaptcha}
                            size="invisible"
                            sitekey="6Ldjm20aAAAAAPf-4jJIgW2-sqOuJwZIXyRZ20zb"
                        />
                        <p className="text-primary">{message}</p>
                        <Button type={"default"} onClick={prev}>
                            Back
                        </Button>
                        <Button type={"primary"} className="btn btn-primary" onClick={onSubmit}>
                            {submitting && <Spinner width="2rem" height="2rem"/>} Payment
                        </Button>
                    </div>
                </Col>
            </Row>
        </div>
    );
};
export default Review;
