import React from "react";
import Button from "react-bootstrap/Button";
import { Login,Home } from "./paths";

class SuccessPage extends React.Component {
  onSubmit = () => {
    return this.props.history.push(Home);
  };

  render() {
    return (
      <div
        className="container"
        id="successpage"
        style={{ marginTop: "50px", textAlign: "center" }}
      >
        <img
          src="https://cdn0.iconfinder.com/data/icons/basic-ui-elements-2-1-flat-style/512/Basic_UI_Elements_-_2.1_-_Flat_Style_-_36_-_Expand-50-512.png"
          className="center"
          alt="success" height="300px" width="300px"
        />
        <h1 className="title2">Congratulations!</h1>
        <h2 className="title2">Your order has been successfully placed.</h2>
        <Button
          variant="success"
          onClick={this.onSubmit}
          id="redirectbtn"
          size="lg"
        >
          Go to Homepage
        </Button>
      </div>
    );
  }
}
export default SuccessPage;