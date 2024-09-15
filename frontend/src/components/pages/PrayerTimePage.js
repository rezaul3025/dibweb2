import React,{Fragment} from "react";
import Navbar from "../nav/Navbar";

export default function PrayerTimePage(){
    return(
        <Fragment>
            <div className="container-fluid position-relative p-0">
                <Navbar/>
                {/*<!-- Header Start -->*/}
                <div className="container-fluid bg-breadcrumb">
                    <div className="container text-center py-5" style={{maxWidth: '900px'}}>
                        <h4 className="text-white display-4 mb-4 wow fadeInDown" data-wow-delay="0.1s">Prayer Time</h4>
                        <ol className="breadcrumb d-flex justify-content-center mb-0 wow fadeInDown"
                            data-wow-delay="0.3s">
                            <li className="breadcrumb-item"><a href="/">Home</a></li>
                            <li className="breadcrumb-item active text-primary">Prayer Time</li>
                        </ol>
                    </div>
                </div>
                {/*<!-- Header End -->*/}
            </div>
            <div className="container-fluid about py-5">
                <div className="container py-5">
                    <div className="row g-5 align-items-center">
                        <div className="col-xl-7 wow fadeInLeft" data-wow-delay="0.2s">
                            <h4 className="text-primary">Prayer Time</h4>
                            <div className="row g-4 py-5">
                                <div className="col-md-6 col-lg-4 wow fadeInUp" data-wow-delay="0.2s">
                                    <iframe className="widget"
                                            src="https://mawaqit.net/en/w/darul-ihsan-berlin?showOnly5PrayerTimes=0"
                                            style={{width: '1366px', height: '768px'}} frameBorder="0"
                                            scrolling="no"></iframe>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
);
};