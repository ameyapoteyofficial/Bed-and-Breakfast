import React, {Component} from "react";
import axios from "axios";
import Formcontent from "./formcontent";
import Menu from "./menu";
import { withRouter } from "react-router-dom";
import { getUserToken } from "./userTokens";

class UserHome extends Component{
    constructor(props) {
        super(props);
        this.state = {
          userName: "admin"
        }

    }
    componentDidMount(){
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
        console.log("data is:"+ data.json);
        // this.setState({
        //   data: data,
        //   tempData: data,
        // });
      })
      .catch(console.log);
    }
    render(){
        return(
            <div>
              <Menu userName={this.state.userName} style={{display: "fixed", top: 0}}/>
            </div>
        )
    }
}

export default withRouter(UserHome);