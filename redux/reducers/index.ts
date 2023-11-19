import { boardReducer } from "./boardReducer";
import { combineReducers } from "redux";
import { userReducer } from "./userReducer";
import { workspaceReducer } from "./workspaceReducer";

const rootReducer = combineReducers({
    user: userReducer,
    board: boardReducer,
    workspaces: workspaceReducer
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;