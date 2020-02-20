import { courseService } from "./course.service";
import { FETCHED_ALL_COURSES } from "./course.types";

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

export const courseActions = {
  getCourses
};
