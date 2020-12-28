import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import ToDoList from "../../components/toDoList/toDoList";
import Container from "@material-ui/core/Container";
import AddToDoitem from "../../components/toDoList/addToDoitem/AddTodoitem";

const style = (theme) => ({
  dialog: {
    width: "100%",
  },
  root: {
    marginTop: "40px",
  },
});

class ToDoMain extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Container>
          <ToDoList />
          <AddToDoitem className={classes.dialog} />
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  lists: state.lis.lists,
});

export default connect(mapStateToProps, null)(withStyles(style)(ToDoMain));
