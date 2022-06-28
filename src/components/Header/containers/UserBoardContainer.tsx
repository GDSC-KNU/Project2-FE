import React, { useCallback, useEffect, useState } from "react";
import useAuth from "../../../hooks/Auth/useAuth";
import useBlock from "../../../hooks/useBlock";
import usePopUp from "../../../hooks/usePopUp";
import { apiOrigin, apiRoute, requestGet } from "../../../lib/api/api";
import {
  BasicAPIResponseType,
  getBlockType,
  UserBoardType,
} from "../../../typedef/common/common.types";
import BlockPopUpContainer from "../../common/PopUp/BlockPopUp/containers/BlockPopUpContainer";
import UserBoard from "../components/UserBoard";

const UserBoardContainer = () => {
  const { token } = useAuth();
  const { __showPopUpFromHooks, __hidePopUpFromHooks } = usePopUp();
  const { stringToVote } = useBlock();
  const [boards, setBoards] = useState<UserBoardType>({
    count: 0,
    next: null,
    previous: null,
    results: [
      {
        id: 0,
        owner: "",
        category: "",
        image: "",
        createdAt: "",
        updatedAt: "",
        content: "",
        likeCount: 0,
        votedIndex: 0,
        voteText: "",
        voteTotal: 0,
        currentUser: "",
      },
    ],
  });

  const onload = useCallback(async () => {
    const { data } = await requestGet<BasicAPIResponseType<UserBoardType>>(
      apiOrigin + apiRoute.mine,
      {
        Authorization: `Bearer ${token}`,
      }
    );
    if (data) {
      const newBoard = data.results.map((item) => {
        return {
          ...item,
          createdAt: item.updatedAt.split(".")[0].replace("T", " "),
          updatedAt: item.updatedAt.split(".")[0].replace("T", " "),
        };
      });

      setBoards({ ...data, results: newBoard });
    }
  }, []);

  const getBlockDetail = useCallback(
    async (blockData: getBlockType) => {
      const blockDetail = {
        ...blockData,
        updatedAt: blockData.updatedAt.split(".")[0].replace("T", " "),
        voteText: stringToVote(blockData.voteText as string),
      };
      __showPopUpFromHooks(
        <BlockPopUpContainer
          blockDetail={blockDetail}
          closePopUp={closePopUp}
        />
      );
    },
    [__showPopUpFromHooks]
  );

  const closePopUp = useCallback(() => {
    __hidePopUpFromHooks();
  }, [__hidePopUpFromHooks]);

  useEffect(() => {
    onload();
  }, []);

  return <UserBoard boards={boards} getBlockDetail={getBlockDetail} />;
};

export default UserBoardContainer;
