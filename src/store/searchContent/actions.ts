import {
  UPDATE_SEARCH_CONTENT,
  RESET_SEARCH_CONTENT,
} from "./modules/actionsTypes";

export const updateSearchContent = (payload: string) => ({
  type: UPDATE_SEARCH_CONTENT,
  payload,
});

export const resetSearchContent = () => ({
  type: RESET_SEARCH_CONTENT,
  payload: "",
});

export type SearchContentAction =
  | ReturnType<typeof updateSearchContent>
  | ReturnType<typeof resetSearchContent>;
