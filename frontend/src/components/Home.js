import React, {Fragment} from "react";
import Navbar from "./nav/Navbar";
import Carousel from "./Carousel";
import About from "./About";
import Activities from "./Activities";
import Donation from "./Donation";

export default function Home(){
    return(
        <Fragment>
            <div className="container-fluid position-relative p-0">
                <Navbar />
                <Carousel/>
            </div>
            <About />
            <Activities/>
            <Donation/>
        </Fragment>
    );
}