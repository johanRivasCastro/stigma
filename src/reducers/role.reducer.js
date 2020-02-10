const initialState = {
  roles: []
};

export const role = (state = initialState, action) => {
  switch (action.type) {
    case "FETCHED_ALL_ROLES": {
      return {
        ...state,
        roles: [...action.roles]
      };
    }
    default: {
      return state;
    }
  }
};
