import React, {Component} from "react";
import axios from "axios";
import Formcontent from "./formcontent";
import Menu from "./menu";
import { withRouter } from "react-router-dom";
import { getUserEmail, getUserToken } from "./userTokens";
import RoomListing from "./roomListing";
import { Card, Button } from 'react-bootstrap';

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
            userName: "admin",
            startDate: "",
            endDate:""
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
    handleCheckbox = (e, s, category) => {
      if(this.state.searchText !== "") {
          let checkedBoxes = [...this.state.roomTypesChecked];
          if (e.target.checked) {
              checkedBoxes.push(s);
              /*if(s !== "All departments") {
                          const tempData = this.state.data.filter((value) => value.category === s);
                          this.setState({
                              tempData: tempData
                          })
                      }*/
          } else {
              const index = checkedBoxes.findIndex((ch) => ch === s);
              checkedBoxes.splice(index, 1);
          }
          console.log("Checked Boxes: "+checkedBoxes);
          this.setState({roomTypesChecked: checkedBoxes});
          let updatedData = [];
          var old_data = this.state.data;
          console.log(checkedBoxes);
          if (checkedBoxes.length <= 0 || checkedBoxes.length === undefined) {
              const tempValue = this.state.data.filter((value) =>
                  value.Category.toLowerCase().includes(this.state.searchText.toLowerCase())
              );
              this.setState({
                  tempData: tempValue,
                  updated: !this.state.updated,
                  searchText: this.state.searchText
              });
          } else {
              if (s !== "All departments") {
                  for (var i = 0; i < checkedBoxes.length; i++) {
                      for (var j = 0; j < this.state.tempData.length; j++) {
                          if (checkedBoxes[i] === this.state.tempData[j].category) {
                              updatedData.push(this.state.tempData[j]);
                          }
                      }
                  }
                  if(updatedData !== []){
                    
                  }
                  this.setState({
                      tempData: updatedData,
                  });
              }
          }
      }
      else {
          let checkedBoxes = [...this.state.roomTypesChecked];
          if (e.target.checked) {
              checkedBoxes.push(s);
              /*if(s !== "All departments") {
                          const tempData = this.state.data.filter((value) => value.category === s);
                          this.setState({
                              tempData: tempData
                          })
                      }*/
          } else {
              const index = checkedBoxes.findIndex((ch) => ch === s);
              checkedBoxes.splice(index, 1);
          }
          this.setState({roomTypesChecked: checkedBoxes});
          let updatedData = [];
          var old_data = this.state.data;
          console.log(checkedBoxes);
          if (checkedBoxes.length <= 0 || checkedBoxes.length === undefined) {
              this.setState({
                  tempData: old_data,
              });
          } else {
              if (s !== "All departments") {
                  for (var i = 0; i < checkedBoxes.length; i++) {
                      for (var j = 0; j < this.state.data.length; j++) {
                        console.log(checkedBoxes[i]+" "+this.state.data[j].Category);
                          if (checkedBoxes[i] === this.state.data[j].Category) {
                              updatedData.push(this.state.data[j]);
                          }
                      }
                  }
                  
                  this.setState({
                      tempData: updatedData,
                  });
              }
          }
      }
};

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
                  <span>Check-in Date: </span>
                  <input
                    type="date"
                    onChange={(event) => this.setState({startDate: event.target.value})}
                    className={"border pl-2"}
                  />
                  <br/>
                  <br/>
                  <span>Check-out Date: </span>
                  <input
                    type="date"
                    onChange={(event) =>{ this.setState({endDate: event.target.value})}}
                    className={"border pl-2"}
                  />
                  <br/>
                  <br/>
                  <Button variant="warning" style={{height: 40, }} >Search Rooms</Button>
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
                    startDate={this.state.startDate}
                    endDate={this.state.endDate}
                  />
                </div>
              </div>
            ) : (
              <div style={{display: "flex", justifyContent: "center", alignItems: "center", height: "100%"}}>
                  <h1>Loading Data...</h1>
              </div>
            )}
            </div>
        )
    }
}

export default withRouter(UserHome);