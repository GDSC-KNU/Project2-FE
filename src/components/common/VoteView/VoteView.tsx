import "./css/VoteView.css";
import { VoteType } from "../../../typedef/common/common.types";
import ProgressBar from "./ProgressBar";

type Props = {
  votedIndex: number;
  voteList: VoteType[];
  voteTotal: number;
  postVote: (index: number) => Promise<void>;
};

const VoteView = ({ votedIndex, voteList, voteTotal, postVote }: Props) => {
  return (
    <div className="vote-view">
      {votedIndex >= 0
        ? voteList.map((vote, index) => (
            <div className="vote-box" key={index}>
              <button onClick={() => postVote(index)}>
                <div className="vote-text">
                  <div>{vote.content}</div>
                  <div>{Math.round((vote.count / voteTotal) * 100)}%</div>
                </div>
              </button>
              <ProgressBar
                bgcolor={
                  votedIndex === index ? "orange" : "rgba(146, 146, 146, 0.35)"
                }
                progress={Math.round((vote.count / voteTotal) * 100)}
                content={vote.content}
              />
            </div>
          ))
        : voteList.map((vote, index) => (
            <button
              className="vote-box isvote-false"
              key={index}
              onClick={() => postVote(index)}
            >
              {vote.content}
            </button>
          ))}
      <div className="vote-count">{voteTotal}명 참가</div>
    </div>
  );
};

export default VoteView;
