import { getCommentType } from "../../../../typedef/common/common.types";
import InfiniteScroll from "../../InfiniteScroll/InfiniteScroll";
import CommentBlock from "./CommentBlock";
import "./css/CommentScrollView.css";

type Props = {
  commentItemList: getCommentType[];
  addComment: () => Promise<void>;
  end: boolean;
};

const CommentScrollView = ({ commentItemList, addComment, end }: Props) => {
  return (
    <div className="comment-scroll-view-wrap">
      <InfiniteScroll
        block={
          <CommentBlock
            content={{
              boardId: 0,
              owner: "",
              id: 0,
              content: "",
            }}
          />
        }
        blockProps={commentItemList}
        addItemList={addComment}
        end={end}
      />
    </div>
  );
};

export default CommentScrollView;
