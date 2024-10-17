import React, {Fragment, useState} from "react";

export default function BankDetailsPopUp() {
    const [name, setName] = useState("Darul Ihsan Berlin e.V.")
    const [iban, setIban] = useState("DE52 5023 4500 0155 3400 01")
    const [bic, setBic] = useState("KTAGDEFFXXX")
    const [isCopied, setIsCopied] = useState(false);

    const handleCopy = (e) => {
        e.preventDefault()

        if (e.target.id === 'name') {
            navigator.clipboard.writeText(name);
            handleShowHideCopiedMsg();
        } else if (e.target.id === 'iban') {
            navigator.clipboard.writeText(iban);
            handleShowHideCopiedMsg();
        } else if (e.target.id === 'bic') {
            navigator.clipboard.writeText(bic);
            handleShowHideCopiedMsg();
        } else if (e.target.id === 'copyall') {
            navigator.clipboard.writeText(name + '\n' + iban + '\n' + bic);
            handleShowHideCopiedMsg();
        }
    };

    const handleShowHideCopiedMsg = () => {
        setIsCopied(true);
        setTimeout(() => {
            setIsCopied(false);
        }, 600);
    };

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
                                <div className="col-md-6 col-lg-6 col-xl-8 align-self-center">
                                    <span>Name</span>
                                    <h6 className="mb-2">{name} <i role="button" id="name" onClick={handleCopy}
                                                                   className="fa-duotone fa-solid fa-copy text-primary"></i>
                                    </h6>
                                    <span>IBAN</span>
                                    <h6 className="mb-2">{iban} <i role="button" id="iban" onClick={handleCopy}
                                                                   className="fa-duotone fa-solid fa-copy text-primary"></i>
                                    </h6>
                                    <span>BIC</span>
                                    <h6 className="mb-2">{bic} <i role="button" id="bic" onClick={handleCopy}
                                                                  className="fa-duotone fa-solid fa-copy text-primary"></i>
                                    </h6>
                                </div>
                                <div className="col-md-6 col-lg-6 col-xl-4">
                                    <img width={140} height={140} src={'/static/assets/images/bank_transfer_qrc.png'}
                                         alt="Bank transfer QR code"/>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            {isCopied && <span className="text-primary"><i className="fa-solid fa-circle-check"></i> Copied</span>}
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal"><i
                                className="fa-sharp fa-solid fa-xmark"></i> Close
                            </button>
                            <button type="button" className="btn btn-primary" id="copyall" onClick={handleCopy}><i
                                className="fa-duotone fa-solid fa-copy"></i> Copy
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
};