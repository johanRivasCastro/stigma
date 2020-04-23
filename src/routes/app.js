import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { UserLayout } from "../layouts/users/userLayout";
import { Users } from "../containers/Users";
import { SignIn } from "../login/signIn";
import { ResetPassword } from "../login/resetPassword";
import { Courses } from "../containers/courses";
import { CourseDetails } from "../components/courses/courseDetails/courseDetails";
import { requireAuth } from "../helpers";

const App = () => {
  return (
    <Router>
      <Switch>
        <UserLayout path="/users" component={requireAuth(Users)} />
        <UserLayout path="/courses" component={Courses} />
        <Route path="/resetPassword" component={ResetPassword} />
        <UserLayout
          exact
          path="/courseDetails/:courseId"
          component={(props) => {
            const {
              match: { params },
            } = props;
            return <CourseDetails courseId={params.courseId} />;
          }}
        />
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
