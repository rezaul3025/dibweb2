import React, {useState} from "react";

export default function BankDetails() {


    const [amount, setAmount] = useState(0.0);
    const [error, setError] = useState('')
    const donationInfo = {
        amount: amount,
        type: 'Donation'
    };

    const [name, setName] = useState("Darul Ihsan Berlin e.V.")
    const [iban, setIban] = useState("DE52 5023 4500 0155 3400 01")
    const [bic, setBic] = useState("KTAGDEFFXXX")
    const [isCopied, setIsCopied] = useState(false);

    const handleCopy = (e) => {
        e.preventDefault()

        if (e.target.id === 'name') {
            writeClipboardText(name);
            handleShowHideCopiedMsg();
        } else if (e.target.id === 'iban') {
            writeClipboardText(iban);
            handleShowHideCopiedMsg();
        } else if (e.target.id === 'bic') {
            writeClipboardText(bic);
            handleShowHideCopiedMsg();
        } else if (e.target.id === 'copyall') {
            writeClipboardText(name + '\n' + iban + '\n' + bic);
            handleShowHideCopiedMsg();
        }
    };

    function writeClipboardText(text) {
        try {
            navigator.clipboard.writeText(text);
        } catch (error) {
            console.error(error.message);
        }
    }

    const handleShowHideCopiedMsg = () => {
        setIsCopied(true);
        setTimeout(() => {
            setIsCopied(false);
        }, 600);
    };

    const onChangeHandler = event => {
        const moneyRegx = "/^(\\d+|\\d{1,3}(\\.\\d{3})*)(,\\d+)?$/"
        const value = event.target.value;
        setAmount(value);
        if (/^(?!0\.00)\d{1,4}(,\d{3})*(\.\d\d)?$/.test(value)) {
            setError('')
        } else {
            setError('Only number allowed, maximum 4 digits before decimal')
        }
    };


    return (
        <div className="p-4 bg-light" style={{maxWidth: '800px'}}>
            <p> Transfer to our bank account</p>
            <div className="row">
                <div className="col-md-12 col-lg-12 col-xl-8">
                    <ul className="list-group list-group-flush pt-2">
                        <li className="list-group-item">
                            <small> Name </small><span className="mb-2"><b><small>{name}</small></b> <i role="button" id="name" onClick={handleCopy}
                                                                  className="fa-duotone fa-solid fa-copy text-primary"></i>
                        </span>
                        </li>
                        <li className="list-group-item">
                            <small>IBAN</small> <span className="mb-2"><b><small>{iban} </small></b><i role="button" id="iban" onClick={handleCopy}
                                                             className="fa-duotone fa-solid fa-copy text-primary"></i>
                            </span>
                        </li>
                        <li className="list-group-item">
                            <small>BIC <span className="mb-2"><b>{bic}</b> <i role="button" id="bic" onClick={handleCopy}
                                                            className="fa-duotone fa-solid fa-copy text-primary"></i>
                            </span></small>
                        </li>
                    </ul>
                </div>
                <div className="col-md-12 col-lg-12 col-xl-4 text-center pt-2">
                    <img width={140} height={140}
                         src={'/static/assets/images/bank_transfer_qrc.png'}
                         alt="Bank transfer QR code"/>
                </div>
                {isCopied && <span className="text-primary">Copied!</span>}
            </div>
        </div>

    )
}