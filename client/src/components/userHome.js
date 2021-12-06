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
            roomTypes: ["Deluxe", "Executive", "Presidential"],
            roomTypesChecked: [],
            costChecked: [],
            cost: ["All Price", "$1-$10", "$11-$30", "$30+"],
            userName: "admin",
            startDate: "",
            endDate:"",
            searchedData:[],
            filteredData :[]
        }

    }
    componentDidMount(){
      if(getUserEmail()==="admin" && getUserToken()=== "adminToken"){
          fetch("http://localhost:5000/api/admin/", {
          method: "GET",
        })
          .then((res) => res.json())
          .then((data) => {
            
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
      
      if(this.state.startDate !== "") {
          
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
              console.log("length: "+ checkedBoxes.length)
          }
          console.log("Checked Boxes: "+checkedBoxes);
          this.setState({roomTypesChecked: checkedBoxes});
          let updatedData = [];
          var old_data = this.state.data;
          console.log(checkedBoxes +checkedBoxes.length);
          if (checkedBoxes.length <= 0 || checkedBoxes.length === undefined) {
              // const tempValue = this.state.data.filter((value) =>
              //     value.Category.toLowerCase().includes(this.state.searchText.toLowerCase())
              // );
              // this.setState({
              //     tempData: tempValue,
              //     updated: !this.state.updated,
              //     searchText: this.state.searchText
              // });
              this.setState({tempData: this.state.searchedData});
              
              
          } else {
              if (s !== "All departments") {
                  for (var i = 0; i < checkedBoxes.length; i++) {
                      for (var j = 0; j < this.state.searchedData.length; j++) {
                        
                          if (checkedBoxes[i] === this.state.searchedData[j].Category && this.state.searchedData[j].Deleted === false) {
                              updatedData.push(this.state.searchedData[j]);
                          }
                      }
                  }
                  
                  this.setState({
                      tempData: updatedData,
                      filteredData: updatedData
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
                          if (checkedBoxes[i] === this.state.data[j].Category && this.state.data[j].Deleted === false) {
                            
                              updatedData.push(this.state.data[j]);
                          }
                      }
                  }
                  
                  this.setState({
                      tempData: updatedData,
                      filteredData: updatedData
                  });
              }
          }
      }
};
handleSearch = () => {
  let startDate = new Date(this.state.startDate);
  let endDate = new Date(this.state.endDate);
  var roomIds =[];
  var updatedObject =[];
  if(endDate < startDate){
            alert("Invalid Date Range!!");
    }
  else if(this.state.startDate === ""){
    alert("Please select the start date before proceeding!!");
  }
  else if(this.state.endDate === ""){
    alert("Please select the end date before proceeding!!");
  }
  else if(startDate < new Date()){
    alert("You cant book for a previous Date!!");
  }
  else{
    if(this.state.roomTypesChecked.length === 0){
      for (let j = 0; j < this.state.data.length; j++) {
        
        if(this.state.data[j].Deleted === false){
          roomIds.push(this.state.data[j]._id);
        }
        
    }
    const searchObject = {
      array : roomIds,
      startDate : this.state.startDate,
      endDate: this.state.endDate
  }

  axios.post("http://localhost:5000/api/registration/filtered", searchObject).then((res) => {
            if (res.status === 200) {
              console.log(res.data);
              for (let i = 0; i < this.state.data.length; i++) {
                
                  if( res.data.includes(this.state.data[i]._id) &&this.state.data[i].Deleted=== false){
                    
                    updatedObject.push(this.state.data[i]);
                  }
              }
              this.setState({
                tempData: updatedObject,
                searchedData: updatedObject
              });
            } else {
              

              return;
            }
          }).catch(err => {
            if (err.response) {
              alert("Invalid Search Query!!");
            } else if (err.request) {
              // client never received a response, or request never left
            } else {
              // anything else
            }
        });

    }
    else{
      for (let j = 0; j < this.state.filteredData.length; j++) {
        
        if(this.state.filteredData[j].Deleted === false){
          roomIds.push(this.state.filteredData[j]._id);
        }
        
    }
    const searchObject = {
      array : roomIds,
      startDate : this.state.startDate,
      endDate: this.state.endDate
  }

  axios.post("http://localhost:5000/api/registration/filtered", searchObject).then((res) => {
            if (res.status === 200) {
              
              for (let i = 0; i < this.state.filteredData.length; i++) {
                
                  if( res.data.includes(this.state.filteredData[i]._id) &&this.state.filteredData[i].Deleted=== false){
                    
                    updatedObject.push(this.state.filteredData[i]);
                  }
              }
              this.setState({
                tempData: updatedObject,
                searchedData: updatedObject
              });
            } else {
              

              return;
            }
          }).catch(err => {
            if (err.response) {
              alert("Invalid Search Query!!");
            } else if (err.request) {
              // client never received a response, or request never left
            } else {
              // anything else
            }
        });

    }
    
  }
    
};

    render(){
        return(
            <div>
              <Menu userName={this.state.userName} style={{display: "fixed", top: 0}}/>
              
              <div
                className="row mt-5 mb-5"
                style={{ marginLeft: 100, marginRight: 100 }}
              >
                <div className="col-md-2">
                  <span style={{color: "white" }}>Check-in Date: </span>
                  <input
                    type="date"
                    onChange={(event) => this.setState({startDate: event.target.value})}
                    className={"border pl-2"}
                  />
                  <br/>
                  <br/>
                  <span style={{color: "white" }}>Check-out Date: </span>
                  <input
                    type="date"
                    onChange={(event) =>{ this.setState({endDate: event.target.value})}}
                    className={"border pl-2"}
                  />
                  <br/>
                  <br/>
                  <Button variant="warning" style={{height: 40, }} onClick={(e) => this.handleSearch()}>Search Rooms</Button>
                  <div className={"mt-5"}>
                    <h5 style={{color: "white" }}>Room Type</h5>
                    <hr />
                    <div className={"col"}>
                      {this.state.roomTypes.map((data) => {
                        return (
                          <label className={"col"}>
                            <input style={{color: "white" }}
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
            
            </div>
        )
    }
}

export default withRouter(UserHome);