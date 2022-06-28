import React, { useState, useCallback } from "react";
import { getBlockType } from "../../../typedef/common/common.types";
import Block from "../components/Block";
import usePopUp from "../../../hooks/usePopUp";
import ImagePopUpContainer from "../../common/PopUp/BlockPopUp/containers/ImagePopUpContainer";
import BlockPopUpContainer from "../../common/PopUp/BlockPopUp/containers/BlockPopUpContainer";
import useBlock from "../../../hooks/useBlock";

type Props = {
  content: getBlockType;
};

const BlockContainer = ({ content }: Props) => {
  const { __showPopUpFromHooks, __hidePopUpFromHooks } = usePopUp();
  const { getBlockDetail } = useBlock();

  const [expand, setExpand] = useState(false);

  const loadPopUp = useCallback(async (id: number) => {
    const blockDetail = await getBlockDetail(id);
    __showPopUpFromHooks(
      <BlockPopUpContainer blockDetail={blockDetail} closePopUp={closePopUp} />
    );
  }, []);

  const closePopUp = useCallback(() => {
    __hidePopUpFromHooks();
  }, []);

  const reverseExpand = useCallback(() => {
    setExpand((current) => !current);
  }, []);

  const onClickImage = useCallback(() => {
    __showPopUpFromHooks(<ImagePopUpContainer image={content.image!} />);
  }, [__showPopUpFromHooks]);

  return (
    <Block
      block={content}
      loadPopUp={loadPopUp}
      onClickImage={onClickImage}
      expand={expand}
      reverseExpand={reverseExpand}
    />
  );
};

export default BlockContainer;
