import React, { Component } from "react";
import { connect } from "react-redux";
import { userActions } from "../redux/user/user.action";
import { roleActions } from "../redux/role/role.action";
import { withRouter } from "react-router-dom";
import User from "../components/users/user";
import { Grid, Box, makeStyles } from "@material-ui/core";
import Pagination from "react-js-pagination";
import UsersBar from "../components/users/usersBar";
import { SuccessMessage } from "../components/common/succesMessage";

class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activePage: 1,
      filter: ""
    };
    this.handlePageChange = this.handlePageChange.bind(this);
    this.setFilter = this.setFilter.bind(this);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(userActions.getUsers(this.state.activePage, this.state.filter));
    dispatch(roleActions.getRoles());
  }

  handlePageChange(pageNumber) {
    this.setState({ activePage: pageNumber });
    const { dispatch } = this.props;
    dispatch(userActions.getUsers(pageNumber, this.state.filter));
  }

  setFilter(filter) {
    this.setState({ filter: filter });
    const { dispatch } = this.props;
    dispatch(userActions.getUsers(1, filter));
  }

  render() {
    const { users = [] } = this.props;
    const { itemsCountPerPage, totalItemsCount } = this.props.usersPagination;

    return (
      <Grid container direction="column">
        <UsersBar setTerm={this.setFilter} />
        <Grid container direction="row">
          {users.map((user, i) => (
            <User
              key={i}
              name={user.name}
              lastname={user.lastname}
              email={user.email}
              photo={user.photo}
              id={user.id}
            />
          ))}
        </Grid>
        <Box className="d-flex justify-content-center">
          <Pagination
            hideNavigation
            activePage={this.state.activePage}
            itemsCountPerPage={itemsCountPerPage}
            totalItemsCount={totalItemsCount}
            pageRangeDisplayed={10}
            itemClass="page-item"
            linkClass="btn btn-light"
            onChange={this.handlePageChange}
          />
        </Box>
        {/* <SuccessMessage /> */}
      </Grid>
    );
  }
}

const mapStateToProps = state => {
  return {
    users: state.user.users,
    usersPagination: state.user.usersPagination
  };
};

const connectedUsersPage = withRouter(
  connect(mapStateToProps, null, null, {
    pure: false
  })(Users)
);

export { connectedUsersPage as Users };
