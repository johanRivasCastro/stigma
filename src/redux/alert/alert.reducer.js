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
    default: {
      return state;
    }
  }
};
