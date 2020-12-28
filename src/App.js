import React, { useEffect } from "react";
import "./App.css";
import Layout from "./hoc/Layout/Layout";
import { Route, Switch } from "react-router-dom";
import Home from "./container/Home/Home";
import TodoMain from "./container/ToDoMain/ToDoMain";
import Login from "./container/AuthorizationPages/Login";
import Signup from "./container/AuthorizationPages/Signup";
import { connect } from "react-redux";
import { authCheckState } from "./redux/actions/actionCreator";

function App(props) {
  let route = null;
  useEffect(() => {
    props.checkAuth();
  }, []);
  if (props.isAuthenticated) {
    route = (
      <Switch>
        <Route
          path="/"
          exact
          render={(props) => <Home message="" {...props} />}
        />
        <Route
          path="/todo"
          render={(props) => <TodoMain message="" {...props} />}
        />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
      </Switch>
    );
  } else {
    route = (
      <Switch>
        <Route
          path="/todo"
          render={(props) => <Home message="Please sign in" {...props} />}
        />
        <Route
          path="/"
          exact
          render={(props) => <Home message="" {...props} />}
        />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
      </Switch>
    );
  }

  return (
    <div className="App">
      <Layout>{route}</Layout>
    </div>
  );
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.token !== null,
});

const mapDispatchToProps = (dispatch) => ({
  checkAuth: () => {
    dispatch(authCheckState());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
