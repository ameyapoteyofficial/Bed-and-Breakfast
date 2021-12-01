import React, {Fragment, useEffect, useState} from "react";
 

const LoginPage = () =>{
    return <Fragment>
    <nav class="navbar navbar-dark bg-dark">
        <span class="navbar-brand mb-0 h1">Airbnb</span>
    
        </nav>
        <div className="container mt-5 w-50">
        <form >
            <div className="form-group">
                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"></input>
                <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div className="form-group">
                <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"></input>
            </div>
            <button type="submit" className="btn btn-primary mr-5">Login</button>
            <button type="submit" className="btn btn-warning">Signup</button>
        </form>
        </div>
    </Fragment>
}
export default LoginPage;