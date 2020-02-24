import { FETCHED_ALL_COURSES, CREATED_COURSE } from "./course.types";

const initialState = {
  courses: [],
  coursesPagination: {}
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
          totalItemsCount: totalElements
        }
      };

    case CREATED_COURSE:
      return {
        ...state,
        courses: [...state.courses, action.course]
      };

    default: {
      return {
        ...state
      };
    }
  }
};
