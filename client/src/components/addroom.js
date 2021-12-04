import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import Menu from "./menu";

export default class Add extends Component {
  constructor(props) {
    super(props);

    this.onChangeItemName = this.onChangeItemName.bind(this);
    this.onChangeItemPrice = this.onChangeItemPrice.bind(this);
    this.onChangeItemCategory = this.onChangeItemCategory.bind(this);
    this.onChangeItemQuantity = this.onChangeItemQuantity.bind(this);
    this.onChangeItemDescription = this.onChangeItemDescription.bind(this);
    this.onChangeItemImage = this.onChangeItemImage.bind(this);
    this.onChangeArea = this.onChangeArea.bind(this);
    this.onChangeMaximum = this.onChangeMaximum.bind(this);
    this.onChangeBedType = this.onChangeBedType.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    // Setting up state
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

  onChangeItemName(e) {
    this.setState({ name: e.target.value });
  }

  onChangeItemPrice(e) {
    this.setState({ price: e.target.value });
  }

  onChangeItemCategory(e) {
    this.setState({ category: e.target.value });
  }

  onChangeItemQuantity(e) {
    this.setState({ quantity: e.target.value });
  }
  onChangeItemDescription(e) {
    this.setState({ description: e.target.value });
  }

  onChangeItemImage(e) {
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
      name: this.state.name,
      quantity: this.state.quantity,
      area: this.state.area,
      maximum: this.state.maximum,
      bedtype: this.state.bedtype,
      image: this.state.image,
      price: this.state.price,
      description: this.state.description,
      category: this.state.category,
    };

    axios
      .post("http://localhost:5000/api/admin/create", itemObject)
      .then((res) => console.log(res.data));

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
  }

  render() {
    return (
      <>
        <Menu userName={this.state.userName} />

        <div className="form-wrapper container" style={{ marginTop: "50px" }}>
          <h2 className="title1" align="center">
            {" "}
            Add Room{" "}
          </h2>
          <Form onSubmit={this.onSubmit}>
           
            <Form.Group controlId="Name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={this.state.name}
                onChange={this.onChangeItemName}
              />
            </Form.Group>

            <Form.Group controlId="Quantity">
              <Form.Label>No of Beds</Form.Label>
              <Form.Control
                type="text"
                value={this.state.quantity}
                onChange={this.onChangeItemQuantity}
              />
            </Form.Group>

            <Form.Group controlId="Area">
              <Form.Label>Area (in Sq ft)</Form.Label>
              <Form.Control
                type="text"
                value={this.state.description}
                onChange={this.onChangeArea}
              />
            </Form.Group>

            <Form.Group controlId="Maximum_occupancy">
              <Form.Label>Max Occupancy</Form.Label>
              <Form.Control
                type="text"
                value={this.state.description}
                onChange={this.onChangeMaximum}
              />
            </Form.Group>

            <Form.Group controlId="Bed_type">
              <Form.Label>Bed Type</Form.Label>
              <Form.Control
                type="text"
                value={this.state.description}
                onChange={this.onChangeBedType}
              />
            </Form.Group>

            <Form.Group controlId="Image">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="text"
                onChange={this.onChangeItemImage}
                value={this.state.image}
              />
            </Form.Group>

            <Form.Group controlId="Price">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="text"
                value={this.state.price}
                onChange={this.onChangeItemPrice}
              />
            </Form.Group>

            <Form.Group controlId="Description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                value={this.state.description}
                onChange={this.onChangeItemDescription}
              />
            </Form.Group>

            <Form.Group controlId="Category">
              <Form.Label>Category</Form.Label>
              <Form.Control
                as="select"
                value={this.state.category}
                onChange={this.onChangeItemCategory}
                className="my-1 mr-sm-2"
                custom
              >
                <option value="0">Choose...</option>
                <option value="pantry">Pantry</option>
                <option value="oils">Oils & Vinegars</option>
                <option value="condiments">
                  Condiments, Butters & Spreads
                </option>
              </Form.Control>
            </Form.Group>
           

            <Button variant="danger" size="lg" block="block" type="submit">
              Add Room
            </Button>
          </Form>
        </div>
      </>
    );
  }
}