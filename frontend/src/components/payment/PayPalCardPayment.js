import React from "react";
import {
    PayPalScriptProvider,
    PayPalCardFieldsProvider,
    PayPalCardFieldsForm,
    usePayPalCardFields,
} from "@paypal/react-paypal-js";

const SubmitPayment = () => {
    const { cardFields, fields } = usePayPalCardFields();

    function submitHandler() {
        if (typeof cardFields.submit !== "function") return; // validate that `submit()` exists before using it

        cardFields
            .submit()
            .then(() => {
                // submit successful
            })
            .catch(() => {
                // submission error
            });
    }
    return <button onClick={submitHandler}>Pay</button>;
};

export default function PayPalCardPayment(props) {
    function createOrder(data) {
        // merchant code
        console.log(data);
    }
    function onApprove(data) {
        console.log(data);
        // merchant code
    }
    function onError(data) {
        // merchant code
    }
    return (
        <PayPalScriptProvider
            options={{
                "client-id":"",
                components: "card-fields",
            }}
        >
            <PayPalCardFieldsProvider
                createOrder={createOrder}
                onApprove={onApprove}
                onError={onError}
            >
                <PayPalCardFieldsForm />
                <SubmitPayment />
            </PayPalCardFieldsProvider>
        </PayPalScriptProvider>
    );
}