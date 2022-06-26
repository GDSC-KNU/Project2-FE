import React, { useState, useEffect, useCallback, ReactElement } from "react";
import ScrollView from "../ScrollView";
import { getBlockType } from "../../../typedef/common/common.types";
import usePopUp from "../../../hooks/usePopUp";
import WritePopUpContainer from "./WritePopUpContainer";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/rootReducer";
import { updateItemList } from "../../../store/itemList/actions";

type Props = {
  getBlocks: () => Promise<getBlockType[]>;
  searchContent: string;
  scrollLoading: boolean;
};

const ScrollViewContainer = ({
  getBlocks,
  searchContent,
  scrollLoading,
}: Props) => {
  const { __showPopUpFromHooks, __hidePopUpFromHooks } = usePopUp();
  const dispatch = useDispatch();
  const itemList = useSelector(
    (root: RootState) => root.itemListReducer.itemList
  );
  const next = useSelector((root: RootState) => root.nextReducer.next);

  const closePopUp = useCallback(() => {
    __hidePopUpFromHooks();
  }, []);

  const loadPopUp = useCallback(() => {
    __showPopUpFromHooks(<WritePopUpContainer closePopUp={closePopUp} />);
  }, []);

  const addItemList = async () => {
    const blocks = await getBlocks();
    console.log("blocks", blocks);
    dispatch(updateItemList([...itemList, ...blocks]));
  };

  return (
    <ScrollView
      next={next}
      itemList={itemList}
      addItemList={addItemList}
      loadPopUp={loadPopUp}
      scrollLoading={scrollLoading}
      searchContent={searchContent}
    />
  );
};

export default ScrollViewContainer;
