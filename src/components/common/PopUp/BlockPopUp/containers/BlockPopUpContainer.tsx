import React, { useCallback, useState } from "react";
import BlockPopUp from "../BlockPopUp";
import {
  BasicAPIResponseType,
  getBlockType,
  LoginTokenType,
} from "../../../../../typedef/common/common.types";
import {
  apiOrigin,
  apiRoute,
  requestDelete,
  requestPost,
} from "../../../../../lib/api/api";
import useAuth from "../../../../../hooks/Auth/useAuth";
import usePopUp from "../../../../../hooks/usePopUp";
import WritePopUpContainer from "../../../../ScrollView/containers/WritePopUpContainer";

type Props = {
  blockDetail: getBlockType;
  closePopUp: React.MouseEventHandler<HTMLButtonElement>;
};

const BlockPopUpContainer = ({ blockDetail, closePopUp }: Props) => {
  const { token } = useAuth();
  const { __showPopUpFromHooks } = usePopUp();

  const [picView, setPicView] = useState(false);
  const [image, setImage] = useState<string>("");
  const [comment, setComment] = useState("");
  const [post, setPost] = useState(false);

  const commentRef = React.useRef<HTMLTextAreaElement>(null);
  const picViewToggle = (event: any) => {
    if (event.target.tagName === "IMG") {
      setImage(event.target.src);
      setPicView(true);
    } else {
      setPicView(false);
    }
  };

  const onHandleHeight = useCallback(() => {
    if (commentRef.current && commentRef.current.scrollHeight < 305) {
      commentRef.current.style.height = "auto";
      commentRef.current.style.height = commentRef.current.scrollHeight + "px";
    }
  }, []);

  const deleteBlock = useCallback(async (id: number) => {
    const response = window.confirm("삭제하시겠습니까?");
    if (response) {
      const { data } = await requestDelete<
        BasicAPIResponseType<LoginTokenType>
      >(`${apiOrigin}${apiRoute.board}/${id}/`, {
        Authorization: `Bearer ${token}`,
      });

      window.location.replace("/home");
    }
  }, []);

  const onWriteComment = useCallback(
    async (e) => {
      e.preventDefault();
      const { data } = await requestPost<BasicAPIResponseType<any>>(
        apiOrigin + apiRoute.comment,
        {
          Authorization: `Bearer ${token}`,
        },
        {
          content: comment,
          boardId: blockDetail.id,
        }
      );
      setPost(true);
      setComment("");
    },
    [comment]
  );

  const loadWritePopUp = useCallback(() => {
    __showPopUpFromHooks(
      <WritePopUpContainer block={blockDetail} closePopUp={closePopUp} />
    );
  }, []);

  return (
    <BlockPopUp
      blockDetail={blockDetail}
      closePopUp={closePopUp}
      picView={picView}
      picViewToggle={picViewToggle}
      image={image}
      onWriteComment={onWriteComment}
      commentRef={commentRef}
      onHandleHeight={onHandleHeight}
      comment={comment}
      setComment={setComment}
      deleteBlock={deleteBlock}
      post={post}
      setPost={setPost}
      loadWritePopUp={loadWritePopUp}
    />
  );
};

export default BlockPopUpContainer;
