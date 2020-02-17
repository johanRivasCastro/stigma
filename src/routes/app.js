import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch
} from "react-router-dom";
import UserLayout from "../layouts/userLayout";
import { Users } from "../containers/Users";
import { SignIn } from "../login/signIn";

const App = () => {
  return (
    <Router>
      <Switch>
        <UserLayout path="/users" component={Users} />
        <Route path="/" component={SignIn} />

        {/* <UserLayout
         exact
         path="/manager/editUser/:id"
         roles={[Role.manager]}
         component={props => {
           const {
             match: { params }
           } = props;
           return <EditUser id={params.id} />;
         }}
        /> */}
      </Switch>
    </Router>
  );
};

export default App;
