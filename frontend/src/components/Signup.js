import React, { Component } from "react";
import axiosInstance from "../axiosApi";

class Signup extends Component{
    constructor(props){
        super(props);

        this.state = {
            username: "",
            password: "",
            email:"",
            message:""
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

   async handleSubmit(event) {
       //alert('A username and password was submitted: ' + this.state.username + " " + this.state.password + " " + this.state.email);
       event.preventDefault();
       try {
           const response = await axiosInstance.post('/auth/register/', {
               username: this.state.email,
               email: this.state.email,
               password: this.state.password
           });
           if(response.status === 201) {
               window.location.href = '/login';
           }
           else if(response.status === 200){
              this.setState({
                  message:'You haven not got invitation for signup'
              })
           }
           else if(response.status === 400){
              this.setState({
                  message:'Something went wrong, maybe input data not valid'
              })
           }

       } catch (error) {
            this.setState({
                message:'Somethings went wrong, maybe registration information not valid'
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
                               aria-describedby="emailHelp" onChange={this.handleChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input name="password" type="password" className="form-control" id="password" value={this.state.password} onChange={this.handleChange}
                        aria-describedby="passHelp" />
                        <div id="passHelp" className="form-text">Minimum password length 8 characters
                            </div>
                    </div>
                    <div className="d-grid gap-2">
                        {this.state.message &&
                            <div className="alert alert-success" role="alert">
                                {this.state.message}
                            </div>
                        }
                        <input type="submit" className="btn btn-success" value="Register"/>
                    </div>
                </form>
            </div>
        )
    }
}
export default Signup;