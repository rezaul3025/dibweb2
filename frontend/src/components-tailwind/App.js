import React from "react";
import {
    Routes,
    Route, BrowserRouter
} from "react-router-dom";
import ScrollToTop from "../components/utils/ScrollToTop";
import HomePage from "./HomePage";
import ActivityDetailsPage from "./activities/ActivityDetailsPage";
import HistoryPage from "./about-us/HistoryPage";

export default function () {
   return (
            <BrowserRouter>
                <ScrollToTop/>
                <Routes>
                    <Route exact path='/' element={<HomePage/>}/>
                    <Route exact path='/activity-details/:eventId' element={<ActivityDetailsPage />}/>
                    <Route exact path='/history' element={<HistoryPage />}/>
                </Routes>
            </BrowserRouter>
        );
}