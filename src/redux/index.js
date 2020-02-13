import { combineReducers } from "redux";
import { user } from "./user/user.reducer";
import { role } from "./role/role.reducer";
import { authentication } from "./auth/auth.reducer";

const rootReducer = combineReducers({
  user,
  role,
  authentication
});

export default rootReducer;
