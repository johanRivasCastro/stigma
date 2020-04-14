import { FETCHED_ALL_COURSES, CREATED_COURSE } from "./course.types";
import { ERROR_MESSAGE } from "../alert.types";
import { call } from "../../helpers";

const endPoint = "courses/";

const getCourses = (page, term = "") => async (dispatch) => {
  try {
    const { data } = await call(
      "get",
      `${endPoint}?pageNo=${page - 1}&pageSize=${15}&filterBy=${term}`
    );
    dispatch({
      type: FETCHED_ALL_COURSES,
      courses: data,
    });
  } catch (error) {}
};

const createCourse = (course) => async (dispatch) => {
  try {
    const { data } = await call("post", `${endPoint}`, course);
    dispatch({
      type: CREATED_COURSE,
      course: data,
    });
  } catch (error) {
    dispatch(showErrorMessage(error.message));
  }
};

const getCourseById = (courseId) => async (dispatch) => {
  try {
    const { data } = await call("get", `${endPoint}/${courseId}`);
    return data;
  } catch (error) {
    dispatch(showErrorMessage(error.message));
  }
};

const showErrorMessage = (message) => {
  return {
    type: ERROR_MESSAGE,
    message: message,
  };
};

export const courseActions = {
  getCourses,
  createCourse,
  getCourseById,
};
