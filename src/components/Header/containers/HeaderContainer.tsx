import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/Auth/useAuth";
import usePopUp from "../../../hooks/usePopUp";
import useRootRoute from "../../../hooks/useRootRoute";
import { RootState } from "../../../store/rootReducer";
import { updateSearchContent } from "../../../store/searchContent/actions";
import Header from "../Header";
import UserBoardContainer from "./UserBoardContainer";
import UserInfoContainer from "./UserInfoContainer";

const HeaderContainer = () => {
  const [isDropDown, setIsDropDown] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const searchString = useSelector(
    (root: RootState) => root.searchContentReducer.searchContent
  );
  const { __updateRootFromHooks } = useRootRoute();
  const { __showPopUpFromHooks } = usePopUp();
  const { clearAccess } = useAuth();

  const onProfileClick = useCallback(() => {
    setIsDropDown((prev) => !prev);
  }, [isDropDown]);

  const onSearch = useCallback(() => {
    dispatch(updateSearchContent(searchInput));
  }, [searchInput]);

  const goSearch = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") dispatch(updateSearchContent(searchInput));
  };

  const onUserInfo = useCallback(() => {
    __showPopUpFromHooks(<UserInfoContainer />);
  }, [__showPopUpFromHooks]);

  const onSignOut = useCallback(() => {
    const response = window.confirm("로그아웃 하시겠습니까?");
    if (response) {
      setTimeout(function () {
        window.location.reload();
        sessionStorage.setItem("@route", "login");
        clearAccess();
        __updateRootFromHooks("login");
      }, 500);
    }
  }, [navigate, sessionStorage, clearAccess, __updateRootFromHooks]);

  const onUserBoards = useCallback(() => {
    __showPopUpFromHooks(<UserBoardContainer />);
  }, [__showPopUpFromHooks]);

  useEffect(() => {
    setSearchInput(searchString);
  }, [searchString]);

  return (
    <Header
      isDropDown={isDropDown}
      onProfileClick={onProfileClick}
      onSearch={onSearch}
      goSearch={goSearch}
      searchInput={searchInput}
      setSearchInput={setSearchInput}
      onUserInfo={onUserInfo}
      onUserBoards={onUserBoards}
      onSignOut={onSignOut}
    />
  );
};

export default HeaderContainer;
