import { createStore, combineReducers } from "redux";
import editorReducer from "../slices/editorSlice";
import authReducer from "../slices/authSlice";

const rootReducer = combineReducers({
  editor: editorReducer,
  auth: authReducer,
});

const store = createStore(rootReducer);

export type RootState = ReturnType<typeof rootReducer>;

export default store;