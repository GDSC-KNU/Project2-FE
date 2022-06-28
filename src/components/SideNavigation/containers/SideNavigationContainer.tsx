import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { apiOrigin, apiRoute } from "../../../lib/api/api";
import { resetNext, updateNext } from "../../../store/next/actions";
import SideNavigation from "../SideNavigation";
import { RootState } from "../../../store/rootReducer";
import { getBlockType } from "../../../typedef/common/common.types";
import { updateItemList } from "../../../store/itemList/actions";
import {
  resetSearchContent,
  updateSearchContent,
} from "../../../store/searchContent/actions";
import useBlock from "../../../hooks/useBlock";

type Props = {
  setScrollLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

const SideNavigationContainer = ({ setScrollLoading }: Props) => {
  const [selected, setSelected] = useState("all");
  const { getBlocks } = useBlock();
  const dispatch = useDispatch();
  const next = useSelector((root: RootState) => root.nextReducer.next);

  const setCategory = (category: string) => {
    setSelected(category);

    if (category === "all") {
      dispatch(resetNext());
    } else {
      dispatch(
        updateNext(
          `${apiOrigin}${apiRoute.board}/category/${category}?limit=10&offset=0`
        )
      );
    }

    dispatch(resetSearchContent());
  };

  const setBlock = async () => {
    setScrollLoading(true);
    const blocks = await getBlocks();
    dispatch(updateItemList(blocks));
    setScrollLoading(false);
  };

  useEffect(() => {
    setBlock();
  }, [selected]);

  return <SideNavigation selected={selected} setCategory={setCategory} />;
};

export default SideNavigationContainer;
