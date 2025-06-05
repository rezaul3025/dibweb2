import React, {Fragment} from "react";
import Navbar from "./nav/Navbar";
import Carousel from "./carousel/Carousel";
import About from "./About";
import Activities from "./Activities";
import Donation from "./Donation";
import OurHistory from "./OurHistory";


export default function Home(){
    return(
        <Fragment>
            <div className="container-fluid position-relative p-0">
                <Navbar />
            </div>
            <OurHistory/>
            <Donation/>
            <Activities/>
        </Fragment>
    );
}