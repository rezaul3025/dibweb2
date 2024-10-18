import React, {Component} from "react";
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

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            authenticated: true,
        };
        this.isAuthenticated = this.isAuthenticated.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
    }

    isAuthenticated() {
        const refreshToken = localStorage.getItem('refresh_token');
        if (refreshToken !== 'undefined' && refreshToken != null) {
            const tokenParts = JSON.parse(atob(refreshToken.split('.')[1]));
            // exp date in token is expressed in seconds, while now() returns milliseconds:
            const now = Math.ceil(Date.now() / 1000);
            if (tokenParts.exp < now) {
                this.setState({
                        authenticated: false
                    }
                )
            } else {
                this.setState({
                        authenticated: true
                    }
                )
            }
        } else {
            this.setState({
                    authenticated: false
                }
            )
        }

    }

    handleLogout() {
        try {
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            this.setState({
                    authenticated: false
                }
            )
        } catch (e) {
            console.log(e);
        }

    };

    componentDidMount() {
        this.isAuthenticated()
    }


    render() {
        return (
            <BrowserRouter>
                <ScrollToTop/>
                <Routes>
                    <Route path='/' element={<Home/>}/>
                    <Route path='/activities' element={<ActivitiesPage/>}/>
                    <Route path='/dibvision' element={<DIBVisionPage/>}/>
                    <Route path='/prayer-time' element={<PrayerTimePage/>}/>
                    <Route path='/donation' element={<DonationPage/>}/>
                    <Route path='/contact' element={<ContactUs/>}/>
                    <Route path='/goalsobjective' element={<GoalsObjectivePage/>}/>
                    <Route path='/idealsvalue' element={<IdealsAndValuesPage/>}/>
                    <Route path='/history' element={<OurHistoryPage/>}/>
                    <Route path='/event' element={<EventPage/>}/>
                    <Route path='/registration' element={<RegistrationPage/>}/>
                    <Route path='/payment' element={<PaymentPage/>}/>
                </Routes>
                <Footer/>
            </BrowserRouter>
        );
    }
}

export default App;