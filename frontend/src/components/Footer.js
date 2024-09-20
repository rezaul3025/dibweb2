import React,{Fragment} from "react";
import {Link} from "react-router-dom";

export default function Footer(){
    return(
        <Fragment>
            {/*<!-- Footer Start -->*/}
            <div className="container-fluid footer py-5 wow fadeIn" data-wow-delay="0.2s">
                <div className="container py-5 border-start-0 border-end-0" style={{border: '1px solid', borderColor: 'rgb(255, 255, 255, 0.08)'}}>
                    <div className="row g-5">
                        <div className="col-md-6 col-lg-6 col-xl-4">
                            <div className="footer-item">
                                <a href="index.html" className="p-0">
                                    <h4 className="text-white"> Darul Ihsan Berlin e.V</h4>
                                </a>
                                <p className="mb-4">
                                    KT Bank AG <br/>
                                    IBAN: DE5250xxxx00015534xxxx
                                </p>
                                <div className="d-flex">
                                    <a href="#" className="bg-primary d-flex rounded align-items-center py-2 px-3 me-2">
                                        <i className="fas fa-apple-alt text-white"></i>
                                        <div className="ms-3">
                                            <small className="text-white">Download on the</small>
                                            <h6 className="text-white">App Store</h6>
                                        </div>
                                    </a>
                                    <a href="#" className="bg-dark d-flex rounded align-items-center py-2 px-3 ms-2">
                                        <i className="fas fa-play text-primary"></i>
                                        <div className="ms-3">
                                            <small className="text-white">Get it on</small>
                                            <h6 className="text-white">Google Play</h6>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-6 col-xl-2">
                            <div className="footer-item">
                                <h4 className="text-white mb-4">Quick Links</h4>
                                <Link to={"/about/"}><i className="fas fa-angle-right me-2"></i> About Us</Link>
                                <Link to={"/activities/"}><i className="fas fa-angle-right me-2"></i> Activities </Link>
                                <Link to={"/donation/"}><i className="fas fa-angle-right me-2"></i> Donation</Link>
                                <Link to={"/prayer-time/"} ><i className="fas fa-angle-right me-2"></i> Prayer Time</Link>
                                <Link to={"/contact/"}><i className="fas fa-angle-right me-2"></i> Contact us</Link>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-6 col-xl-3">
                            <div className="footer-item">
                                <h4 className="text-white mb-4">Support</h4>
                                <a href="#"><i className="fas fa-angle-right me-2"></i> Privacy Policy</a>
                                <a href="#"><i className="fas fa-angle-right me-2"></i> Terms & Conditions</a>
                                <a href="#"><i className="fas fa-angle-right me-2"></i> Disclaimer</a>
                                <a href="#"><i className="fas fa-angle-right me-2"></i> Support</a>
                                <a href="#"><i className="fas fa-angle-right me-2"></i> FAQ</a>
                                <a href="#"><i className="fas fa-angle-right me-2"></i> Help</a>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-6 col-xl-3">
                            <div className="footer-item">
                                <h4 className="text-white mb-4">Contact Info</h4>
                                <div className="d-flex align-items-center">
                                    <i className="fas fa-map-marker-alt text-primary me-3"></i>
                                    <p className="text-white mb-0">Brunnenstraße 122, 13355 Berlin</p>
                                </div>
                                <div className="d-flex align-items-center">
                                    <i className="fas fa-envelope text-primary me-3"></i>
                                    <p className="text-white mb-0">info@daurlihsan-berlin.de</p>
                                </div>
                                <div className="d-flex align-items-center">
                                    <i className="fa fa-phone-alt text-primary me-3"></i>
                                    <p className="text-white mb-0">(030) 3456 7890</p>
                                </div>
                                <div className="d-flex align-items-center mb-4">
                                    <i className="fab fa-firefox-browser text-primary me-3"></i>
                                    <p className="text-white mb-0">www.darulihsan-berlin.com</p>
                                </div>
                                <div className="d-flex">
                                    <a className="btn btn-primary btn-sm-square rounded-circle me-3" href="#"><i className="fab fa-facebook-f text-white"></i></a>
                                    <a className="btn btn-primary btn-sm-square rounded-circle me-3" href="#"><i className="fab fa-twitter text-white"></i></a>
                                    <a className="btn btn-primary btn-sm-square rounded-circle me-3" href="#"><i className="fab fa-instagram text-white"></i></a>
                                    <a className="btn btn-primary btn-sm-square rounded-circle me-0" href="#"><i className="fab fa-linkedin-in text-white"></i></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/*<!-- Footer End -->*/}

            {/*<!-- Copyright Start -->*/}
            <div className="container-fluid copyright py-4">
                <div className="container">
                    <div className="row g-4 align-items-center">
                        <div className="col-md-6 text-center text-md-start mb-md-0">
                            <span className="text-body"><a href="#" className="border-bottom text-white"><i className="fas fa-copyright text-light me-2"></i>Darul Ihsan Berlin e.V</a>, All right reserved.</span>
                        </div>
                    </div>
                </div>
            </div>
            {/*<!-- Copyright End -->*/}
        </Fragment>
    );
};