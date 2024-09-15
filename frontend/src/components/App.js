import React, {Component, Fragment} from "react";
import Login from "./Login";
import Signup from "./Signup";
import {
    Routes,
    Route
} from "react-router-dom";
import axiosInstance from "../axiosApi";
import Spinner from "./nav/Spinner";
import TopBar from "./nav/TopBar";
import Home from "./Home";
import Notice from "./Notice";
import Navbar from "./nav/Navbar";
import AboutPage from "./pages/AboutPage";
import Activities from "./Activities";
import ActivitiesPage from "./pages/ActivitiesPage";
import PrayerTimePage from "./pages/PrayerTimePage";
import Footer from "./Footer";
import DonationPage from "./pages/DonationPage";

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
            axiosInstance.defaults.headers['Authorization'] = null;
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
            <Fragment>
                <Routes>
                    <Route path='/' element={<Home/>}/>
                    <Route path='/about' element={<AboutPage/>} />
                    <Route path='/activities' element={<ActivitiesPage/>} />
                    <Route path='/prayer-time' element={<PrayerTimePage />} />
                    <Route path='/donation' element={<DonationPage/>} />
                </Routes>
                <Footer/>
            </Fragment>
        );
    }
}

export default App;