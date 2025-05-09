import React, {Fragment} from "react";
import Nevber from "./header/Nevber";
import Header from "./header/Header";
import Activities from "./activities/Activities";
import MissionAndVision from "./mission-and-vision/MissionAndVision";
export default function Home() {
    return (
        <Fragment>
            <Header />
            <Activities />
            <MissionAndVision />
        </Fragment>
    )
}