import { getBlockType, ItemListTypes } from "../../typedef/common/common.types";
import { ItemListAction } from "./actions";
import { UPDATE_ITEMLIST, RESET_ITEMLIST } from "./modules/actionsTypes";

export type ItemListState = ItemListTypes;

const initialState = {
  itemList: [],
};

const itemListReducer = (
  state: ItemListState = initialState,
  { type, payload }: ItemListAction
): ItemListState => {
  switch (type) {
    case UPDATE_ITEMLIST:
      return { itemList: payload as getBlockType[] };
    case RESET_ITEMLIST:
      return initialState;
    default:
      return state;
  }
};

export default itemListReducer;
