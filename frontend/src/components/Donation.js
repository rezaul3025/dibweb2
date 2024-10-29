import React,{Fragment, useState} from "react";
import {Link} from "react-router-dom";

export default function Donation(){
    const [amount, setAmount] = useState(0);
    const donationInfo = {
        amount:amount,
        type:'donation'
    };
    const onChangeHandler = event => {
        setAmount(event.target.value);
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
                                    <input type="number" className="form-control border-1" id="phone" value={amount} onChange={onChangeHandler}
                                           placeholder="Other amount"/>
                                    <label htmlFor="phone">Other amount</label>
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
                                { amount && amount > 0?
                                <Link state={donationInfo} to={"/payment/0/"} type="button" className="btn btn-primary w-100 btn-lg" >
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