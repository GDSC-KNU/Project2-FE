import React from "react";

type Props = {
  isVote: boolean;
};

const VoteView = ({ isVote }: Props) => {
  console.log(isVote);
  return isVote ? (
    <div className="vote-view">
      <button className="vote-box">VOTE1</button>
      <button className="vote-box">VOTE2</button>
      <div>1920명 참가</div>
    </div>
  ) : (
    <div className="vote-view">hello</div>
  );
};

export default VoteView;