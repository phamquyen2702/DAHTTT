import { configureStore } from "@reduxjs/toolkit";
import useReducer from "./reducers/userSlice";
import subjectReducer from "./reducers/subjectSlice";
import classReducer from "./reducers/classSlice";

const rootReducer = {
  user: useReducer,
  subject: subjectReducer,
  class: classReducer,
};

const store = configureStore({
  reducer: rootReducer,
});
export default store;
