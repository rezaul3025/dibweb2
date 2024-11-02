import React, {Fragment, useState} from "react";
import MultiStepForm from "./MultiStepForm";

export default function CashRegistration() {
    const [eventId, setEventId] = useState()
    const [cashSaleKey, setCashSaleKey] = useState()
    const [startCashSale, setStartCashSale] = useState(false)

    const startCashSaleHandler = () =>{
        if(typeof eventId !=='undefined' && cashSaleKey===process.env.REACT_APP_CASH_SALE_KEY){
            setStartCashSale(true);
        }
    }

    return (
        <Fragment>
            <div className="container-fluid offer-section pb-5 py-5">
                <div className="container pb-5">
                    <div className="row g-4">
                        <button type="button" className="btn btn-primary" data-bs-toggle="modal"
                                data-bs-target="#exampleModal">
                            Cash sale ticket
                        </button>
                         {startCashSale && <div className="bg-light p-5 rounded h-100 wow fadeInUp" data-wow-delay="0.2s">
                           <MultiStepForm eventId={eventId} saleType="cash"/>
                        </div>}
                        <div className="modal fade" id="exampleModal" data-bs-backdrop="static"
                             data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel"
                             aria-hidden="true">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal"
                                                aria-label="Close"></button>
                                    </div>
                                    <div className="modal-body">
                                        <div className="mb-3">
                                            <label htmlFor="exampleFormControlInput1" className="form-label">Event
                                                Id</label>
                                            <input type="text" className="form-control" id="eventId"
                                                   value={eventId}
                                                   onChange={(e) => setEventId(e.target.value)}/>
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="exampleFormControlInput1" className="form-label">Cash
                                                Sale Key</label>
                                            <input type="text" className="form-control" id="CashSaleKey"
                                                   value={cashSaleKey}
                                                   onChange={(e) => setCashSaleKey(e.target.value)}/>
                                        </div>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary"
                                                data-bs-dismiss="modal">Close
                                        </button>
                                        <button type="button" className="btn btn-primary"
                                                onClick={() => startCashSaleHandler()}
                                                data-bs-dismiss="modal">Start
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}