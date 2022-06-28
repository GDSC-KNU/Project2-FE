import React from "react";
import { Routes, Route } from "react-router";
import PopUp from "../../components/common/PopUp/PopUp";
import HeaderContainer from "../../components/Header/containers/HeaderContainer";
import ScrollViewContainer from "../../components/ScrollView/containers/ScrollViewContainer";
import SideBoardContainer from "../../components/SideBoard/containers/SideBoardContainer";
import SideNavigationContainer from "../../components/SideNavigation/containers/SideNavigationContainer";
import { PopUpTypes } from "../../typedef/common/common.types";

type Props = {
  popUp: PopUpTypes;
  scrollLoading: boolean;
  setScrollLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

const MainNavigation = ({ popUp, scrollLoading, setScrollLoading }: Props) => {
  return (
    <>
      <HeaderContainer />
      <div
        style={{ display: "flex", gap: "12px", padding: "12px 12px 0 12px" }}
      >
        <SideNavigationContainer setScrollLoading={setScrollLoading} />
        <div style={{ flex: "3", display: "flex", gap: "12px" }}>
          <Routes>
            <Route
              path="/home"
              element={<ScrollViewContainer scrollLoading={scrollLoading} />}
            />
          </Routes>
          <SideBoardContainer />
        </div>
      </div>
      {popUp.isShown && <PopUp child={popUp.popUp} />}
    </>
  );
};

export default MainNavigation;
