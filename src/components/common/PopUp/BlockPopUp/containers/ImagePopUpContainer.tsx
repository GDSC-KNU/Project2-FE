import React, { useCallback, useEffect, useState } from "react";
import usePopUp from "../../../../../hooks/usePopUp";
import ImagePopUp from "../ImagePopUp";

type Props = {
  image: string;
};

const ImagePopUpContainer = ({ image }: Props) => {
  const [focusImage, setFocusImage] = useState(image);
  const [imageRef, setImageRef] = useState(0);
  const { __hidePopUpFromHooks } = usePopUp();

  // const onload = useCallback(() => {
  //   const image = images[imageRef];
  //   setFocusImage(image);
  // }, [focusImage]);

  const onClose = useCallback(() => {
    __hidePopUpFromHooks();
  }, [__hidePopUpFromHooks]);

  // useEffect(() => {
  //   onload();
  // }, [imageRef]);

  return <ImagePopUp focusImage={focusImage} onClose={onClose} />;
};

export default ImagePopUpContainer;
