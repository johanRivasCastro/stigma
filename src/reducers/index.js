import { combineReducers } from "redux";
import { user } from "./user.reducer";
import { role } from "./role.reducer";

const rootReducer = combineReducers({
  user,
  role
});

export default rootReducer;
