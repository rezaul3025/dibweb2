import React from "react";
import {
    Routes,
    Route, BrowserRouter
} from "react-router-dom";
import Home from "./Home";
import ActivitiesPage from "./pages/ActivitiesPage";
import PrayerTimePage from "./pages/PrayerTimePage";
import Footer from "./Footer";
import DonationPage from "./pages/DonationPage";
import ContactUs from "./contact/ContactUs";
import IdealsAndValuesPage from "./pages/IdealsValuesPage";
import OurHistoryPage from "./pages/OurHistoryPage";
import GoalsObjectivePage from "./pages/GoalsObjectivePage";
import EventPage from "./event/EventPage";
import RegistrationPage from "./registration/RegistrationPage";
import DIBVisionPage from "./pages/DIBVisionPage";
import PaymentPage from "./payment/PaymentPage";
import ScrollToTop from "./utils/ScrollToTop";
import QrCodeVerification from "./pages/QrCodeVerification";
import PaymentSuccess from "./payment/PaymentSuccess";
import PageNotFound from "./PageNotFound";
import MembershipPage from "./pages/MembershipPage";
import TermsConditionPage from "./pages/TermsConditionPage";
import CashRegistrationPage from "./registration/CashRegistrationPage";

export default function () {
   return (
            <BrowserRouter>
                <ScrollToTop/>
                <Routes>
                    <Route exact path='/' element={<Home/>}/>
                    <Route path='/activities' element={<ActivitiesPage/>}/>
                    <Route path='/dibvision' element={<DIBVisionPage/>}/>
                    <Route path='/prayer-time' element={<PrayerTimePage/>}/>
                    <Route path='/donation' element={<DonationPage/>}/>
                    <Route path='/newmember' element={<MembershipPage/>}/>
                    <Route path='/contact' element={<ContactUs/>}/>
                    <Route path='/goalsobjective' element={<GoalsObjectivePage/>}/>
                    <Route path='/idealsvalue' element={<IdealsAndValuesPage/>}/>
                    <Route path='/history' element={<OurHistoryPage/>}/>
                    <Route path='/event' element={<EventPage/>}/>
                    <Route path='/registration/:eventId' element={<RegistrationPage/>}/>
                    <Route path='/payment/:payId' element={<PaymentPage/>}/>
                    <Route path='/verify/:attendeeId/:paymentReference' element={<QrCodeVerification/>}/>
                    <Route path='/payment-success/:orderId/:payType' element={<PaymentSuccess/>}/>
                    <Route path='/terms-condition' element={<TermsConditionPage/>}/>
                    <Route path='/cash-sale' element={<CashRegistrationPage />}/>
                    <Route path='*' element={<PageNotFound />} />
                </Routes>
                <Footer/>
            </BrowserRouter>
        );
}