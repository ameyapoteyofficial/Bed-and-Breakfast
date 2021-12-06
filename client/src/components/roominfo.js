import React, { Component } from 'react';
import {withRouter} from "react-router-dom";
import Menu from "./menu";
import {Button, Card} from "react-bootstrap";
import {getUserToken, getUserEmail, getUserId} from "./userTokens";
import {DeleteRoom, EditRoom} from "./paths";
import axios from "axios";

class RoomInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.location.state.data,
            userName: getUserEmail(),
            startDate: this.props.location.state.startDate,
            endDate: this.props.location.state.endDate,
            userID: getUserId(),
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
    }

    updateCartInfo(data) {
        if(this.state.startDate === "" || this.state.endDate ===""){
            alert("please select start and end date");
            this.props.history.push("/userHome");
        }

        const objectData = {
            Room: data,
            StartDate: this.state.startDate,
            EndDate: this.state.endDate,
            UserID: this.state.userID,
        };
            axios.post("http://localhost:5000/api/cart/", objectData, {
                headers: { "Authorization": "Bearer " + getUserToken() }
            }).then((res) => {
                if (res.status === 200){
                    console.log(res);
                    alert("Room added in to the cart");
                    this.props.history.push("/favourites");
                }
                else{
                        alert("error in adding room to the cart"+ res.json);
                        return;
                }
            }).catch(err => {
                if (err.response) {
                  alert("There is some error in adding the room to cart!!");
                } 
            });
    }

    render() {
        return (
            <div className={"main bg-light"}>
                <Menu userName={this.state.userName}/>
                <div>
                    <div className={"row"} style={{marginLeft: "10%", marginRight: "10%", backgroundColor: "white", overflowY: "hidden"}}>
                        <div className={"col-md-6 pt-5 pb-5"}>
                            <img src={this.state.data.Image} width={"90%"} style={{marginLeft: "8%"}}></img>
                        </div>
                        <div className={"col-md-6 pt-5 pb-5"}>
                            <div>
                                <h3 className={"mb-5"}>Room Details</h3>
                                <h5 className={"mb-1"}>Room Name:</h5>
                                <p className={"mb-5"}>{this.state.data.Name}</p>
                                <h5 className={"mb-1"}>Description:</h5>
                                <p className={"mb-5"}>{this.state.data.Description}</p>
                                <h5 className={"mb-1"}>Price:</h5>
                                <p className={"mb-5"}>${this.state.data.Price}</p>
                                <h5 className={"mb-1"}>Start Date:</h5>
                                <p className={"mb-5"}>{this.state.startDate}</p>
                                <h5 className={"mb-1"}>End Date:</h5>
                                <p className={"mb-5"}>{this.state.endDate}</p>
                            </div>
                            <div>
                                {this.state.data.Deleted === false && this.state.userName !== "admin" ?
                                    <Button variant="primary" style={{backgroundColor: '#333B3F', height: 50, width: 500}} onClick={()=>this.updateCartInfo(this.state.data)}>ADD TO FAVOURITES</Button> :
                                    <div></div>
                                }
                            </div>
                            <div className={"row text-align-center mt-3"}>
                                <div className={"col ml-2"}>
                                    {
                                       this.state.userName === "admin" ?
                                        <Button variant="primary" style={{backgroundColor: '#333B3F', height: 50, width: 200}} onClick={(e) => this.openPage(e, this.state.data, "edit")}>EDIT/DELETE</Button> :
                                        <div></div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
        );
    }
}

export default withRouter(RoomInfo);