import {
  FETCHED_ALL_COURSES,
  CREATED_COURSE,
  REMOVE_NEW_COURSEID,
} from "./course.types";

const initialState = {
  courses: [],
  coursesPagination: {},
  newCourseId: null,
};

export const course = (state = initialState, action) => {
  switch (action.type) {
    case FETCHED_ALL_COURSES:
      const { totalPages, size, totalElements, content = [] } = action.courses;

      return {
        ...state,
        courses: content,
        coursesPagination: {
          totalPages: totalPages,
          itemsCountPerPage: size,
          totalItemsCount: totalElements,
        },
      };

    case CREATED_COURSE:
      return {
        ...state,
        newCourseId: action.course.id,
        courses: [...state.courses, action.course],
      };

    case REMOVE_NEW_COURSEID:
      return {
        ...state,
        newCourseId: null,
      };

    default: {
      return {
        ...state,
      };
    }
  }
};
