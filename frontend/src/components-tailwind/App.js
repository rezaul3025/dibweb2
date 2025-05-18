import React from "react";
import {
    Routes,
    Route, BrowserRouter
} from "react-router-dom";
import ScrollToTop from "../components/utils/ScrollToTop";
import HomePage from "./HomePage";
import ActivityDetailsPage from "./activities/ActivityDetailsPage";
import HistoryPage from "./about-us/HistoryPage";
import DonationPage from "./donation/DonationPage";
import AboutUsPage from "./about-us/AboutUsPage";
import VisionPage from "./vision/VisionPage";
import MembershipPage from "./membership/MembershipPage";
import DownloadPage from "./download/DownloadPage";
import AcademyPage from "./academy/AcademyPage";

export default function () {
   return (
            <BrowserRouter>
                <ScrollToTop/>
                <Routes>
                    <Route exact path='/' element={<HomePage/>}/>
                    <Route exact path='/activity-details/:eventId' element={<ActivityDetailsPage />}/>
                    <Route exact path='/history' element={<AboutUsPage />}/>
                    <Route exact path='/vision' element={<VisionPage />}/>
                    <Route exact path='/membership' element={<MembershipPage />}/>
                    <Route exact path='/donation-tailwind' element={<DonationPage /> } />
                    <Route exact path='/download' element={<DownloadPage /> } />
                    <Route exact path='/academy' element={<AcademyPage /> } />
                </Routes>
            </BrowserRouter>
        );
}