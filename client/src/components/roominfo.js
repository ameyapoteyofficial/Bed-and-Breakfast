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
        this.editPage = this.editPage.bind(this);
        this.cartInformation = this.cartInformation.bind(this);
    }

    editPage(e, data, name) {
        if(name === "edit") {
            e.preventDefault();
            this.props.history.push(EditRoom, {id: data._id});
        }
    }

    cartInformation(data) {

        if(this.state.endDate < this.state.startDate){
            alert("Invalid Date Range!!");
            this.props.history.push("/userHome");
         }
        else if(this.state.startDate === ""){
            alert("Please select the start date before proceeding!!");
            this.props.history.push("/userHome");
        }
        else if(this.state.endDate === ""){
            alert("Please select the end date before proceeding!!");
            this.props.history.push("/userHome");
        }
        else if(this.state.startDate < new Date()){
            alert("You cant book for a previous Date!!");
            this.props.history.push("/userHome");
        }

        else{
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

        
    }

    render() {
        return (
            <div className={"main"} style={{backgroundColor: 'black'}}>
                <Menu userName={this.state.userName}/>
                <div>
                    <div className={"row"} style={{marginLeft: "10%", marginRight: "10%", backgroundColor: "black", overflowY: "hidden"}}>
                        <div className={"col-md-6 pt-5 pb-5"}>
                            <img src={this.state.data.Image} width={"100%"} height={"60%"} style={{marginLeft: "3%", borderRadius: "25px"}}></img>
                        </div>
                        <div className={"col-md-6 pt-5 pb-5"}>
                            <div>
                                <h3 className={"mb-5"}>Room Details</h3>
                                <h5 className={"mb-1"}>Room Name:</h5>
                                <p className={"mb-5"}>{this.state.data.Name}</p>
                                <h5 className={"mb-1"}>Description:</h5>
                                <p className={"mb-5"}>{this.state.data.Description}</p>
                                <h5 className={"mb-1"}>Price:</h5>
                                <p className={"mb-5"}>${this.state.data.Price} / Night</p>
                                <h5 className={"mb-1"}>Start Date:</h5>
                                <p className={"mb-5"}>{this.state.startDate}</p>
                                <h5 className={"mb-1"}>End Date:</h5>
                                <p className={"mb-5"}>{this.state.endDate}</p>
                            </div>
                            <div>
                                {this.state.data.Deleted === false && this.state.userName !== "admin" ?
                                    <Button className="btn btn-primary mt-3" variant="primary" style={{height: 50, width: 500}} onClick={()=>this.cartInformation(this.state.data)}>ADD TO CART</Button> :
                                    <div></div>
                                }
                            </div>
                            <div className={"row text-align-center mt-3"}>
                                <div className={"col ml-2"}>
                                    {
                                       this.state.userName === "admin" ?
                                        <Button className="btn btn-primary mt-3" variant="primary" style={{height: 50, width: 200}} onClick={(e) => this.editPage(e, this.state.data, "edit")}>EDIT/DELETE</Button> :
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