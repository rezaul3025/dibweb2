import {Button, Col, Row} from "antd";
import React, {useContext, useRef, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import MultiStepFormContext from "./MultiStepFormContext";
import ReCAPTCHA from "react-google-recaptcha";
import Spinner from "../nav/Spinner";
import Cookies from 'js-cookie';


const Review = (props) => {
    const {personalDetails, numberOfAttendee, next, prev} = useContext(MultiStepFormContext);
    const [message, setMessage] = useState('')
    const [submitting, setSubmitting] = useState(false)
    const navigate = useNavigate();
    const recaptcha = useRef()
    const [termCondition, setTermCondition] = useState(false)

    const numberOfAdult = numberOfAttendee.family_ticket ? 2 : numberOfAttendee.numberOfAdults;
    const numberOfChild = numberOfAttendee.family_ticket ? 3 : numberOfAttendee.numberOfChild;
    const ticketPrice = numberOfAttendee.family_ticket ? 50 : numberOfAdult * 20 + numberOfChild * 10;
    const adultTicketInfo = numberOfAdult + ' Adult x 20 Euro';
    const childTicketInfo = numberOfChild && numberOfChild !== 0?numberOfChild + ' Children x 10 Euro':'';
    const ticketInfo = numberOfAttendee.family_ticket ?
        'Family Ticket( 2 Adults and 3 Children) 50 Euro'
        :adultTicketInfo+' '+childTicketInfo+' = ' + ticketPrice + ' Euro'

    const onSubmit = async () => {
         setSubmitting(true)
        const token = await recaptcha.current.executeAsync();

        if (!token) {
            setMessage("Captcha Not Resolved ");
            setSubmitting(false);
            return;
        }

        const paymentRef = randomString();
        const headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("csrftoken",Cookies.get('csrftoken'))
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
                    'payment_type':props.saleType==='cash'?'CP':'None',
                    'is_payment_confirm':props.saleType === 'cash',
                    'payment_reference':props.saleType==='cash'?paymentRef:'None',
                    'total_attendees':numberOfAdult+numberOfChild,
                    'recap_token': token,
                }),
            });
            const resJson = await res.json();
            if (res.status === 201) {
                recaptcha.current.reset();
                setSubmitting(false);
                if(props.saleType === 'cash'){
                     navigate('/payment-success/'+paymentRef+'/Cash/',{ replace: true });
                }else {
                    navigate('/payment/' + resJson.id + '/', {replace: true});
                }

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

    function randomString() {
        let result = '';
        const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'
        for (let i = 20; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
        return result;
    }


    return (
        <div className={"details__wrapper"}>
            <Row>
                <Col span={24}>
                    <h4>Personal Details</h4>
                    <p>Full Name: {personalDetails.name}</p>
                    <p>Email: {personalDetails.email}</p>
                    <p>Phone: {personalDetails.phone}</p>
                </Col>
                <Col span={24}>
                    <h4>Total ticket cost</h4>

                    <p>{ticketInfo}</p>

                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" name="terms-condition" value={termCondition} onChange={(e)=>setTermCondition(e.target.checked)}
                               id="flexCheckDefault"/>
                        <label className="form-check-label" htmlFor="flexCheckDefault">
                            <Link to={"/terms-condition/"} target="_blank"><i className="fas fa-angle-right me-2"></i>Accept
                                Terms & Conditions</Link>
                        </label>
                        <ReCAPTCHA
                        ref={recaptcha}
                            size="invisible"
                            sitekey={process.env.REACT_APP_G_ReCAPTCHA_S_KEY}
                        />
                        <p className="text-primary pb-2">{message}</p>
                    </div>

                    <div className="form__item button__items d-flex justify-content-between">
                        <Button type={"default"} onClick={prev}>
                            Back
                        </Button>
                        {termCondition && <Button type={"primary"} className="btn btn-primary" onClick={onSubmit}>
                            {submitting && <Spinner width="2rem" height="2rem"/>} Payment
                        </Button>}
                        {!termCondition && <Button disabled='' type={"default"}> Payment</Button>}
                    </div>
                </Col>
            </Row>
        </div>
    );
};
export default Review;
