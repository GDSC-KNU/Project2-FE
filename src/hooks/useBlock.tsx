import { useDispatch, useSelector } from "react-redux";
import { apiOrigin, apiRoute, requestGet } from "../lib/api/api";
import { updateNext } from "../store/next/actions";
import { RootState } from "../store/rootReducer";
import {
  BasicAPIResponseType,
  getBlockResponseType,
  getBlockType,
} from "../typedef/common/common.types";
import useAuth from "./Auth/useAuth";

export default function useBlock() {
  const { token } = useAuth();
  const dispatch = useDispatch();
  const next = useSelector((root: RootState) => root.nextReducer.next);

  const stringToVote = (voteText: string) => {
    voteText = voteText.replace(/\\/gi, "");
    voteText = voteText.replace(/'/gi, '"');
    const votes = JSON.parse(voteText).map((vote: Array<string | number>) => {
      return { content: vote[0], count: vote[1] };
    });

    return votes;
  };

  const getBlocks = async () => {
    const { data } = await requestGet<
      BasicAPIResponseType<getBlockResponseType>
    >(next!, {
      Authorization: `Bearer ${token}`,
    });

    const blocks = data.results.map((block) => {
      return (block = {
        ...block,
        updatedAt: block.updatedAt.split(".")[0].replace("T", " "),
        voteText: stringToVote(block.voteText as string),
      });
    });

    dispatch(updateNext(data.next));

    return blocks;
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
      voteText: stringToVote(data.voteText as string),
    };

    return blockDeatil;
  };

  return { getBlocks, getBlockDetail, stringToVote };
}
