import React from "react";
import images from "../../../assets/images";
import { ImageType, VoteType } from "../../../typedef/common/common.types";
import "./css/WritePopUp.css";

type Props = {
  closePopUp: React.MouseEventHandler<HTMLButtonElement>;
  formInfo: any;
  addVote: React.MouseEventHandler<HTMLButtonElement>;
  changeVoteInput: any;
  removeVote: any;
  addImg: (e: React.ChangeEvent<HTMLInputElement>) => void;
  removeImg: (e: any) => void;
  uploadBlock: React.FormEventHandler<HTMLFormElement>;
  onChangeCategory: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onChangeContent: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

const WritePopUp = ({
  closePopUp,
  formInfo,
  addVote,
  changeVoteInput,
  removeVote,
  addImg,
  removeImg,
  uploadBlock,
  onChangeCategory,
  onChangeContent,
}: Props) => {
  return (
    <form className="write-pop-up" onSubmit={uploadBlock}>
      <div className="pop-up-left">
        <div className="category-section">
          <select
            className="category"
            value={formInfo.category}
            onChange={onChangeCategory}
          >
            <option value="Love">연애</option>
            <option value="Travel">여행</option>
            <option value="Fashion">패션</option>
            <option value="Political">정치</option>
            <option value="Balance_Game">밸런스 게임</option>
            <option value="Free">마음대로</option>
          </select>
        </div>
        <textarea
          className="textarea"
          placeholder="내용을 입력하세요."
          value={formInfo.content}
          onChange={onChangeContent}
          required
        ></textarea>
      </div>
      <div className="pop-up-right">
        <div className="header">
          <button onClick={closePopUp}>
            <img className="icon" src={images.popupClose} alt="닫기" />
          </button>
        </div>
        <div className="info-area">
          <div className="title">투표 항목</div>
          <div className="vote-area">
            {formInfo.voteText.map((vote: VoteType, index: number) => (
              <div key={index} id={"vote" + index}>
                <input
                  className={
                    index > 1 ? "add-vote-input-box" : "vote-input-box"
                  }
                  value={vote.content}
                  onChange={changeVoteInput}
                  required
                />
                {index > 1 ? (
                  <button
                    className="vote-del-btn"
                    type="button"
                    onClick={removeVote}
                  >
                    삭제
                  </button>
                ) : null}
              </div>
            ))}
            {formInfo.voteText.length < 4 ? (
              <button type="button" className="more-btn" onClick={addVote}>
                +
              </button>
            ) : null}
          </div>
          <div className="title">이미지</div>
          <div className="image-area">
            {formInfo.image ? (
              <div className="img-preview" id={"image"}>
                <img
                  className="img-add-btn"
                  src={formInfo.image.imgBase64 as string}
                  alt="sampleImage"
                />
                <button
                  className="image-del-btn"
                  type="button"
                  onClick={removeImg}
                >
                  X
                </button>
              </div>
            ) : null}
            {!formInfo.image ? (
              <>
                <label htmlFor="temp-btn">
                  <div className="img-add-btn">+</div>
                </label>
                <input
                  id="temp-btn"
                  type="file"
                  className="img-input-box"
                  onChange={(e) => addImg(e)}
                />
              </>
            ) : null}
          </div>
        </div>
        <div className="write-btn-area">
          <button className="write-btn">
            <img className="icon" src={images.pencil} alt="작성" />
          </button>
        </div>
      </div>
    </form>
  );
};

export default WritePopUp;
