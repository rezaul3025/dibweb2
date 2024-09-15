import React, {Component} from "react";
import axiosInstance from "../axiosApi";


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            message: ""
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    async handleSubmit(event) {
        //alert('A username and password was submitted: ' + this.state.email + " " + this.state.password);
        event.preventDefault();
        try {
            const response = await axiosInstance.post('/auth/login/', {
                email: this.state.email,
                password: this.state.password
            });
            axiosInstance.defaults.headers['Authorization'] = "Bearer " + response.data.access;
            localStorage.setItem('access_token', response.data.access);
            localStorage.setItem('refresh_token', response.data.refresh);
            localStorage.setItem('user', JSON.stringify(response.data.user));
            //const noticeRes = await axiosInstance.get('/notice/?user_id='+response.data.user.id)
            //console.log(response.data.user);
            window.location.href = '/';
        } catch (error) {
            this.setState({
                message: 'Somethings went wrong, maybe login information not valid'
            });
        }
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email:</label>
                        <input name="email" type="email" className="form-control" id="email" value={this.state.email}
                               aria-describedby="emailHelp" onChange={this.handleChange}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input name="password" type="password" className="form-control" id="password"
                               value={this.state.password} onChange={this.handleChange}/>
                    </div>
                    <div className="d-grid gap-2">
                        {this.state.message &&
                            <div className="alert alert-success" role="alert">
                                {this.state.message}
                            </div>
                        }
                        <input type="submit" className="btn btn-success" value="Login"/>
                    </div>

                </form>
            </div>
        )
    }
}

export default Login;