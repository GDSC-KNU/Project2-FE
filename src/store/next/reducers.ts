import { apiOrigin, apiRoute } from "../../lib/api/api";
import { NextTypes } from "../../typedef/common/common.types";
import { NextAction } from "./actions";
import { RESET_NEXT, UPDATE_NEXT } from "./modules/actionsTypes";

export type NextState = NextTypes;

const initialState = {
  next: `${apiOrigin}${apiRoute.board}?limit=10&offset=0`,
};

const nextReducer = (
  state: NextState = initialState,
  { type, payload }: NextAction
): NextState => {
  switch (type) {
    case UPDATE_NEXT:
      return { next: payload as string };
    case RESET_NEXT:
      return initialState;
    default:
      return state;
  }
};

export default nextReducer;
