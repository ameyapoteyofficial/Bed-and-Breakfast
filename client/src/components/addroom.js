import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import Menu from "./menu";

export default class Add extends Component {
  constructor(props) {
    super(props);

    this.onChangeRoom = this.onChangeRoom.bind(this);
    this.onChangePrice = this.onChangePrice.bind(this);
    this.onChangeCate = this.onChangeCate.bind(this);
    this.onChangebeds = this.onChangebeds.bind(this);
    this.onChangeDesc = this.onChangeDesc.bind(this);
    this.onChangeroomImage = this.onChangeroomImage.bind(this);
    this.onChangeArea = this.onChangeArea.bind(this);
    this.onChangeMaximum = this.onChangeMaximum.bind(this);
    this.onChangeBedType = this.onChangeBedType.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      name: "",
      price: "",
      category: "",
      quantity: "",
      description: "",
      image: "",
      area: "",
      maximum: "",
      bedtype: "",
    };
  }

  onChangeItemId(e) {
    this.setState({ id: e.target.value });
  }

  onChangeRoom(e) {
    this.setState({ name: e.target.value });
  }

  onChangePrice(e) {
    this.setState({ price: e.target.value });
  }

  onChangeCate(e) {
    this.setState({ category: e.target.value });
  }

  onChangebeds(e) {
    this.setState({ quantity: e.target.value });
  }
  onChangeDesc(e) {
    this.setState({ description: e.target.value });
  }

  onChangeroomImage(e) {
    this.setState({ image: e.target.value });
  }

  onChangeArea(e) {
    this.setState({ area: e.target.value });
  }

  onChangeMaximum(e) {
    this.setState({ maximum: e.target.value });
  }

  onChangeBedType(e) {
    this.setState({ bedtype: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const itemObject = {
      Name: this.state.name,
      Number_of_Beds: this.state.quantity,
      Area_in_sqft: this.state.area,
      Max_Occupancy: this.state.maximum,
      Bed_Type: this.state.bedtype,
      Image: this.state.image,
      Price: this.state.price,
      Description: this.state.description,
      Category: this.state.category,
      Deleted: false,
    };

    axios.post("http://localhost:5000/api/admin/create", itemObject).then((res) => console.log(res.data));
    alert("Room Inserted");
    this.setState({
        name: "",
        price: "",
        category: "",
        quantity: "",
        description: "",
        image: "",
        area: "",
        maximum: "",
        bedtype: "",
    });
    this.props.history.push("/userHome");
  }

  render() {
    return (
      <>
        <Menu userName={this.state.userName} />

        <div className="form-wrapper container mt-2">
          <h3 align="center">Add Room</h3>
          <Form onSubmit={this.onSubmit}>
           
            <Form.Group controlId="Name" className="mb-2">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" value={this.state.name} onChange={this.onChangeRoom}/>
            </Form.Group>

            <Form.Group controlId="Quantity" className="mb-2">
              <Form.Label>No of Beds</Form.Label>
              <Form.Control type="text" value={this.state.quantity} onChange={this.onChangebeds}/>
            </Form.Group>

            <Form.Group controlId="Area" className="mb-2">
              <Form.Label>Area (in Sq ft)</Form.Label>
              <Form.Control type="text" value={this.state.area} onChange={this.onChangeArea}/>
            </Form.Group>

            <Form.Group controlId="Maximum_occupancy" className="mb-2">
              <Form.Label>Max Occupancy</Form.Label>
              <Form.Control type="text" value={this.state.maximum} onChange={this.onChangeMaximum}/>
            </Form.Group>

            <Form.Group controlId="Bed_type" className="mb-2">
              <Form.Label>Bed Type</Form.Label>
              <Form.Control type="text" value={this.state.bedtype} onChange={this.onChangeBedType}/>
            </Form.Group>

            <Form.Group controlId="Image" className="mb-2">
              <Form.Label>Image URL</Form.Label>
              <Form.Control type="text" onChange={this.onChangeroomImage} value={this.state.image}/>
            </Form.Group>

            <Form.Group controlId="Price" className="mb-2">
              <Form.Label>Price</Form.Label>
              <Form.Control type="text" value={this.state.price} onChange={this.onChangePrice}/>
            </Form.Group>

            <Form.Group controlId="Description" className="mb-2">
              <Form.Label>Description</Form.Label>
              <Form.Control type="text" value={this.state.description} onChange={this.onChangeDesc}/>
            </Form.Group>

            <Form.Group controlId="Category" className="mb-2">
              <Form.Label>Category</Form.Label>
              <Form.Control as="select" value={this.state.category} onChange={this.onChangeCate} className="my-1 mr-sm-2" custom>
                <option value="0">Choose...</option>
                <option value="Deluxe">Deluxe</option>
                <option value="Executive">Executive</option>
                <option value="Presidential">Presidential</option>
              </Form.Control>
            </Form.Group>
           

            <Button className={"mt-3 mb-2"} variant="primary" align="center" block="block" type="submit">
              Add Room
            </Button>
          </Form>
        </div>
      </>
    );
  }
}