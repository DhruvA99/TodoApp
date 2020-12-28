import React from "react";
import ToDo from "./toDo/toDo";
import { connect } from "react-redux";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { updateItem, deleteItem } from "../../redux/actions/actionCreator";

class toDoList extends React.Component {
  componentDidMount() {
    this.props.updateList(this.props.token, this.props.userId);
  }
  deleteHandler = (todoId) => {
    this.props.deleteitem(todoId, this.props.token);
  };
  onChangeHandler = () => {};

  render() {
    let newList = null;
    if (this.props.loading) {
      newList = <p>Loading....</p>;
    } else {
      const updList = [...this.props.lists];
      if (updList && updList.length) {
        newList = (
          <div>
            <Typography gutterBottom>
              <Box fontSize="h5.fontSize">{this.props.time}</Box>
            </Typography>
            {/* <TextField
              id="date"
              label="Date"
              type="date"
              value={this.props.time}
              defaultValue={this.props.time}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={this.onChangeHandler}
            /> */}
            <br />
            {updList
              .slice(0)
              .reverse()
              .map((item, index) => {
                return (
                  <ToDo
                    key={index}
                    title={item.title}
                    description={item.description}
                    todoId={item.todoId}
                    deleteClick={this.deleteHandler}
                  />
                );
              })}
          </div>
        );
      } else {
        newList = <p>Empty List!</p>;
      }
    }

    return <div>{newList}</div>;
  }
}

const mapStateToProps = (state) => ({
  lists: state.lis.lists,
  loading: state.lis.loading,
  token: state.auth.token,
  userId: state.auth.userId,
  time: state.lis.time,
});
const mapDispatchToProps = (dispatch) => ({
  updateList: (token, userId) => {
    dispatch(updateItem(token, userId));
  },
  deleteitem: (todoId, token) => {
    dispatch(deleteItem(todoId, token));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(toDoList);
