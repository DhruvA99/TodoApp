import React from "react";
import {} from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { auth } from "../../redux/actions/actionCreator";
import { connect } from "react-redux";

const style = (theme) => ({
  paper: {
    marginTop: theme.spacing(10),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },

  form: {
    width: "100%",
    margin: "10px",
  },
  avatar: {
    margin: theme.spacing(2),
    backgroundColor: theme.palette.secondary.main,
  },
});

class Signup extends React.Component {
  state = {
    form: {
      username: {
        value: "",
        valid: true,
      },
      email: {
        value: "",
        valid: true,
      },
      password: {
        value: "",
        valid: true,
      },
    },
  };

  onSubmitHandler = (e) => {
    e.preventDefault();
    this.props.auth(
      this.state.form.email.value,
      this.state.form.password.value
    );
  };

  onChangeHandler = (e) => {
    const newForm = {
      ...this.state.form,
      [e.target.name]: {
        ...this.state.form[e.target.name],
        value: [e.target.value],
      },
    };
    this.setState({ form: newForm });
  };
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5">Sign Up</Typography>
        <form className={classes.form} onSubmit={this.onSubmitHandler}>
          <Grid>
            <Grid item xs={12}>
              <TextField
                type="text"
                value={this.state.form.username.value}
                name="username"
                label="UserName"
                margin="normal"
                onChange={this.onChangeHandler}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                type="text"
                value={this.state.form.email.value}
                name="email"
                label="Email"
                margin="normal"
                onChange={this.onChangeHandler}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                type="password"
                label="Password"
                value={this.state.form.password.value}
                margin="normal"
                name="password"
                onChange={this.onChangeHandler}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                className={classes.submit}
                type="submit"
                variant="contained"
                color="primary"
              >
                Sign Up
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  auth: (email, password) => {
    dispatch(auth(email, password));
  },
});

export default connect(null, mapDispatchToProps)(withStyles(style)(Signup));
