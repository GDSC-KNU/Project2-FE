import React, { useState, useCallback } from "react";
import {
  BasicAPIResponseType,
  getBlockType,
} from "../../../typedef/common/common.types";
import Block from "../components/Block";
import usePopUp from "../../../hooks/usePopUp";
import ImagePopUpContainer from "../../common/BlockPopUp/containers/ImagePopUpContainer";
import { apiOrigin, apiRoute, requestGet } from "../../../lib/api/api";
import useAuth from "../../../hooks/Auth/useAuth";
import BlockPopUpContainer from "../../common/BlockPopUp/containers/BlockPopUpContainer";

type Props = {
  block: getBlockType;
};

const BlockContainer = ({ block }: Props) => {
  const { __showPopUpFromHooks, __hidePopUpFromHooks } = usePopUp();
  const [expand, setExpand] = useState(false);
  const { token } = useAuth();

  const stringToVote = (voteText: string) => {
    voteText = voteText.replace(/\\/gi, "");
    voteText = voteText.replace(/'/gi, '"');
    const votes = JSON.parse(voteText).map((vote: Array<string | number>) => {
      return { content: vote[0], count: vote[1] };
    });

    return votes;
  };

  const getBlockDetail = async (id: number) => {
    const { data } = await requestGet<BasicAPIResponseType<getBlockType>>(
      `${apiOrigin}${apiRoute.board}/${id}/`,
      {
        Authorization: `Bearer ${token}`,
      }
    );

    const blockDeatil = {
      ...data,
      updatedAt: data.updatedAt.split(".")[0].replace("T", " "),
      image: [data.image],
      voteText: stringToVote(data.voteText),
    };

    return blockDeatil;
  };

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

  const onClickImage = useCallback(
    (index: number) => {
      __showPopUpFromHooks(
        <ImagePopUpContainer images={block.image} index={index} />
      );
    },
    [__showPopUpFromHooks]
  );

  return (
    <Block
      block={block}
      loadPopUp={loadPopUp}
      onClickImage={onClickImage}
      expand={expand}
      reverseExpand={reverseExpand}
    />
  );
};

export default BlockContainer;
