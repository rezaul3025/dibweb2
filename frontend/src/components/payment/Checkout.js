import React, { useState } from 'react';
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";

const Checkout = (props) => {
    const [{ options, isPending }, dispatch] = usePayPalScriptReducer();
    const [message, setMessage] = useState(null)

    const onCreateOrder = (data,actions) => {
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

    const onApproveOrder = (data,actions) => {
        return actions.order.capture().then((details) => {
            const name = details.payer.name.given_name;
            //alert(`Transaction completed by ${name}`);
            fetch('/api/v1/attendees/' + props.attendee_id+ '/'+data.orderID+"/"+props.event_id+'/')
            .then(response => response.json())
            .then(data =>
                {
                    setMessage('Thanks, your payment successfully, you will get a email about your ticket, order Id: '+data.orderID);
                });
        });
    }

    const onCancelOrder = (data,actions) => {
        console.log(data);
        console.log(actions);
        alert('cancel');
    }

    return (
        <div className="checkout">
            {message && <h2 className='text-primary'>{message}</h2>}
            {isPending ? <p>LOADING...</p> : (
                <>
                    <PayPalButtons
                        style={{ layout: "vertical" }}
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