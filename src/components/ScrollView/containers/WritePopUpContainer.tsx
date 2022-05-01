import React, { useCallback, useState, useEffect } from "react";
import WritePopUp from "../components/WritePopUp";

type Props = {
  closePopUp: React.MouseEventHandler<HTMLButtonElement>;
};

const WritePopUpContainer = ({ closePopUp }: Props) => {
  const [voteEnable, setVoteEnable] = useState(true);
  const [imgEnable, setImgEnable] = useState(true);
  const [input, setInput] = useState({ id: 0, value: "" });

  const changeInput = (id, e) => {
    setInput({ id: id, value: e.target.value });
  };

  const [votes, setVotes] = useState([
    {
      id: new Date().valueOf(),
      vote: "",
    },
    {
      id: new Date().valueOf() + 1,
      vote: "",
    },
  ]);

  const addVote = () => {
    setVotes([
      ...votes,
      {
        id: new Date().valueOf(),
        vote: "",
      },
    ]);
  };

  const removeVote = (id: any) => {
    setVotes(votes.filter((vote) => vote.id !== id));
  };

  const [imgs, setImgs] = useState<any | undefined>([]);

  const addImage = () => {
    setImgs([
      ...imgs,
      {
        id: new Date().valueOf(),
        img: "",
      },
    ]);
  };

  const removeImg = (id: any) => {
    setImgs(imgs.filter((img: any | undefined) => img.id !== id));
  };

  useEffect(() => {
    if (votes.length === 4) {
      setVoteEnable(false);
    } else if (votes.length === 3) {
      setVoteEnable(true);
    }
  }, [votes]);

  useEffect(() => {
    const findIndex = votes.findIndex((element) => element.id === input.id);
    let newVotes = [...votes];
    newVotes[findIndex] = { ...newVotes[findIndex], vote: input.value };
    setVotes(newVotes);
  }, [input]);

  useEffect(() => {
    if (imgs.length === 4) {
      setImgEnable(false);
    } else if (imgs.length === 3) {
      setImgEnable(true);
    }
  }, [imgs]);

  return (
    <WritePopUp
      closePopUp={closePopUp}
      changeInput={changeInput}
      votes={votes}
      addVote={addVote}
      voteEnable={voteEnable}
      removeVote={removeVote}
      imgs={imgs}
      addImg={addImage}
      imgEnable={imgEnable}
      removeImg={removeImg}
    />
  );
};

export default WritePopUpContainer;
