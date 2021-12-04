import React, {Component} from "react";
import axios from "axios";
import Formcontent from "./formcontent";
import Menu from "./menu";
import { withRouter } from "react-router-dom";
import { getUserEmail, getUserToken } from "./userTokens";
import RoomListing from "./roomListing";

class UserHome extends Component{
    constructor(props) {
        super(props);
        this.state = {
          data: [],
            searchText: "",
            tempData: [],
            updated: false,
            roomTypes: ["Deluxe", "Excecutive", "Presidential"],
            roomTypesChecked: [],
            costChecked: [],
            cost: ["All Price", "$1-$10", "$11-$30", "$30+"],
            userName: "admin"
        }

    }
    componentDidMount(){
      if(getUserEmail()==="admin" && getUserToken()=== "adminToken"){
          fetch("http://localhost:5000/api/admin/", {
          method: "GET",
        })
          .then((res) => res.json())
          .then((data) => {
            console.log("Admin data is:"+ data);
            this.setState({
              data: data,
              tempData: data,
            });
          })
          .catch(console.log);
    
      }
      else{
        fetch("http://localhost:5000/api/users/rooms", {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Authorization": "Bearer "+getUserToken()
          },
        })
          .then((res) => res.json())
          .then((data) => {
            console.log("data is:"+ data);
            this.setState({
              data: data,
              tempData: data,
            });
          })
          .catch(console.log);
      }
       
    }
    render(){
        return(
            <div>
              <Menu userName={this.state.userName} style={{display: "fixed", top: 0}}/>
              {this.state.tempData.length !== 0 ? (
              <div
                className="row mt-5 mb-5"
                style={{ marginLeft: 100, marginRight: 100 }}
              >
                <div className="col-md-2">
                  <input
                    type="text"
                    placeholder={"search"}
                    onChange={(event) => this.setState({searchText: event.target.value})}
                    onKeyDown={this.searchText}
                    value={this.state.searchText}
                    className={"border pl-2"}
                  />
                  <div className={"mt-5"}>
                    <h5>Room Type</h5>
                    <hr />
                    <div className={"col"}>
                      {this.state.roomTypes.map((data) => {
                        return (
                          <label className={"col"}>
                            <input
                              className={"mr-2"}
                              name={data}
                              type="checkbox"
                              checked={this.state.roomTypesChecked.find(
                                (ch) => ch === data
                              )}
                              onChange={(e) =>
                                this.handleCheckbox(e, data, "department")
                              }
                            />
                            {data}
                          </label>
                        );
                      })}
                    </div>
                  </div>
                </div>
                <div className="col-md-10">
                  {/* <Samplecarousel /> */}
                  <RoomListing
                    data={this.state.tempData}
                    userName={this.state.userName}
                  />
                </div>
              </div>
            ) : (
              <div style={{display: "flex", justifyContent: "center", alignItems: "center", height: "100%"}}>
                  <h1>Your Products are loading...</h1>
              </div>
            )}
            </div>
        )
    }
}

export default withRouter(UserHome);