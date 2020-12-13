import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import MenuIcon from "@material-ui/icons/Menu";
import IconButton from "@material-ui/core/IconButton";
import { connect } from "react-redux";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { NavLink } from "react-router-dom";
import Logo from "../../UI/logo";
import { logout } from "../../../redux/actions/actionCreator";
import { withStyles } from "@material-ui/core/styles";

const styles = (theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  title: {
    flexGrow: 1,
    textAlign: "left",
    [theme.breakpoints.down("sm")]: {
      textAlign: "right",
    },
  },
  buttons: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
});

const ToolBar = (props) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    props.logout();
    setAnchorEl(null);
  };

  const { classes } = props;
  return (
    <AppBar position="sticky">
      <Toolbar>
        <IconButton className={classes.menuButton} onClick={props.drawerToggle}>
          <MenuIcon />
        </IconButton>

        <div className={classes.title}>
          <NavLink to="/">
            <Logo size="large" color="secondary" />
          </NavLink>
        </div>

        {!props.isAuthenticated ? (
          <div className={classes.buttons}>
            <Button color="inherit" component={NavLink} to="/login">
              Login
            </Button>
            <Button color="inherit" component={NavLink} to="/signup">
              Sign-Up
            </Button>
          </div>
        ) : (
          <div className={classes.buttons}>
            <IconButton
              aria-label="account of current user"
              color="inherit"
              onClick={handleClick}
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
            <Button color="inherit" component={NavLink} to="/todo">
              ToDo List
            </Button>
          </div>
        )}
      </Toolbar>
    </AppBar>
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
)(withStyles(styles)(ToolBar));
