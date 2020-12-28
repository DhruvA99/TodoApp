import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import DialogContentText from "@material-ui/core/DialogContentText";
import TextField from "@material-ui/core/TextField";
import { connect } from "react-redux";
import { addItems } from "../../../redux/actions/actionCreator";
import Alert from "@material-ui/lab/Alert";

class AddTodoitem extends React.Component {
  state = {
    title: "",
    description: "",
    open: false,
    time: null,
    alert: null,
  };

  handleOpenClose = () => {
    this.setState((prevState) => {
      return { open: !prevState.open };
    });
  };

  onSubmitHandler = (e) => {
    if (this.state.title !== "" && this.state.description !== "") {
      this.handleOpenClose();
      e.preventDefault();
      this.setState({ alert: null });
      const data = {
        title: this.state.title,
        description: this.state.description,
        userId: this.props.userId,
      };
      this.props.addItem(data);
    } else {
      this.setState({
        alert: (
          <Alert severity="error">Title and Description cannot be empty!</Alert>
        ),
      });
    }
  };

  onChangeHandler = (e) => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div>
        <Fab onClick={this.handleOpenClose} color="secondary" aria-label="add">
          <AddIcon />
        </Fab>

        <Dialog
          open={this.state.open}
          onClose={this.handleOpenClose}
          aria-labelledby="form-dialog-title"
          fullWidth={true}
          maxWidth={"md"}
        >
          <DialogTitle id="form-dialog-title">Add todo</DialogTitle>
          <DialogContent>
            <DialogContentText>Title</DialogContentText>
            <TextField
              onChange={this.onChangeHandler}
              name="title"
              autoFocus
              margin="dense"
              id="title"
              label="Title"
              type="text"
              fullWidth
              autoComplete="off"
              required={true}
            />
          </DialogContent>
          <DialogContent>
            <DialogContentText>Description</DialogContentText>
            <TextField
              onChange={this.onChangeHandler}
              autoFocus
              name="description"
              margin="dense"
              id="description"
              label="Description"
              type="textArea"
              rows={3}
              fullWidth
              autoComplete="off"
              required={true}
            />
          </DialogContent>
          {/* <TextField
            style={{ alignSelf: "center", margin: "auto" }}
            id="date"
            label="Add the date"
            type="date"
            value={this.props.time}
            InputLabelProps={{
              shrink: true,
            }}
            required
            onChange={this.onDateChangeHandler}
          /> */}
          {this.state.alert}
          <DialogActions>
            <Button onClick={this.handleOpenClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.onSubmitHandler} color="primary">
              Add
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userId: state.auth.userId,
  token: state.auth.token,
  time: state.lis.time,
});

const mapDispatchToProps = (dispatch) => ({
  addItem: (data) => {
    dispatch(addItems(data));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(AddTodoitem);
