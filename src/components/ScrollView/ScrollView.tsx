import React from "react";
import "./css/scrollView.css";
import BlockContainer from "./containers/BlockContainer";
import images from "../../assets/images";
import InfiniteScroll from "../common/InfiniteScroll/InfiniteScroll";
import { getBlockType } from "../../typedef/common/common.types";

type Props = {
  next: string | null;
  itemList: getBlockType[];
  addItemList: () => Promise<void>;
  loadPopUp: React.MouseEventHandler<HTMLButtonElement>;
  scrollLoading: boolean;
};

const ScrollView = ({
  next,
  itemList,
  addItemList,
  loadPopUp,
  scrollLoading,
}: Props) => {
  return (
    <section className="wrapper">
      <button className="write-btn" onClick={loadPopUp}>
        <img className="icon" src={images.pencil} alt="작성" />
      </button>
      <div className="scroll-view-wrap">
        {scrollLoading ? null : (
          <InfiniteScroll
            block={
              <BlockContainer
                content={{
                  id: 0,
                  owner: "",
                  category: "",
                  image: null,
                  createdAt: "",
                  updatedAt: "",
                  content: "",
                  likeCount: 0,
                  votedIndex: 0,
                  voteText: "",
                  voteTotal: 0,
                  currentUser: "",
                }}
              />
            }
            blockProps={itemList}
            addItemList={addItemList}
            end={!next}
          />
        )}
      </div>
    </section>
  );
};

export default ScrollView;
