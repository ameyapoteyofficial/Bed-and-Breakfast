import React, { Component } from "react";
import axios from "axios";
import { NavItem, Table } from "react-bootstrap";
import { getUserToken, getUserEmail } from "./userTokens";
import Menu from "./menu";
import moment from "moment";
import "moment-timezone";
import { Login } from "./paths";
import { withRouter } from "react-router";

class BookingHistoryPage extends Component {
    constructor(props) {
        super(props);

        if (getUserToken() === null) {
            props.history.push(Login);
        }

        // Setting up state
        this.state = {
            userName: getUserEmail(),
            historyData: [],
        };
    }

    getformattedDate(date){
        var m = moment.utc(date);
        m.tz('America/Chicago');
        var s = m.format("YYYY-MM-DD");
        return s;
    }
    getTotalPrice(startDate, endDate , cost){
       let a = moment(startDate);
       let  b = moment(endDate);
        return "$" +(Math.abs(a.diff(b, 'days'))*cost); 
    }

    componentDidMount() {
        const token = getUserToken();
        axios
            .get("http://localhost:5000/api/bookinghistory", {
                headers: { "Authorization": "Bearer " + token },
            })
            .then((res) => {
                this.setState({
                    historyData: res.data,
                })
            })
            .catch((error) => {
                alert(error);
            });
    }

    render() {
        return (
            <>
                <Menu userName={this.state.userName} />
                <div className="container">
                    <div
                        style={{
                            border: "2px gray solid",
                            margin: "20px",
                            padding: "10px",
                        }}
                    >

                        {(this.state.historyData).length !== 0 ? (
                            <Table responsive="md">
                                <thead>
                                    <tr>
                                        <th>Image</th>
                                        <th>Name</th>
                                        <th>Start Date</th>
                                        <th>End Date</th>
                                        <th>Booking Date</th>
                                        <th>Total Cost</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {(this.state.historyData).map((item, idx) => {
                                        return (
                                            <tr id={item._id}>
                                                <td>
                                                    <img
                                                        src={item.Room.Image}
                                                        alt="item image"
                                                        height="100px"
                                                        width="120px"
                                                    />
                                                </td>
                                                <td>{item.Room.Name}</td>
                                                <td>{item.StartDate.substring(0,10)}</td>
                                                <td>{item.EndDate.substring(0,10)}</td>
                                                <td>{this.getformattedDate(item.createdAt)}</td>
                                                <td>{this.getTotalPrice(item.StartDate,item.EndDate,item.Room.Price)}</td>
                                            </tr>
                                        );
                                    })}

                                    
                                </tbody>
                            </Table>
                        ) : (
                            <h3> No Bookings were made</h3>
                        )}

                    </div>
                    

                </div>
            </>
        );
    }
}

export default withRouter(BookingHistoryPage)