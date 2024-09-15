import React,{Fragment} from "react";

export default function Footer(){
    return(
        <Fragment>
            {/*<!-- Footer Start -->*/}
            <div class="container-fluid footer py-5 wow fadeIn" data-wow-delay="0.2s">
                <div class="container py-5 border-start-0 border-end-0" style={{border: '1px solid', borderColor: 'rgb(255, 255, 255, 0.08)'}}>
                    <div class="row g-5">
                        <div class="col-md-6 col-lg-6 col-xl-4">
                            <div class="footer-item">
                                <a href="index.html" class="p-0">
                                    <h4 class="text-white"><img width="50" height="50" src={'/static/assets/images/dib-logo-new.png'} alt="Logo"/> Darul Ihsan Berlin e.V</h4>
                                </a>
                                <p class="mb-4">
                                    KT Bank AG <br/>
                                    IBAN: DE5250xxxx00015534xxxx
                                </p>
                                <div class="d-flex">
                                    <a href="#" class="bg-primary d-flex rounded align-items-center py-2 px-3 me-2">
                                        <i class="fas fa-apple-alt text-white"></i>
                                        <div class="ms-3">
                                            <small class="text-white">Download on the</small>
                                            <h6 class="text-white">App Store</h6>
                                        </div>
                                    </a>
                                    <a href="#" class="bg-dark d-flex rounded align-items-center py-2 px-3 ms-2">
                                        <i class="fas fa-play text-primary"></i>
                                        <div class="ms-3">
                                            <small class="text-white">Get it on</small>
                                            <h6 class="text-white">Google Play</h6>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6 col-lg-6 col-xl-2">
                            <div class="footer-item">
                                <h4 class="text-white mb-4">Quick Links</h4>
                                <a href={"/about"}><i class="fas fa-angle-right me-2"></i> About Us</a>
                                <a href={"/activities"}><i class="fas fa-angle-right me-2"></i> Activities </a>
                                <a href={"/donation"}><i class="fas fa-angle-right me-2"></i> Donation</a>
                                <a href={"/prayer-time"} ><i class="fas fa-angle-right me-2"></i> Prayer Time</a>
                                <a href="#"><i class="fas fa-angle-right me-2"></i> Contact us</a>
                            </div>
                        </div>
                        <div class="col-md-6 col-lg-6 col-xl-3">
                            <div class="footer-item">
                                <h4 class="text-white mb-4">Support</h4>
                                <a href="#"><i class="fas fa-angle-right me-2"></i> Privacy Policy</a>
                                <a href="#"><i class="fas fa-angle-right me-2"></i> Terms & Conditions</a>
                                <a href="#"><i class="fas fa-angle-right me-2"></i> Disclaimer</a>
                                <a href="#"><i class="fas fa-angle-right me-2"></i> Support</a>
                                <a href="#"><i class="fas fa-angle-right me-2"></i> FAQ</a>
                                <a href="#"><i class="fas fa-angle-right me-2"></i> Help</a>
                            </div>
                        </div>
                        <div class="col-md-6 col-lg-6 col-xl-3">
                            <div class="footer-item">
                                <h4 class="text-white mb-4">Contact Info</h4>
                                <div class="d-flex align-items-center">
                                    <i class="fas fa-map-marker-alt text-primary me-3"></i>
                                    <p class="text-white mb-0">Brunnenstraße 122, 13355 Berlin</p>
                                </div>
                                <div class="d-flex align-items-center">
                                    <i class="fas fa-envelope text-primary me-3"></i>
                                    <p class="text-white mb-0">info@daurlihsan-berlin.de</p>
                                </div>
                                <div class="d-flex align-items-center">
                                    <i class="fa fa-phone-alt text-primary me-3"></i>
                                    <p class="text-white mb-0">(030) 3456 7890</p>
                                </div>
                                <div class="d-flex align-items-center mb-4">
                                    <i class="fab fa-firefox-browser text-primary me-3"></i>
                                    <p class="text-white mb-0">www.darulihsan-berlin.com</p>
                                </div>
                                <div class="d-flex">
                                    <a class="btn btn-primary btn-sm-square rounded-circle me-3" href="#"><i class="fab fa-facebook-f text-white"></i></a>
                                    <a class="btn btn-primary btn-sm-square rounded-circle me-3" href="#"><i class="fab fa-twitter text-white"></i></a>
                                    <a class="btn btn-primary btn-sm-square rounded-circle me-3" href="#"><i class="fab fa-instagram text-white"></i></a>
                                    <a class="btn btn-primary btn-sm-square rounded-circle me-0" href="#"><i class="fab fa-linkedin-in text-white"></i></a>
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