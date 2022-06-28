import React from "react";
import "./css/imagePopUp.css";
import images from "../../../../assets/images";

type Props = {
  focusImage: string;
  onClose: React.MouseEventHandler<HTMLButtonElement>;
};

const ImagePopUp = ({ focusImage, onClose }: Props) => {
  return (
    <div className="image-popup-wrap">
      <button className="close-button" onClick={onClose}>
        <img src={images.close} alt="close  " />
      </button>
      <div className="image-area">
        <img src={focusImage} alt="" />
      </div>
    </div>
  );
};

export default ImagePopUp;
