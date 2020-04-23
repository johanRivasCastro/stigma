import React from "react";
import { connect } from "react-redux";
import { session } from "../helpers";

export function requireAuth(ComposedComponent, roles) {
  class Authenticate extends React.Component {
    componentWillMount() {
      console.log(this.props.loggedIn);
      if (!this.props.loggedIn) {
        this.props.history.push("/login");
        return;
      }

      this.validateRoles();
    }

    componentWillUpdate(nextProps) {
      if (!nextProps.loggedIn) {
        this.props.history.push("/login");
        return;
      }
    }

    validateRoles() {
      if (Object.entries(this.props.currentUser).length > 0) {
        if (
          this.props.currentUser.roles.find((role) => {
            return role.authority === "ROLE_pino";
          })
        ) {
          this.props.history.push("/resetPassword");
        }
      }
    }

    render() {
      return <ComposedComponent {...this.props} />;
    }
  }

  const mapStateToProps = (state) => {
    return {
      loggedIn: state.authentication.loggedIn,
      currentUser: state.authentication.currentUser,
    };
  };

  return connect(mapStateToProps)(Authenticate);
}
