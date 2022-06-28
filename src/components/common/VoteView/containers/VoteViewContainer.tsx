import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useAuth from "../../../../hooks/Auth/useAuth";
import useBlock from "../../../../hooks/useBlock";
import { apiOrigin, apiRoute, requestPost } from "../../../../lib/api/api";
import { updateItemList } from "../../../../store/itemList/actions";
import { RootState } from "../../../../store/rootReducer";
import {
  BasicAPIResponseType,
  getBlockType,
  VoteType,
} from "../../../../typedef/common/common.types";
import VoteView from "../VoteView";

type Props = {
  blockDetail: getBlockType;
};

const VoteViewContainer = ({ blockDetail }: Props) => {
  const { token } = useAuth();
  const { stringToVote } = useBlock();
  const dispatch = useDispatch();
  const itemList = useSelector(
    (root: RootState) => root.itemListReducer.itemList
  );

  const [block, setBlock] = useState<getBlockType>(blockDetail);

  const postVote = async (index: number) => {
    const formData = new FormData();

    formData.append("index", index.toString());

    const { data } = await requestPost<BasicAPIResponseType<string>>(
      `${apiOrigin}${apiRoute.board}/${block.id}${apiRoute.vote}`,
      {
        Authorization: `Bearer ${token}`,
      },
      formData
    );

    const newVoteList = stringToVote(data);
    let newVoteTotal = 0;
    newVoteList.map(({ count }: VoteType) => {
      newVoteTotal += count;
    });

    const changeItemList = itemList.map((item) => {
      if (item.id === block.id) {
        return {
          ...item,
          voteText: newVoteList,
          votedIndex: block.votedIndex === index ? -1 : index,
          voteTotal: newVoteTotal,
        };
      } else {
        return item;
      }
    });

    setBlock({
      ...block,
      voteText: newVoteList,
      votedIndex: block.votedIndex === index ? -1 : index,
      voteTotal: newVoteTotal,
    });
    dispatch(updateItemList(changeItemList));
  };

  useEffect(() => {
    const newBlock = itemList.find((block) => block.id === blockDetail.id);
    if (newBlock) setBlock(newBlock);
  }, [itemList]);

  return (
    <VoteView
      votedIndex={block.votedIndex}
      voteList={block.voteText as VoteType[]}
      voteTotal={block.voteTotal}
      postVote={postVote}
    />
  );
};

export default VoteViewContainer;
