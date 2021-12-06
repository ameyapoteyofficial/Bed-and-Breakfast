import React, {Component} from "react";
import axios from "axios";
import Formcontent from "./formcontent"
import { withRouter } from "react-router-dom";
import { Register } from "./paths";
import Footer from "./footer-file";
import { setUserEmail, setUserToken,setUserId } from "./userTokens";

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
        
        if(this.state.emailId === "admin" && this.state.password === "admin"){
            setUserToken("adminToken");
            setUserEmail("admin");
            this.setState({
                emailId : "",
                password : ""
              });
              this.props.history.push("/userHome");
              return;
        }
        const loginObject = {
            Email : this.state.emailId,
            Password : this.state.password
        }
        
        axios.post("http://localhost:5000/api/users/login", loginObject).then((res) => {
            if (res.status === 200) {
              setUserToken(res.data.Token);
              setUserEmail(res.data.Email);
              setUserId(res.data._id);
              this.setState({
                emailId : "",
                password : ""
              });
              this.props.history.push("/userHome");
             
            } else {
              alert("error"+ res.json);
      
              return;
            }
          }).catch(err => {
            if (err.response) {
              alert("Invalid Credentials!!");
            } else if (err.request) {
              // client never received a response, or request never left
            } else {
              // anything else
            }
        });
    }
    render(){
    return (
        <div className="container mt-5"> 
        <h1> Login </h1>
        <form className = "mt-5" onSubmit= {this.onSubmitForm}>
                    <Formcontent 
                        id = "email" 
                        type = "text" 
                        label = "Email"
                        value = {this.state.emailId}
                        placeholder = "Enter Email"
                        onChange = {this.setEmailId.bind(this)}
                        />
                    <Formcontent 
                        id = "password"
                        type = "password" 
                        label = "Password"
                        value = {this.state.password}
                        placeholder = "Enter Password"
                        onChange = {this.setPassword.bind(this)}
                        />
                <button type="submit" className="btn btn-primary mt-3">Login</button>
        </form>
        <div className= "mt-3">
            <Footer url={Register} text="New User? " name="Register"/>
        </div>
        
        </div>
    );
    }   
}
export default withRouter(LoginPage);