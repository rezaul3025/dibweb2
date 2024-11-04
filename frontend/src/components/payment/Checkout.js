import React, {useState} from 'react';
import {PayPalButtons, usePayPalScriptReducer} from "@paypal/react-paypal-js";
import Spinner from "../nav/Spinner";
import {useNavigate} from "react-router-dom";

const Checkout = (props) => {
    const [{options, isPending}, dispatch] = usePayPalScriptReducer();
    const [message, setMessage] = useState(null)
    const [waitingToUpdate, setWaitingToUpdate] = useState(false)
    const navigate = useNavigate();

    const onCreateOrder = (data, actions) => {
        return actions.order.create({
            purchase_units: [
                {
                    amount: {
                        value: props.amount,
                    },
                },
            ],
        });
    }

    const onApproveOrder = (data, actions) => {
        return actions.order.capture().then((details) => {
            const name = details.payer.name.given_name;
            setWaitingToUpdate(true)

            if(!props.attendee_id && !props.event_id ){
                navigate('/payment-success/'+props.attendee_id+'/'+data.orderID+'/Donation/',{ replace: true });
            }

            fetch('/api/v1/attendees/' + props.attendee_id + '/' + data.orderID + "/" + props.event_id + '/')
                .then(response => response.json())
                .then(attendeeData => {
                    setWaitingToUpdate(false)
                    navigate('/payment-success/'+props.attendee_id+'/'+data.orderID+'/Ticket/',{ replace: true });
                }).catch(error=>{
                    setMessage("Error while transaction")
                    setWaitingToUpdate(false);
            });
        });
    }

    const onCancelOrder = (data, actions) => {
        console.log(actions);
        setMessage('You have canceled the transaction');
    }

    return (
        <div className="checkout">
            {message && <h2 className='text-warning'>{message}</h2>}
            {waitingToUpdate && <span className="text-primary">Please wait .. <Spinner width="3rem" height="3rem" /> </span>}
            {isPending ? <p>LOADING...</p> : (
                <>
                    <PayPalButtons
                        style={{layout: "horizontal"}}
                        createOrder={(data, actions) => onCreateOrder(data, actions)}
                        onApprove={(data, actions) => onApproveOrder(data, actions)}
                        onCancel={(data, actions) => onCancelOrder(data, actions)}
                    />
                </>
            )}
        </div>
    );
}

export default Checkout;