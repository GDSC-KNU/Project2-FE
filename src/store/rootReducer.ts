import { combineReducers } from "redux";
import popUpReducer from "./popUp/reducers";
import rootRouteReducer from "./routes/rootRoute/reducers";
import nextReducer from "./next/reducers";
import itemListReducer from "./itemList/reducers";
import searchContentReducer from "./searchContent/reducers";

const rootReducer = combineReducers({
  rootRouteReducer,
  popUpReducer,
  nextReducer,
  itemListReducer,
  searchContentReducer,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
