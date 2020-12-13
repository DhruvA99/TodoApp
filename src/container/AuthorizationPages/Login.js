import React, { Component } from "react";
import { connect } from "react-redux";
import TextField from "@material-ui/core/TextField";
import { Grid } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import { authLogin } from "../../redux/actions/actionCreator";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { Redirect } from "react-router-dom";

const style = (theme) => ({
  paper: {
    marginTop: theme.spacing(10),
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
  },
  form: {
    width: "100%",
    margin: "10px",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  guestLogin: {
    margin: theme.spacing(3, 0, 2),
    color: "white",
    backgroundColor: "#446fc7",
    "&:hover": {
      backgroundColor: "#304e8c",
    },
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
});

class Login extends Component {
  state = {
    form: {
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

  onChangeHandler = (e) => {
    const newForm = {
      ...this.state.form,
      [e.target.name]: {
        ...this.state.form[e.target.name],
        value: e.target.value,
      },
    };
    this.setState({ form: newForm });
  };
  onSubmitHandler = (e) => {
    e.preventDefault();
    this.props.authLogin(
      this.state.form.email.value,
      this.state.form.password.value
    );
  };

  onGuestLogin = (e) => {
    e.preventDefault();
    this.props.authLogin("test@test.com", "test12345");
  };

  render() {
    const { classes } = this.props;
    let Form = null;
    if (this.props.isAuthenticated) {
      Form = <Redirect to="/todo" />;
    } else {
      Form = (
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} onSubmit={this.onSubmitHandler}>
            <Grid container>
              <Grid item xs={12}>
                <TextField
                  id="standard-required"
                  name="email"
                  type="email"
                  label="Email"
                  margin="normal"
                  autoFocus
                  value={this.state.form.email.value}
                  onChange={this.onChangeHandler}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="standard-password-input"
                  type="password"
                  label="Password"
                  name="password"
                  margin="normal"
                  autoFocus
                  value={this.state.form.password.value}
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
                  Sign In
                </Button>
              </Grid>
            </Grid>
          </form>
          <div>
            <br />
            <Typography>To Sign in as Guest</Typography>
            <Button onClick={this.onGuestLogin} className={classes.guestLogin}>
              GuestLogin
            </Button>
          </div>
        </div>
      );
    }
    return <div>{Form}</div>;
  }
}

const mapStateToProps = (state) => ({
  loading: state.auth.loading,
  isAuthenticated: state.auth.token !== null,
});

const mapDispatchToProps = (dispatch) => {
  return {
    authLogin: (email, password) => {
      dispatch(authLogin(email, password));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(style)(Login));
