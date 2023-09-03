import { combineReducers } from "redux";

import {
  SetCurrentUserReducer, SetSystemVariableReducer
} from "./reducers";

const reducers = combineReducers({
  CurrentUser: SetCurrentUserReducer,
  SystemVariables:SetSystemVariableReducer,
  
});
export default reducers;
