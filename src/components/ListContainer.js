import React from "react";
import { Jumbotron } from "reactstrap";
import ToDoList from "./toDoList";

class ListContainer extends React.Component {
  render() {
    return (
      <div>
        <Jumbotron>
          <ToDoList />
        </Jumbotron>
      </div>
    );
  }
}

export default ListContainer;
