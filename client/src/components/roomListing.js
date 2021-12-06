import React, { Component } from 'react';
import ReactDOM from "react-dom";
import { Card, Button } from 'react-bootstrap';
import Pagination from "react-js-pagination";
import {
    Redirect,
    useHistory,
    withRouter
} from "react-router-dom";
import { getUserEmail, getUserId, getUserToken } from "./userTokens";
import axios from "axios";


class RoomListing extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activePage: 1,
            data: this.props.data,
            updatedData: this.props.data,
            userName: getUserEmail(),
            cartData: [],
            startDate :this.props.startDate,
            endDate:this.props.endDate
        };
        
        this.handlePageChange = this.handlePageChange.bind(this);
        this.openProductPage = this.openProductPage.bind(this);
        this.updateCartInfo = this.updateCartInfo.bind(this);
        this.openPage = this.openPage.bind(this);
    }

    componentDidMount() {
        let tempData = [];
        let data = this.state.data;
        
        if(this.state.data.length > 9) {
            for (var i = 0; i < 9; i++) {
                tempData.push(data[i]);
            }
            this.setState({
                updatedData: tempData,
            });
        }
        else {
            for (var i = 0; i < this.state.data.length; i++) {
                tempData.push(data[i]);
            }
            this.setState({
                updatedData: tempData,
            });
        }
        // fetch("http://localhost:5000/cart/",{
        //     method: 'GET',
        //     headers: {
        //         'Authorization': "Bearer "+getUserToken()
        //     },
        // })
        //     .then((res) => res.json())
        //     .then((data) => {
        //         console.log("cart data is:", data);
        //         this.setState({
        //             cartData: data,
        //         })
        //     })
        //     .catch(console.log);
            console.log(this.state.updatedData);
    }

    componentWillReceiveProps(nextProps) {
        // alert(this.state.endDate);
        let tempData = [];
        let data = nextProps.data;
        if(nextProps.data.length > 9) {
            for (var i = 0; i < 9; i++) {
                tempData.push(data[i]);
            }
        }
        else {
            for (var i = 0; i < nextProps.data.length; i++) {
                tempData.push(data[i]);
            }
        }
        this.setState({
            data: nextProps.data,
            updatedData: tempData,
            activePage: 1,
            startDate:nextProps.startDate,
            endDate: nextProps.endDate
        });
        
    }

    handlePageChange(pageNumber) {
        let tempData = [];
        if(9 * pageNumber < this.state.data.length) {
            for (var i = 9 * (pageNumber - 1); i < 9 * pageNumber; i++) {
                tempData.push(this.state.data[i])
            }
        }
        else {
            for (var i = 9 * (pageNumber - 1); i < this.state.data.length; i++) {
                tempData.push(this.state.data[i])
            }
        }
        this.setState({
            activePage: pageNumber,
            updatedData: tempData,
        });
        window.scrollTo(0, 350)
    }

    openPage(e, data, name) {
        console.log(data);
        if(name === "edit") {
            e.preventDefault();
            this.props.history.push("/editroom", {id: data._id});
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
            UserID: getUserId(),
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


    openProductPage(data) {
        this.props.history.push("/roomInfo",{ data: data, userName: this.state.userName, cartData: this.state.cartData, startDate: this.state.startDate, endDate: this.state.endDate });
    }

    render() {
        return(
            <div className={"mt-5 ml-5"}>
                <Pagination
                    width={1000}
                    hideFirstLastPages
                    itemClass="page-item"
                    linkClass="page-link"
                    activePage={this.state.activePage}
                    itemsCountPerPage={9}
                    totalItemsCount={this.state.data.length}
                    onChange={this.handlePageChange}
                />
                <div className={"row mt-5"}>
                    {this.state.updatedData.map((value) => {return (
                    <div>
                        {value.Deleted === false ?
                        <div className={"mr-3 mb-5"} style={{border: "1px solid black"}}>
                           
                            
                            <Card className={"cards"} style={{ width: '19rem', border: 0 , color: 'black'}} onClick={() => this.openProductPage(value)}>
                                <Card.Img  style={{height: 200, overflow: 'hidden'}} variant="top" src={value.Image} />
                                <Card.Body style={{textAlign: 'center', borderRadius: '25px', padding: '20px'}}>
                                    <Card.Text style={{height: 50, overflow: 'hidden'}}>{value.Name}</Card.Text>
                                    <Card.Text>
                                        ${value.Price} / Night
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                            <div style={{textAlign: "center", backgroundColor: "white"}} className={"pb-3"}>
                                <div >
                                    {this.state.userName !== "admin" ?
                                        <Button className="btn btn-primary mt-3" variant="primary" style={{ height: 50}} onClick={()=>this.updateCartInfo(value)}>ADD TO CART</Button> :
                                        <div></div>
                                    }
                                </div>
                                <div>
                                        {this.state.userName === "admin" ?
                                            <Button className="btn btn-primary mt-3" variant="primary" style={{ height: 50, width: 200}} onClick={(e) => this.openPage(e, value, "edit")}>EDIT / DELETE</Button> :
                                            <div></div>
                                        } 
                                </div>
                            </div>

                        </div> :
                        <div></div>
                         }
                        
                        </div>
                    )})}
                </div>
                <Pagination
                    width={1000}
                    hideFirstLastPages
                    itemClass="page-item"
                    linkClass="page-link"
                    activePage={this.state.activePage}
                    itemsCountPerPage={9}
                    totalItemsCount={this.state.data.length}
                    onChange={this.handlePageChange}
                />
            </div>
        
        );
    }
}

export default withRouter(RoomListing);
