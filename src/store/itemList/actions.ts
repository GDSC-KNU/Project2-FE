import { getBlockType } from "../../typedef/common/common.types";
import { UPDATE_ITEMLIST, RESET_ITEMLIST } from "./modules/actionsTypes";

export const updateItemList = (payload: getBlockType[]) => ({
  type: UPDATE_ITEMLIST,
  payload,
});

export const resetItemList = () => ({
  type: RESET_ITEMLIST,
  payload: {},
});

export type ItemListAction =
  | ReturnType<typeof updateItemList>
  | ReturnType<typeof resetItemList>;
