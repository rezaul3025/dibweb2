import React, {useEffect, useState} from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import ScrollToTop from "../components/utils/ScrollToTop";
import HomePage from "./HomePage";
import ActivityDetailsPage from "./activities/ActivityDetailsPage";
import DonationPage from "./donation/DonationPage";
import AboutUsPage from "./about-us/AboutUsPage";
import VisionPage from "./vision/VisionPage";
import MembershipPage from "./membership/MembershipPage";
import DownloadPage from "./download/DownloadPage";
import AcademyPage from "./academy/AcademyPage";
import NotificationOverlayV2 from "./NotificationOverlayV2";
import '../i18n-v2'
import MonthlyPrayerTimetablePage from "./prayer-time/MonthlyPrayerTimetablePage";
import AcademyAdminPage from "./academy/AcademyAdminPage";

export default function () {
    const [notification, setNotification] = useState(null);
    useEffect(() => {
      const fetchData = async () => {
          try {
              const response = await fetch('/api/v1/notification/');
              const data = await response.json();
              setNotification(data);
              console.log(location.pathname)
          } catch (error) {
              console.error("Error fetching notification data:", error);
          }
      };
      fetchData();
    }, []);

    const pageUrl = ["/academy-admin/"];

    return (
       <BrowserRouter>
           {notification && !pageUrl.includes(location.pathname) &&
               <NotificationOverlayV2 notification={notification[0]}/>}
           <ScrollToTop/>
               <Routes>
                   <Route exact path='/' element={<HomePage/>}/>
                   <Route exact path='/activity-details/:eventId' element={<ActivityDetailsPage/>}/>
                   <Route exact path='/history' element={<AboutUsPage/>}/>
                   <Route exact path='/vision' element={<VisionPage/>}/>
                   <Route exact path='/membership' element={<MembershipPage/>}/>
                   <Route exact path='/donation-tailwind' element={<DonationPage/>}/>
                   <Route exact path='/download' element={<DownloadPage/>}/>
                   <Route exact path='/academy' element={<AcademyPage/>}/>
                   <Route exact path='/prayer-time-tld' element={<MonthlyPrayerTimetablePage/>}/>
                   <Route exact path='/academy-admin' element={<AcademyAdminPage/>}/>
               </Routes>
       </BrowserRouter>
   );
}