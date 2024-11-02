import React,{Fragment, useState} from "react";
import {Link} from "react-router-dom";

export default function Donation(){
    const [amount, setAmount] = useState(0.0);
    const[error, setError]= useState('')
    const donationInfo = {
        amount:amount,
        type:'Donation'
    };
    const onChangeHandler = event => {
        const moneyRegx = "/^(\\d+|\\d{1,3}(\\.\\d{3})*)(,\\d+)?$/"
        const value = event.target.value;
        setAmount(value);
        if(/^(?!0\.00)\d{1,4}(,\d{3})*(\.\d\d)?$/.test(value)) {
            setError('')
        }
        else {
            setError('Only number allowed, maximum 4 digits before decimal')
        }
    };

    return(
        <Fragment>
            <div className="container-fluid feature pb-5 py-5">
                <div id="donation" className="container pb-5">
                    <div className="text-center mx-auto pb-5 wow fadeInUp" data-wow-delay="0.2s"
                         style={{maxWidth: '800px'}}>
                        <h4 className="text-primary">Donation</h4>
                        <h1 className="display-5 mb-4">“Whoever builds a mosque for Allah, Allah will build for him a
                            house like it in
                            Paradise.”</h1>
                        <p className="mb-0">Source: Ṣaḥīḥ al-Bukhārī 450, Ṣaḥīḥ Muslim 533.</p>
                    </div>
                    <div className="p-5 rounded h-100 wow fadeInUp" data-wow-delay="0.2s">
                        <div className="row g-4 py-1">
                            <div className="col-lg-12 col-xl-4">
                                <button type="button" className="btn btn-outline-primary w-100" onClick={()=>setAmount(10)}><i
                                    className="fas fa-solid fa-euro-sign"></i> 10
                                </button>
                            </div>
                            <div className="col-lg-12 col-xl-4">
                                <button type="button" className="btn btn-outline-primary w-100" onClick={()=>setAmount(20)}><i
                                    className="fas fa-solid fa-euro-sign"></i> 20
                                </button>
                            </div>
                            <div className="col-lg-12 col-xl-4">
                                <button type="button" className="btn btn-outline-primary w-100" onClick={()=>setAmount(30)}><i
                                    className="fas fa-solid fa-euro-sign"></i> 30
                                </button>
                            </div>
                        </div>
                        <div className="row g-4 py-1">
                            <div className="col-lg-12 col-xl-4">
                                <button type="button" className="btn btn-outline-primary w-100" onClick={()=>setAmount(40)}><i
                                    className="fas fa-solid fa-euro-sign"></i> 40
                                </button>
                            </div>
                            <div className="col-lg-12 col-xl-4">
                                <button type="button" className="btn btn-outline-primary w-100" onClick={()=>setAmount(50)}><i
                                    className="fas fa-solid fa-euro-sign"></i> 50
                                </button>
                            </div>
                            <div className="col-lg-12 col-xl-4">
                                <button type="button" className="btn btn-outline-primary w-100" onClick={()=>setAmount(60)}><i
                                    className="fas fa-solid fa-euro-sign"></i> 60
                                </button>
                            </div>
                        </div>
                        <div className="row g-4 py-2">
                            <div className="col-12 col-xl-6">
                                <div className="form-floating">
                                    <input type="number" className="form-control border-1" id="amount" value={amount} onChange={onChangeHandler}
                                           placeholder="Other amount"/>
                                    <label htmlFor="phone">Other amount</label>
                                    <span className="text-danger">{error}</span>
                                </div>
                            </div>
                            <div className="col-12 col-xl-6">
                                <div className="form-floating">
                                    <input type="text" className="form-control border-1" id="comments"
                                           placeholder="Comments"/>
                                    <label htmlFor="phone">Comments</label>
                                </div>
                            </div>
                        </div>
                        <div className="row g-4 py-2">
                            <div className="col-12">
                                { amount && amount && !error? //to={"/payment/0/"}
                                <Link state={donationInfo}  type="button" className="btn btn-primary w-100 btn-lg" to={"/payment/0/"} >
                                    <i className="fa-solid fa-circle-dollar-to-slot"></i> Donate now
                                </Link>: <Link to="/" className="disabled btn btn-primary w-100 btn-lg" onClick={ (event) => event.preventDefault() }>
                                         <i className="fa-solid fa-circle-dollar-to-slot"></i> Donate now</Link>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};