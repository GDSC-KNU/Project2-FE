import { SearchContentTypes } from "../../typedef/common/common.types";
import { SearchContentAction } from "./actions";
import {
  UPDATE_SEARCH_CONTENT,
  RESET_SEARCH_CONTENT,
} from "./modules/actionsTypes";

export type SearchContentState = SearchContentTypes;

const initialState = {
  searchContent: "",
};

const searchContentReducer = (
  state: SearchContentState = initialState,
  { type, payload }: SearchContentAction
): SearchContentState => {
  switch (type) {
    case UPDATE_SEARCH_CONTENT:
      return { searchContent: payload };
    case RESET_SEARCH_CONTENT:
      return initialState;
    default:
      return state;
  }
};

export default searchContentReducer;
