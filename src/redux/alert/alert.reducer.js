import {
  ERROR_MESSAGE,
  REMOVE_ERROR,
  SET_SUCCESS_MESSAGE,
  REMOVE_SUCCESS_MESSAGE
} from "../alert.types";

const initialState = {
  errorMessage: {
    error: false,
    message: ""
  },
  successMessage: {
    success: false,
    message: ""
  }
};

export const alertInfo = (state = initialState, action) => {
  switch (action.type) {
    case ERROR_MESSAGE: {
      return {
        ...state,
        errorMessage: {
          error: true,
          message: action.message
        }
      };
    }

    case REMOVE_ERROR: {
      return {
        ...state,
        errorMessage: {
          error: false,
          message: ""
        }
      };
    }

    case SET_SUCCESS_MESSAGE: {
      return {
        ...state,
        successMessage: {
          success: true,
          successMessage: action.message
        }
      };
    }

    case REMOVE_SUCCESS_MESSAGE: {
      return {
        ...state,
        successMessage: {
          success: false,
          successMessage: ""
        }
      };
    }
    default: {
      return state;
    }
  }
};
