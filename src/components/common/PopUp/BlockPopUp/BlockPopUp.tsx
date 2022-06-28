import React from "react";
import { getBlockType } from "../../../../typedef/common/common.types";
import "./css/BlockPopUp.css";
import CommentScrollViewContainer from "./containers/CommentScrollViewContainer";
import images from "../../../../assets/images";
import VoteViewContainer from "../../VoteView/containers/VoteViewContainer";

type Props = {
  blockDetail: getBlockType;
  closePopUp: React.MouseEventHandler<HTMLButtonElement>;
  picView: boolean;
  picViewToggle: React.MouseEventHandler<HTMLButtonElement>;
  image: string;
  commentRef: React.RefObject<HTMLTextAreaElement>;
  onWriteComment: React.MouseEventHandler<HTMLButtonElement>;
  comment: string;
  setComment: React.Dispatch<React.SetStateAction<string>>;
  onHandleHeight: React.FormEventHandler<HTMLTextAreaElement>;
  deleteBlock: (id: number) => Promise<void>;
  post: boolean;
  setPost: React.Dispatch<React.SetStateAction<boolean>>;
  loadWritePopUp: any;
};

const BlockPopUp = ({
  blockDetail,
  closePopUp,
  picView,
  picViewToggle,
  image,
  commentRef,
  onWriteComment,
  comment,
  setComment,
  onHandleHeight,
  deleteBlock,
  post,
  setPost,
  loadWritePopUp,
}: Props) => {
  return (
    <div className="block-pop-up-wrap">
      <div className="pop-up-left">
        <div className={!picView ? "content-view" : "hidden"}>
          <div className="user-area">
            <div className="user-profile">
              <img
                className="profile"
                src={images.defaultProfile}
                alt={blockDetail.owner}
              />
              <div>
                <div>{blockDetail.owner}</div>
                <div>{blockDetail.updatedAt}</div>
              </div>
            </div>
            {blockDetail.owner === blockDetail.currentUser ? (
              <div>
                <button
                  className="delete-btn"
                  onClick={() => deleteBlock(blockDetail.id)}
                >
                  삭제
                </button>
              </div>
            ) : null}
          </div>
          <div className="content-area">
            <div className="content">
              {blockDetail.content}
              <VoteViewContainer blockDetail={blockDetail} />
            </div>
          </div>
        </div>
        <div className={picView ? "picture-view" : "hidden"}>
          <button onClick={picViewToggle}>X</button>
          <img className="test" src={image} alt="sampleImage" />
        </div>
        <div className="etc-area">
          <div>
            {blockDetail.image !== null ? (
              <button className="img-btn" onClick={picViewToggle}>
                <img src={blockDetail.image} alt={blockDetail.image} />
              </button>
            ) : null}
          </div>
        </div>
      </div>
      <div className="pop-up-right">
        <div className="header">
          <button className="close-popup-button" onClick={closePopUp}>
            <img className="icon" src={images.closeLight} alt="닫기" />
          </button>
        </div>
        <div className="comment-container">
          <div className="comment-view-box">
            <CommentScrollViewContainer
              blockId={blockDetail.id}
              post={post}
              setPost={setPost}
            />
            <div className="comment-threshold"></div>
          </div>
          <form className="comment-write-box">
            <textarea
              className="comment-input"
              placeholder="댓글 추가..."
              ref={commentRef}
              onInput={onHandleHeight}
              onChange={(e) => setComment(e.target.value)}
              value={comment}
            />
            <div className="write-comment-box">
              <button
                type="submit"
                className="write-comment-button"
                onClick={(e) => onWriteComment(e)}
              >
                작성
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BlockPopUp;
