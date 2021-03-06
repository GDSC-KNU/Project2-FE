import React, { useState } from "react";
import SideNavigation from "../SideNavigation";

type Props = {
  editLink: (newcate: string) => void;
};

const SideNavigationContainer = ({ editLink }: Props) => {
  const [selected, setSelected] = useState("all");

  const setCategory = (category: string) => {
    setSelected(category);
    editLink(category);
  };

  return <SideNavigation selected={selected} setCategory={setCategory} />;
};

export default SideNavigationContainer;
