import React from "react";
import { Routes, Route } from "react-router";
import PopUp from "../../components/common/PopUp/PopUp";
import HeaderContainer from "../../components/Header/containers/HeaderContainer";
import ScrollViewContainer from "../../components/ScrollView/containers/ScrollViewContainer";
import SideBoardContainer from "../../components/SideBoard/containers/SideBoardContainer";
import SideNavigationContainer from "../../components/SideNavigation/containers/SideNavigationContainer";
import { getBlockType, PopUpTypes } from "../../typedef/common/common.types";

type Props = {
  popUp: PopUpTypes;
  getBlocks: () => Promise<getBlockType[]>;
  scrollLoading: boolean;
  setScrollLoading: React.Dispatch<React.SetStateAction<boolean>>;
  searchContent: string;
  setSearchContent: React.Dispatch<React.SetStateAction<string>>;
};

const MainNavigation = ({
  popUp,
  getBlocks,
  scrollLoading,
  setScrollLoading,
  searchContent,
  setSearchContent,
}: Props) => {
  return (
    <div>
      <HeaderContainer setSearchContent={setSearchContent} />
      <div
        style={{ display: "flex", gap: "12px", padding: "12px 12px 0 12px" }}
      >
        <SideNavigationContainer
          getBlocks={getBlocks}
          setScrollLoading={setScrollLoading}
        />
        <div style={{ flex: "3", display: "flex", gap: "12px" }}>
          <Routes>
            <Route
              path="/home"
              element={
                <ScrollViewContainer
                  getBlocks={getBlocks}
                  searchContent={searchContent}
                  scrollLoading={scrollLoading}
                />
              }
            />
          </Routes>
          <SideBoardContainer />
        </div>
      </div>
      {popUp.isShown && <PopUp child={popUp.popUp} />}
    </div>
  );
};

export default MainNavigation;
