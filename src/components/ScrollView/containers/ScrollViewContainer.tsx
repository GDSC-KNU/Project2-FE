import React, { useState, useEffect, useCallback, ReactElement } from "react";
import ScrollView from "../ScrollView";
import { getBlockType } from "../../../typedef/common/common.types";
import usePopUp from "../../../hooks/usePopUp";
import WritePopUpContainer from "./WritePopUpContainer";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/rootReducer";
import { updateItemList } from "../../../store/itemList/actions";
import useBlock from "../../../hooks/useBlock";

type Props = {
  scrollLoading: boolean;
};

const ScrollViewContainer = ({ scrollLoading }: Props) => {
  const { __showPopUpFromHooks, __hidePopUpFromHooks } = usePopUp();
  const { getBlocks } = useBlock();
  const dispatch = useDispatch();
  const itemList = useSelector(
    (root: RootState) => root.itemListReducer.itemList
  );
  const next = useSelector((root: RootState) => root.nextReducer.next);
  const searchString = useSelector(
    (root: RootState) => root.searchContentReducer.searchContent
  );

  const [blockList, setBlockList] = useState<getBlockType[]>(itemList);

  const closePopUp = useCallback(() => {
    __hidePopUpFromHooks();
  }, []);

  const loadPopUp = useCallback(() => {
    __showPopUpFromHooks(<WritePopUpContainer closePopUp={closePopUp} />);
  }, []);

  const addItemList = async () => {
    const items = await getBlocks();
    dispatch(updateItemList([...itemList, ...items]));
  };

  useEffect(() => {
    if (searchString.length > 0) {
      const newBlockList = itemList.filter((item) => {
        if (item.content.includes(searchString)) return item;
      });

      setBlockList(newBlockList);
    } else {
      setBlockList(itemList);
    }
  }, [searchString, itemList]);

  return (
    <ScrollView
      next={next}
      itemList={blockList}
      addItemList={addItemList}
      loadPopUp={loadPopUp}
      scrollLoading={scrollLoading}
    />
  );
};

export default ScrollViewContainer;
