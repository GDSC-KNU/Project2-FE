import React from "react";
import { getCommentType } from "../../../../typedef/common/common.types";
import "./css/CommentScrollView.css";

type Props = {
  content: getCommentType;
};

const CommentBlock = ({ content }: Props) => {
  return (
    <>
      <div className="comment-box">
        <div className="comment-user">{content.owner}</div>
        <div className="comment">{content.content}</div>
      </div>
    </>
  );
};

export default CommentBlock;
