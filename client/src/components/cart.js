import React, { Component } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { Cart } from "./paths";
import Footer from "./footer-file";
import { getUserToken,getUserEmail } from "./userTokens";
import Formcontent from "./formcontent";
import { Register } from "./paths";
import { Login } from "./paths";
import { Table } from "react-bootstrap";
import { Success } from "./paths";
import Menu from "./menu";


class CartPage extends Component {
    constructor(props) {
        super(props);
        if (getUserToken() === null) {
            props.history.push(Login);
        }

        this.state = {
            userName: getUserEmail(),
            cartData: [],
            finalPrice: 0
        };

        this.deleteCartItem = this.deleteCartItem.bind(this);
        this.checkOut = this.checkOut.bind(this);
    }

    getFormattedDate(date1) {
        var date = new Date(date1);
        //console.log("Date is: " + date);
        var year = date.getFullYear();

        var month = (1 + date.getMonth()).toString();
        month = month.length > 1 ? month : '0' + month;

        var day = (date.getDate()).toString();
        day = day.length > 1 ? day : '0' + day;

        return month + '/' + day + '/' + year;
    }

    componentDidMount() {
        let token = getUserToken();
        let total = 0;
        console.log("Mounting with token: "+token);
        axios.get("http://localhost:5000/api/cart/getUserCarts", {
            headers: { "Authorization": "Bearer " + token }
        })
            .then((res) => {
                if (res.data !== null) {
                    res.data.forEach((item) => {
                        total = total + item.Room.Price;
                    })
                }
                this.setState({
                    cartData: res.data,
                    finalPrice: total
                })
            })
            .catch((error) => {
                alert("error");
            });
    }

    deleteCartItem(e, id) {
        let token = getUserToken();
        let total = 0;
        //alert("id of cart item: "+id);
        axios
            .delete(
                "http://localhost:5000/api/cart/" + id,
                {
                    headers: { "Authorization": "Bearer " + token }
                }
            )
            .then((res) => {
                console.log("Cart item deleted successfully");
                axios.get("http://localhost:5000/api/cart/getUserCarts", {
                    headers: { "Authorization": "Bearer " + token }
                })
                    .then((res) => {
                        if (res.data !== null) {
                            res.data.forEach((item) => {
                                total = total + item.Room.Price;
                            })
                        }
                        this.setState({
                            cartData: res.data,
                            finalPrice: total
                        })
                    })
            });
    }

    checkOut(e) {
        e.preventDefault();
        let token = getUserToken();
        let finalCartData = this.state.cartData;
        //console.log("finalCartData: "+finalCartData);

        finalCartData.forEach(function (cartItem) {
            
            var historyItem = {};
            historyItem.Room = cartItem.Room;
            historyItem.StartDate = cartItem.StartDate;
            historyItem.EndDate = cartItem.EndDate;
            historyItem.UserID = cartItem.UserID;
            //console.log(" historyItem: "+ historyItem);

            var registrationItem = {};
            registrationItem.RoomID = cartItem.Room._id;
            registrationItem.StartDate = cartItem.StartDate;
            registrationItem.EndDate = cartItem.EndDate;

            axios
                .post("http://localhost:5000/api/bookinghistory", historyItem, {
                    headers: { "Authorization": "Bearer " + token },
                })
                .then((res) => {
                    console.log(historyItem._id + " pushed to booking history successfully");
                })
                .catch((error) => {
                    alert(error);
                });

            axios
                .post("http://localhost:5000/api/registration", registrationItem)
                .then((res) => {
                    console.log(res._id + " pushed to registration history successfully");
                })
                .catch((error) => {
                    alert(error);
                });

            axios
                .delete(
                    "http://localhost:5000/api/cart/" + cartItem._id,
                    {
                        headers: { "Authorization": "Bearer " + token}
                    }
                )
                .then((res) => {
                    console.log(cartItem._id + " deleted successfully");
                })
        })
        this.props.history.push(Success);
    }

    render() {
        return (
            <div>
                <Menu userName={this.state.userName} />

                {(this.state.cartData).length !== 0 ? (
                    <Table responsive="md">
                        <thead>
                            <tr>
                                <th> #</th>
                                <th>Name</th>
                                <th>Start Date</th>
                                <th>End Date</th>
                                <th>Price</th>
                                <th> Action </th>
                            </tr>
                        </thead>
                        <tbody>
                            {(this.state.cartData).map((item, idx) => {
                                return (
                                    <tr id={item._id}>
                                        <td>{idx + 1}</td>
                                        <td>{item.Room.Name}</td>
                                        <td>{this.getFormattedDate(item.StartDate)}</td>
                                        <td>{this.getFormattedDate(item.EndDate)}</td>
                                        <td>{item.Room.Price}</td>
                                        <td>
                                            <button
                                                className="btn-danger"
                                                onClick={(e) => {
                                                    this.deleteCartItem(e, item._id);
                                                }}
                                            >
                                                remove
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}

                            <tr id="total">
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>Total cart price: </td>
                                <td>{this.state.finalPrice}</td>
                                <td>
                                    <button className="btn-primary" onClick={this.checkOut}>

                                        checkout
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                ) : (
                    <h3> No products in your cart</h3>
                )}
            </div>
        );
    }
}

export default withRouter(CartPage);