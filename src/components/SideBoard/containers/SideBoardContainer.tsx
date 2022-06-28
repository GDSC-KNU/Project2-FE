import React, { useCallback } from "react";
import useAuth from "../../../hooks/Auth/useAuth";
import useBlock from "../../../hooks/useBlock";
import usePopUp from "../../../hooks/usePopUp";
import BlockPopUpContainer from "../../common/PopUp/BlockPopUp/containers/BlockPopUpContainer";
import SideBoard from "../SideBoard";

const SideBoardContainer = () => {
  const { __showPopUpFromHooks, __hidePopUpFromHooks } = usePopUp();
  const { getBlockDetail } = useBlock();

  const loadPopUp = useCallback(async (id: number) => {
    const blockDetail = await getBlockDetail(id);

    __showPopUpFromHooks(
      <BlockPopUpContainer blockDetail={blockDetail} closePopUp={closePopUp} />
    );
  }, []);

  const closePopUp = useCallback(() => {
    __hidePopUpFromHooks();
  }, []);

  return <SideBoard loadPopUp={loadPopUp} />;
};

export default SideBoardContainer;
