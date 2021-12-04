import React, { Component } from 'react';
import {withRouter} from "react-router-dom";
import Menu from "./menu";
import {Button, Card} from "react-bootstrap";
import {getUserToken, getUserEmail} from "./getToken";
import {DeleteRoom, EditRoom} from "./paths";
import axios from "axios";

class RoomInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.location.state.data,
            userName: getUserEmail(),
            cartData: this.props.location.state.cartData
        }
        this.openPage = this.openPage.bind(this);
        this.updateCartInfo = this.updateCartInfo.bind(this);
    }

    openPage(e, data, name) {
        console.log("data in product info is:",data);
        if(name === "edit") {
            e.preventDefault();
            this.props.history.push(EditRoom, {id: data._id});
        }
        if(name === "delete") {
            e.preventDefault();
            this.props.history.push(DeleteRoom, {id: data._id});
        }
    }

    updateCartInfo(data) {
        const tempData = {
            name: data.name,
            id: data._id,
            image: data.image,
            price: data.price,
            quantity: 1,
        };
        let tempFilterData = [];
        tempFilterData = this.state.cartData.products.filter((value) => value.id === data._id);
        if(tempFilterData.length <= 0 || tempFilterData.length === undefined) {
            console.log("hello");
            axios
                .put("http://localhost:4000/cart/addproduct/" + this.state.cartData._id, tempData, {headers: {"auth-token": getJWTToken()}})
                .then((res) => {
                    console.log(res);
                    console.log("Item successfully updated");

                    fetch("http://localhost:4000/cart/",{
                        method: 'GET',
                        headers: {
                            'auth-token': getJWTToken()
                        },
                    })
                        .then((res) => res.json())
                        .then((data) => {
                            console.log("cart data is:", data);
                            this.setState({
                                cartData: data,
                            })
                        })
                        .catch(console.log);

                    // Redirect to Homepage
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }

    render() {
        return (
            <div className={"main bg-light"}>
                <Menu userName={this.state.userName}/>
                <div>
                    <div className={"row"} style={{marginLeft: "10%", marginRight: "10%", backgroundColor: "white", overflowY: "hidden"}}>
                        <div className={"col-md-6 pt-5 pb-5"}>
                            <img src={this.state.data.image} width={"90%"} style={{marginLeft: "8%"}}></img>
                        </div>
                        <div className={"col-md-6 pt-5 pb-5"}>
                            <div>
                                <h3 className={"mb-5"}>Room Details</h3>
                                <h5 className={"mb-1"}>Room Name:</h5>
                                <p className={"mb-5"}>{this.state.data.name}</p>
                                <h5 className={"mb-1"}>Description:</h5>
                                <p className={"mb-5"}>{this.state.data.description}</p>
                                <h5 className={"mb-1"}>Price:</h5>
                                <p className={"mb-5"}>${this.state.data.price}</p>
                            </div>
                            <div>
                                {this.state.data.Deleted === false ?
                                    <Button variant="primary" style={{backgroundColor: '#333B3F', height: 50, width: 500}} onClick={()=>this.updateCartInfo(this.state.data)}>ADD TO FAVOURITES</Button> :
                                    <Card.Text style={{height: 50, textAlign: "center", fontWeight: 800, fontSize: 20}}>SOLD OUT</Card.Text>
                                }
                            </div>
                            <div className={"row text-align-center mt-3"}>
                                <div className={"col ml-2"}>
                                    {this.state.userName === "admin" ?
                                        <Button variant="primary" style={{backgroundColor: '#333B3F', height: 50, width: 200}} onClick={(e) => this.openPage(e, this.state.data, "edit")}>EDIT</Button> :
                                        <div></div>
                                    }
                                </div>
                                <div className={"col"}>
                                    {this.state.userName === "admin" ?
                                        <Button variant="primary" style={{backgroundColor: '#333B3F', height: 50, width: 200}} onClick={(e) => this.openPage(e, this.state.data, "delete")}>DELETE</Button> :
                                        <div></div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer style={"display: sticky; bottom: 0px"}/>
            </div>
        );
    }
}

export default withRouter(RoomInfo);