import {
  FETCH_ALL_SUBJECTS,
  CREATE_SUBJECT,
  EDITED_SUBJECT,
  DELETE_SUBJECT,
} from "./subject.types";
import { ERROR_MESSAGE, SUCCESS_MESSAGE } from "../alert.types";

import { call } from "../../helpers";

const endPoint = "subjects";

const getSubjects = () => async (dispatch) => {
  try {
    const { data } = await call("get", endPoint);
    dispatch({
      type: FETCH_ALL_SUBJECTS,
      subjects: data,
    });
  } catch (error) {}
};

const createSubject = (subject) => async (dispatch) => {
  try {
    const { data } = await call("post", endPoint, subject);
    dispatch({
      type: CREATE_SUBJECT,
      subject: data,
    });
    dispatch(showSuccessMessage("Subject successfully created !"));
  } catch (err) {
    dispatch(showErrorMessage(err.message));
  }
};

const deleteSubject = (id) => async (dispatch) => {
  try {
    await call("delete", `${endPoint}/${id}`);
    dispatch({
      type: DELETE_SUBJECT,
      deleted: id,
    });
  } catch (error) {
    dispatch(showErrorMessage(error.message));
  }
};

const editSubject = (subject) => async (dispatch) => {
  try {
    const { data } = await call("put", endPoint, subject);
    dispatch({
      type: EDITED_SUBJECT,
      subject: data,
    });
    dispatch(showSuccessMessage("Subject successfully edited !"));
  } catch (error) {
    dispatch(showErrorMessage(error.message));
  }
};

const showErrorMessage = (message) => {
  return {
    type: ERROR_MESSAGE,
    message: message,
  };
};

const showSuccessMessage = (message) => {
  return {
    type: SUCCESS_MESSAGE,
    message: message,
  };
};

export const subjectActions = {
  getSubjects,
  createSubject,
  deleteSubject,
  editSubject,
};
