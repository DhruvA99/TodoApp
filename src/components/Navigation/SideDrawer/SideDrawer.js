import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import { NavLink } from "react-router-dom";
import { logout } from "../../../redux/actions/actionCreator";
import { connect } from "react-redux";
import Logo from "../../UI/logo";

const styles = (theme) => ({
  list: {
    width: 200,
  },
  buttons: {
    padding: "20px",
  },
  logo: {
    padding: "0.3px",
    margin: theme.spacing(2),
  },
});

const sideDrawer = (props) => {
  const { classes } = props;
  return (
    <div>
      <Drawer open={props.drawerOpen} onClose={props.drawerToggle}>
        <List className={classes.list}>
          <div>
            <NavLink to="/">
              <Logo size="large" color="secondary" />
            </NavLink>
          </div>
          {!props.isAuthenticated ? (
            <div>
              <ListItem
                component={NavLink}
                to="/login"
                className={classes.buttons}
                button
              >
                LOGIN
              </ListItem>
              <ListItem
                component={NavLink}
                to="/signup"
                className={classes.buttons}
                button
              >
                SIGNUP
              </ListItem>
            </div>
          ) : (
            <div>
              <ListItem
                className={classes.buttons}
                button
                component={NavLink}
                to="/todo"
              >
                Todo List
              </ListItem>
              <ListItem
                className={classes.buttons}
                button
                onClick={props.logout}
              >
                Logout
              </ListItem>
            </div>
          )}
        </List>
      </Drawer>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.token !== null,
});

const mapDispatchToProps = (dispatch) => ({
  logout: () => {
    dispatch(logout());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(sideDrawer));
