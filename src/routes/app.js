import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch
} from "react-router-dom";
import UserLayout from "../layouts/userLayout";
import { Users } from "../containers/Users";
import signIn from "../layouts/signIn";

const App = () => {
  return (
    <Router>
      <Switch>
        {/* <Route path="/" component={signIn} /> */}
        <UserLayout path="/" component={Users} />
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
