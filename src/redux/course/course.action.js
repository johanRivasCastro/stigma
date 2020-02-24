import { courseService } from "./course.service";
import { FETCHED_ALL_COURSES, CREATED_COURSE } from "./course.types";
import { ERROR_MESSAGE } from "../alert.types";

const endPoint = "courses/";

const getCourses = (page, term = "") => dispatch => {
  courseService
    .get(`${endPoint}?pageNo=${page - 1}&pageSize=${15}&filterBy=${term}`)
    .then(courses => {
      dispatch({
        type: FETCHED_ALL_COURSES,
        courses: courses
      });
    });
};

const createCourse = course => dispatch => {
  courseService.post(`${endPoint}`, course).then(response => {
    if (response.status !== 201) {
      dispatch(showErrorMessage("There is allready a course with this name"));
    } else {
      const { data } = response;
      dispatch({
        type: CREATED_COURSE,
        course: data
      });
    }
  });
};

const getCourseById = courseId => dispatch => {
  courseService.getById(`${endPoint}/${courseId}`).then(course => {
    return course;
  });
};

const showErrorMessage = message => {
  return {
    type: ERROR_MESSAGE,
    message: message
  };
};

export const courseActions = {
  getCourses,
  createCourse,
  getCourseById
};
