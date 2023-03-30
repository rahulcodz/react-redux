import { combineReducers } from "redux";
import TestReducer from "../reducer/TestReducers";

const reducers = combineReducers({
  Test: TestReducer,
  //other reducers come here...
});

export default reducers;
