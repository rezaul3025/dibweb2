import React,{Fragment} from "react";

export default function Donation(){
    return(
        <Fragment>
            <div className="container-fluid feature pb-5 py-5">
                <div className="container pb-5">
                    <div className="text-center mx-auto pb-5 wow fadeInUp" data-wow-delay="0.2s" style={{maxWidth: '800px'}}>
                        <h4 className="text-primary">Donation</h4>
                        <h1 className="display-5 mb-4">“Whoever builds a mosque for Allah, Allah will build for him a house like it in
                                            Paradise.”</h1>
                        <p className="mb-0">Source: Ṣaḥīḥ al-Bukhārī 450, Ṣaḥīḥ Muslim 533.</p>
                    </div>
                    <div className="row g-4">
                        <div className="col-md-6 col-lg-6 col-xl-3 wow fadeInUp" data-wow-delay="0.2s">
                            <div className="feature-item p-4">
                                <div className="p-4 mb-4">
                                    <h1 className="display-5 text-primary"> 10 <i
                                        className="fas fa-solid fa-euro-sign text-primary"></i></h1>
                                </div>
                                <br/>
                                <a className="btn btn-primary rounded-pill py-2 px-4" href="#">Donate</a>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-6 col-xl-3 wow fadeInUp" data-wow-delay="0.2s">
                            <div className="feature-item p-4">
                                <div className="p-4 mb-4">
                                    <h1 className="display-5 text-primary"> 20 <i
                                        className="fas fa-solid fa-euro-sign text-primary"></i></h1>
                                </div>
                                <br/>
                                <a className="btn btn-primary rounded-pill py-2 px-4" href="#">Donate</a>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-6 col-xl-3 wow fadeInUp" data-wow-delay="0.2s">
                            <div className="feature-item p-4">
                                <div className="p-4 mb-4">
                                    <h1 className="display-5 text-primary"> 30 <i
                                        className="fas fa-solid fa-euro-sign text-primary"></i></h1>
                                </div>
                                <br/>
                                <a className="btn btn-primary rounded-pill py-2 px-4" href="#">Donate</a>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-6 col-xl-3 wow fadeInUp" data-wow-delay="0.2s">
                            <div className="feature-item p-4">
                                <div className="p-4 mb-4">
                                    <h1 className="display-5 text-primary"> 40 <i
                                        className="fas fa-solid fa-euro-sign text-primary"></i></h1>
                                </div>
                                <br/>
                                <a className="btn btn-primary rounded-pill py-2 px-4" href="#">Donate</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};