import {Button, Col, Row} from "antd";
import React, {useContext, useEffect, useState} from "react";
import MultiStepFormContext from "./MultiStepFormContext";

const Review = () => {
    const {personalDetails, numberOfAttendee, next, prev} = useContext(MultiStepFormContext);
    const [ticketCost, setTicketCost] = useState(0)
    const numberOfAdult = numberOfAttendee.family_ticket? 2 : numberOfAttendee.numberOfAdults;
    const numberOfChild = numberOfAttendee.family_ticket? 3:numberOfAttendee.numberOfChild;
    const ticketPrice = numberOfAttendee.family_ticket? 50:numberOfAdult * 20 + numberOfChild * 10;

    return (
        <div className={"details__wrapper"}>
            <Row>
                <Col span={24}>
                    <h1>Personal Details</h1>
                    <p>Full Name: {personalDetails.name}</p>
                    <p>Email: {personalDetails.email}</p>
                    <p>Phone: {personalDetails.phone}</p>
                </Col>
              <Col span={24}>
                <h1>Number of attendee</h1>
                <p>No. of Adult: {numberOfAdult}</p>
                <p>No. of Child: {numberOfChild}</p>
                <p>Total ticket cost: {ticketPrice}</p>
                <div
                    className={
                      "form__item button__items d-flex justify-content-between"
                    }
                >
                  <Button type={"default"} onClick={prev}>
                    Back
                  </Button>
                  <Button type={"primary"} className="btn btn-primary" onClick={next}>
                    Confirm
                  </Button>
                </div>
              </Col>
            </Row>
        </div>
    );
};
export default Review;
