import React, {Component} from "react";
import { withRouter } from "react-router-dom";
import { getUserEmail } from "./userTokens";

import { UserHome } from "./userHome";

import {
    Booking_History,
    Home,
    AddRoom,
    EditRoom,
    userHome,
    Favourites,
    DeleteRoom,
  } from './paths';

  class Menu extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
          userName: getUserEmail(),
        };
        this.logUserOut = this.logUserOut.bind(this);
        this.purchaseHistory = this.purchaseHistory.bind(this);
        this.shoppingCart = this.shoppingCart.bind(this);
        this.editItem = this.editItem.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        this.inserItem = this.inserItem.bind(this);
      }
    
      logUserOut(e) {
        e.preventDefault();
        localStorage.clear();
        this.props.history.push("/");
      }
      inserItem(e) {
        e.preventDefault();
        this.props.history.push(AddRoom);
      }
      purchaseHistory(e) {
        e.preventDefault();
        this.props.history.push(Booking_History);
      }
      shoppingCart(e) {
        e.preventDefault();
        this.props.history.push(Favourites);
      }
      editItem(e) {
        e.preventDefault();
        this.props.history.push(EditRoom);
      }
      deleteItem(e) {
        e.preventDefault();
        this.props.history.push(Home);
      }
    
      render() {
        return (
          <div className={"main"}>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark navbar-default navbar-fixed-top">
              <a className="navbar-brand" href="/">
                <img height={100} style={{borderRadius: 50}} src={"https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F9%2F2020%2F01%2FBread-Hotel-Food-FT-Blog0120.jpg"} alt={"Bread & Breakfast"}></img>
              </a>
              <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
    
              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                  <li className="nav-item active">
                    <a className="nav-link" href="/userHome">
                      HOME <span className="sr-only">(current)</span>
                    </a>
                  </li>
                  {this.state.userName === "admin" ? (
                    <div>
                      <li className="nav-item">
                        <a className="nav-link" onClick={this.inserItem}>
                          ADD ROOM<span className="sr-only">(current)</span>
                        </a>
                      </li>
                      {/*<li className="nav-item active">
                                            <a className="nav-link" href="/">HOME <span className="sr-only">(current)</span></a>
                                        </li>*/}
                    </div>
                  ) : (
                    <div></div>
                  )}
                  {this.state.userName !== "admin" ? (
                 <div>
                   <ul className="navbar-nav mr-auto">
                  <li className="nav-item">
                    <a className="nav-link" onClick={this.shoppingCart}>
                      CART
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" onClick={this.purchaseHistory}>
                      BOOKING HISTORY
                    </a>
                  </li>
                  </ul>
                  </div>
                  ) : (
                    <div></div>
                  )}
                  <li className="nav-item my-2 my-lg-0">
                    <a className="nav-link" onClick={this.logUserOut}>
                      LOGOUT
                    </a>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
        );
      }
    }
    
    export default withRouter(Menu);