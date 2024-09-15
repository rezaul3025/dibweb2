import React, {Fragment} from "react";
import About from "../About";
import Navbar from "../nav/Navbar";

export default function AboutPage(){
    return(
        <Fragment>
            <div className="container-fluid position-relative p-0">
                <Navbar/>
                {/*<!-- Header Start -->*/}
                <div class="container-fluid bg-breadcrumb">
                    <div class="container text-center py-5" style={{maxWidth: '900px'}}>
                        <h4 class="text-white display-4 mb-4 wow fadeInDown" data-wow-delay="0.1s">About Us</h4>
                        <ol class="breadcrumb d-flex justify-content-center mb-0 wow fadeInDown" data-wow-delay="0.3s">
                            <li class="breadcrumb-item"><a href="/">Home</a></li>
                            <li class="breadcrumb-item active text-primary">About</li>
                        </ol>
                    </div>
                </div>
                {/*<!-- Header End -->*/}
            </div>
            <About/>
        </Fragment>
);
};