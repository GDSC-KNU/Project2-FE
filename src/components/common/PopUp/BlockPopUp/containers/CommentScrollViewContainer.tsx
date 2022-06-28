import React, { useState, useEffect } from "react";
import CommentScrollView from "../CommentScrollView";
import {
  BasicAPIResponseType,
  getCommentResponseType,
  getCommentType,
} from "../../../../../typedef/common/common.types";
import { apiOrigin, apiRoute, requestGet } from "../../../../../lib/api/api";

type Props = {
  blockId: number;
  post: boolean;
  setPost: React.Dispatch<React.SetStateAction<boolean>>;
};

const CommentScrollViewContainer = ({ blockId, post, setPost }: Props) => {
  const [next, setNext] = useState(
    `${apiOrigin}${apiRoute.board}/${blockId}${apiRoute.comment}?limit=10&offset=0`
  );
  const [end, setEnd] = useState(false);
  const [commentItemList, setCommentItemList] = useState<getCommentType[]>([]);

  const getComments = async () => {
    const { data } = await requestGet<
      BasicAPIResponseType<getCommentResponseType>
    >(next, {});

    if (data.next) {
      setNext(data.next);
    } else {
      setEnd(true);
    }

    return data.results;
  };

  const addComment = async () => {
    const comments = await getComments();
    setCommentItemList((commentItemList) => [...commentItemList, ...comments]);
  };

  const postRefreshComment = async () => {
    setCommentItemList([]);
    setNext(
      `${apiOrigin}${apiRoute.board}/${blockId}${apiRoute.comment}?limit=10&offset=0`
    );
    await addComment();
    setPost(false);
  };

  useEffect(() => {
    if (post) postRefreshComment();
  }, [post]);

  return (
    <CommentScrollView
      commentItemList={commentItemList}
      addComment={addComment}
      end={end}
    />
  );
};

export default CommentScrollViewContainer;
