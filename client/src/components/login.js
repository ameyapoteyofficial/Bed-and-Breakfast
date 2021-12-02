import React, {Component, Fragment, useEffect, useState} from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";

class LoginPage extends Component{
    constructor(props){
        super(props);

        this.onSubmitForm = this.onSubmitForm.bind(this);

        this.state = {
            emailId : "",
            password : ""
        };
    }
    setEmailId(e){
        this.setState({emailId: e.target.value});
    }
    setPassword(e){
        this.setState({password: e.target.value});
    }
    onSubmitForm(e) {
        e.preventDefault();
        alert("form submitted!!");
    }
    render(){
    return (
        <form className = "mt-5" onSubmit= {this.onSubmitForm}>

                    <input 
                        type = "text" 
                        className = "form-control  mt-2" 
                        value = {this.state.emailId}
                        placeholder = "Enter Email"
                        onChange = {this.setEmailId.bind(this)}
                        />
                    <input 
                        type = "password" 
                        className = "form-control  mt-2" 
                        value = {this.state.password}
                        placeholder = "Enter Password"
                        onChange = {this.setPassword.bind(this)}
                        />
                <button type="submit" className="btn btn-primary">Login</button>
        </form>
    );
    }   
}
export default withRouter(LoginPage);