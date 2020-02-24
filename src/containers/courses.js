import React, { Component } from "react";
import { connect } from "react-redux";
import { courseActions } from "../redux/course/course.action";

import { withRouter } from "react-router-dom";
import User from "../components/users/user";
import { Grid, Box, makeStyles } from "@material-ui/core";
import Pagination from "react-js-pagination";
import { Course } from "../components/courses/course";
import CoursesBar from "../components/courses/coursesBar";

class Courses extends Component {
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
    dispatch(
      courseActions.getCourses(this.state.activePage, this.state.filter)
    );
  }

  handlePageChange(pageNumber) {
    this.setState({ activePage: pageNumber });
    const { dispatch } = this.props;
    dispatch(courseActions.getCourses(pageNumber, this.state.filter));
  }

  setFilter(filter) {
    this.setState({ filter: filter });
    const { dispatch } = this.props;
    dispatch(courseActions.getCourses(1, filter));
  }

  render() {
    const { courses = [] } = this.props;
    const { itemsCountPerPage, totalItemsCount } = this.props.coursesPagination;
    return (
      <Grid container direction="column">
        <CoursesBar setTerm={this.setFilter} />
        <Grid container direction="row">
          {courses.map((course, i) => (
            <Course
              key={i}
              name={course.name}
              id={course.id}
              description={course.description}
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
      </Grid>
    );
  }
}

const mapStateToProps = state => {
  return {
    courses: state.course.courses,
    coursesPagination: state.course.coursesPagination
  };
};

const connectedUsersPage = withRouter(
  connect(mapStateToProps, null, null, {
    pure: false
  })(Courses)
);

export { connectedUsersPage as Courses };
