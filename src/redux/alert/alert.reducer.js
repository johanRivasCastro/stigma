const initialState = {
  errorMessage: {
    error: false,
    message: ""
  }
};

export const alertInfo = (state = initialState, action) => {
  switch (action.type) {
    case "ERROR_MESSAGE": {
      return {
        ...state,
        errorMessage: {
          error: true,
          message: action.message
        }
      };
    }

    case "REMOVE_ERROR": {
      return {
        ...state,
        errorMessage: {
          error: false,
          message: ""
        }
      };
    }
    default: {
      return state;
    }
  }
};
