import React, {Fragment} from "react";
import Navbar from "./nav/Navbar";  

export default function GoalsAndObjective(){
    return(
        <Fragment>
            <div className="container-fluid position-relative p-0">
                <Navbar/>
                {/*<!-- Header Start -->*/}
                <div className="container-fluid bg-breadcrumb">
                    <div className="container text-center py-5" style={{maxWidth: '900px'}}>
                        <h4 className="text-white display-4 mb-4 wow fadeInDown" data-wow-delay="0.1s">About Us</h4>
                        <ol className="breadcrumb d-flex justify-content-center mb-0 wow fadeInDown" data-wow-delay="0.3s">
                            <li className="breadcrumb-item"><a href="/">Home</a></li>
                            <li className="breadcrumb-item active text-primary">About</li>
                        </ol>
                    </div>
                </div>
                {/*<!-- Header End -->*/}
            </div>
       <p>GoalsAndObjective</p>
        </Fragment>
);
};