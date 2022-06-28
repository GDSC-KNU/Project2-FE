import { useState } from "react";
import usePopUp from "../../hooks/usePopUp";
import MainNavigation from "../components/MainNavigation";

const MainNavigationContainer = () => {
  const { popUp } = usePopUp();
  const [scrollLoading, setScrollLoading] = useState(false);

  return (
    <MainNavigation
      popUp={popUp}
      scrollLoading={scrollLoading}
      setScrollLoading={setScrollLoading}
    />
  );
};

export default MainNavigationContainer;
