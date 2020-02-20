import { FETCHED_ALL_COURSES } from "./course.types";

const initialState = {
  courses: [],
  coursesPagination: {}
};

export const course = (state = initialState, action) => {
  switch (action.type) {
    case FETCHED_ALL_COURSES: {
      const { totalPages, size, totalElements, content } = action.courses;
      return {
        ...state,
        courses: content,
        coursesPagination: {
          totalPages: totalPages,
          itemsCountPerPage: size,
          totalItemsCount: totalElements
        }
      };
    }
    default: {
      return state;
    }
  }
};
