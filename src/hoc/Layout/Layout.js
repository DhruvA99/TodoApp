import React, { Component } from "react";
import ToolBar from "../../components/Navigation/ToolBar/ToolBar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";

class Layout extends Component {
  state = {
    drawerOpen: false,
  };
  onDrawerToggle = () => {
    this.setState((prevState) => {
      return {
        drawerOpen: !prevState.drawerOpen,
      };
    });
  };
  render() {
    return (
      <div>
        <SideDrawer
          drawerOpen={this.state.drawerOpen}
          drawerToggle={this.onDrawerToggle}
        />
        <ToolBar drawerToggle={this.onDrawerToggle} />
        {this.props.children}
      </div>
    );
  }
}

export default Layout;
