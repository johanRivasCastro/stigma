import { courseService } from "./course.service";
import { FETCHED_ALL_COURSES, CREATED_COURSE } from "./course.types";
import { ERROR_MESSAGE } from "../alert.types";

const endPoint = "courses/";

const getCourses = (page, term = "") => dispatch => {
  courseService
    .get(`${endPoint}?pageNo=${page - 1}&pageSize=${15}&filterBy=${term}`)
    .then(res => {
      dispatch({
        type: FETCHED_ALL_COURSES,
        courses: res.data
      });
    });
};

const createCourse = course => dispatch => {
  courseService.post(`${endPoint}`, course).then(res => {
    if (!res.successful) {
      dispatch(showErrorMessage(res.errorMessage));
    } else {
      dispatch({
        type: CREATED_COURSE,
        course: res.data
      });
    }
  });
};

const getCourseById = courseId => dispatch => {
  courseService.getById(`${endPoint}/${courseId}`).then(res => {
    if (res.successful) {
      return res.data;
    } else {
      dispatch(showErrorMessage(res.errorMessage));
    }
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
