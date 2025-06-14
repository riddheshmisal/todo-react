import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import {
  Container,
  Row,
  Col,
  Button,
  InputGroup,
  FormControl,
  ListGroup,
} from "react-bootstrap";

class App extends Component {
  state = {
    userInput: "",
    list: [],
  };

  updateInput = (value) => {
    this.setState({ userInput: value });
  };

  addItem = () => {
    const { userInput, list } = this.state;

    if (userInput.trim() === "") return;

    const newItem = {
      id: Math.random(),
      value: userInput.trim(),
    };

    this.setState({
      list: [...list, newItem],
      userInput: "",
    });
  };

  deleteItem = (id) => {
    const updatedList = this.state.list.filter((item) => item.id !== id);
    this.setState({ list: updatedList });
  };

  editItem = (index) => {
    const editedValue = prompt("Edit the todo:");
    if (editedValue && editedValue.trim() !== "") {
      const updatedList = [...this.state.list];
      updatedList[index].value = editedValue.trim();
      this.setState({ list: updatedList });
    }
  };

  renderListItems = () =>
    this.state.list.map((item, index) => (
      <ListGroup.Item
        key={item.id}
        variant="dark"
        action
        className="d-flex justify-content-between align-items-center"
      >
        {item.value}
        <span>
          <Button
            variant="light"
            size="sm"
            className="me-2"
            onClick={() => this.editItem(index)}
          >
            Edit
          </Button>
          <Button
            variant="light"
            size="sm"
            onClick={() => this.deleteItem(item.id)}
          >
            Delete
          </Button>
        </span>
      </ListGroup.Item>
    ));

  render() {
    return (
      <Container className="pt-5">
        <Row>
          <Col>
            <h1 className="todo-title text-center text-black mb-4">
              📝 My Bootstrap To-Do List
            </h1>
          </Col>
        </Row>

        <Row className="justify-content-center mb-4">
          <Col md={6}>
            <InputGroup>
              <FormControl
                placeholder="Add item..."
                size="lg"
                value={this.state.userInput}
                onChange={(e) => this.updateInput(e.target.value)}
              />
              <Button variant="dark" onClick={this.addItem}>
                ADD
              </Button>
            </InputGroup>
          </Col>
        </Row>

        <Row className="justify-content-center">
          <Col md={6}>
            <ListGroup>{this.renderListItems()}</ListGroup>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default App;
