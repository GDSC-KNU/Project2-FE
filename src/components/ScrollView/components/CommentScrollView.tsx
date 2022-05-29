import React from "react";
import { getCommentType } from "../../../typedef/common/common.types";
import "./css/CommentScrollView.css";

type Props = {
  setTarget: React.LegacyRef<HTMLDivElement>;
  loading: boolean;
  commentItemList: getCommentType[];
  end: boolean;
};

const CommentScrollView = ({
  setTarget,
  loading,
  commentItemList,
  end,
}: Props) => {
  return (
    <div className="comment-scroll-view-wrap">
      {commentItemList.map((comment, index) => (
        <div key={index}>
          <div className="comment">{comment.content}</div>
          <div className="comment-info">{comment.owner}</div>
        </div>
      ))}
      {!end && !loading && (
        <div className="target" ref={setTarget}>
          Loading...
        </div>
      )}
    </div>
  );
};

export default CommentScrollView;
