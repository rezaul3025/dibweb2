import React, {Fragment} from "react";

export default function BankDetailsPopUp() {

    return (
        <Fragment>
            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false"
                 tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="staticBackdropLabel">Please use following bank details for
                                transfer</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <div className="col-md-6 col-lg-6 col-xl-7 align-self-center">
                                    <p className="mb-2">Darul Ihsan Berlin e.V.  <i
                                        className="fa-duotone fa-solid fa-copy"></i></p>
                                    <p className="mb-2">DE52 5023 4500 0155 3400 01  <i
                                        className="fa-duotone fa-solid fa-copy"></i></p>
                                </div>
                                <div className="col-md-6 col-lg-6 col-xl-5">
                                    <img width={150} height={150} src={'/static/assets/images/bank_transfer_qrc.png'}
                                         alt="Bank transfer QR code"/>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal"> <i className="fa-sharp fa-solid fa-xmark"></i> Close
                            </button>
                            <button type="button" className="btn btn-primary"><i className="fa-duotone fa-solid fa-copy"></i> Copy
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
};