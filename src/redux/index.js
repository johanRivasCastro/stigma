import { combineReducers } from "redux";
import { user } from "./user/user.reducer";
import { role } from "./role/role.reducer";
import { authentication } from "./auth/auth.reducer";
import { alertInfo } from "./alert/alert.reducer";
import { course } from "./course/course.reducer";

const rootReducer = combineReducers({
  user,
  role,
  authentication,
  alertInfo,
  course
});

export default rootReducer;
