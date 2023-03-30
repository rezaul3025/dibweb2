import React, {Component, Fragment} from "react";
import Login from "./Login";
import Signup from "./Signup";
import Notice from "./Notice";
import {
    BrowserRouter,
    Routes,
    Route,
    Link
} from "react-router-dom";
import axiosInstance from "../axiosApi";

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
                <nav className="navbar navbar-expand-md fixed-top navbar-light bg-light">
                    <div className="container-fluid">
                        <a className="navbar-brand" href="/"><img src={'/static/assets/images/dib-logo-new.png'} alt="dib logo" width={30} height={25} data-aos="zoom-in" data-aos-delay="100" />
                            &nbsp; N O T I C E - B O A R D
                        </a>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                                data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false"
                                aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarCollapse">
                            <ul className="navbar-nav me-auto mb-2 mb-md-0">
                                <li className="nav-item">
                                    <Link className={"nav-link active"} aria-current="page"  to={"/"}></Link>
                                </li>
                            </ul>
                            <ul className="navbar-nav ms-auto mb-2 mb-md-0">
                                {!this.state.authenticated && <li className="nav-item">
                                      <Link className={"nav-link"} to={"/login"}>Login</Link>
                                </li>}
                                {this.state.authenticated && <li className={"nav-item"}>
                                     <Link className={"nav-link"} onClick={this.handleLogout}>Logout</Link>
                                </li>}
                            </ul>
                        </div>
                    </div>
                </nav>
                <main className="container">
                    <Routes>
                        <Route path='/login' element={<Login />}/>
                        <Route path='/signup' element={<Signup />}/>
                        <Route path='/' element={<Notice />}/>
                    </Routes>
                </main>
            </Fragment>
        );
    }
}

export default App;