import {
  FETCH_ALL_SUBJECTS,
  CREATE_SUBJECT,
  DELETE_SUBJECT,
  EDITED_SUBJECT,
} from "./subject.types";

const initialState = {
  subjects: [],
};

export const subject = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ALL_SUBJECTS: {
      return {
        ...state,
        subjects: [...action.subjects],
      };
    }

    case CREATE_SUBJECT: {
      return {
        ...state,
        subjects: [...state.subjects, action.subject],
      };
    }
    case DELETE_SUBJECT: {
      const subjects = state.subjects.filter((subject) => {
        return subject.id !== action.deleted;
      });
      return {
        ...state,
        subjects: subjects,
      };
    }
    case EDITED_SUBJECT: {
      const index = state.subjects
        .map(function (e) {
          return e.id;
        })
        .indexOf(action.subject.id);
      state.subjects[index] = { ...state.subjects[index], ...action.subject };
      return {
        ...state,
        subjects: [...state.subjects],
      };
    }
    default: {
      return state;
    }
  }
};
