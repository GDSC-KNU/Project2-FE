import { UPDATE_NEXT, RESET_NEXT } from "./modules/actionsTypes";

export const updateNext = (payload: string) => ({
  type: UPDATE_NEXT,
  payload,
});

export const resetNext = () => ({
  type: RESET_NEXT,
  payload: null,
});

export type NextAction =
  | ReturnType<typeof updateNext>
  | ReturnType<typeof resetNext>;
