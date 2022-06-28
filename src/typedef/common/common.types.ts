import React from "react";

export type BasicAPIResponseType<T> = {
  data: T;
  status: number;
  statusText: string;
  config: {
    url: string;
  };
  headers: object;
  request: object;
};

export type LoginTokenType = {
  refresh: string;
  access: string;
};

export type SignUpResponseType = {
  username: string;
  email: string;
  profile: {
    count: number;
    votedBoards: string;
    image: string;
  };
};

export type UserType = {
  username: string;
  email: string;
  profile: {
    count: 0;
    votedBoards: string;
    image: string;
  };
};

export type UserBoardType = {
  count: number;
  next: null;
  previous: null;
  results: {
    id: number;
    owner: string;
    category: string;
    image: string;
    createdAt: string;
    updatedAt: string;
    content: string;
    likeCount: number;
    votedIndex: number;
    voteText: string;
    voteTotal: number;
    currentUser: string;
  }[];
};

export type RemoveUserType = {
  result: string;
};

export type PropsType<T> = {
  name: string;
  con: string;
  char: T;
};

export type OtherType = {
  name: string;
  con: string;
  char: number;
};

export type PopUpTypes = {
  popUp: React.ReactNode;
  isShown: boolean;
};

export type NextTypes = {
  next: string | null;
};

export type ItemListTypes = {
  itemList: getBlockType[];
};

export type SearchContentTypes = {
  searchContent: string;
};

export type getBlockResponseType = {
  count: number;
  next: string;
  previous: string;
  results: getBlockType[];
};

export type getBlockType = {
  id: number;
  owner: string;
  category: string;
  image: string | null;
  createdAt: string;
  updatedAt: string;
  content: string;
  likeCount: number;
  votedIndex: number;
  voteText: string | VoteType[];
  voteTotal: number;
  currentUser: string;
};

export type postBlockType = {
  author: {
    nickname: string;
    profile: string;
  };
  category: string;
  content: string;
  images: string[];
};

export type postBlockResponseType = {
  id: number;
  owner: string;
  category: "Love" | "Travel" | "Hot";
  image: "string" | null;
  createdAt: string;
  updatedAt: string;
  content: "string";
  likeCount: number;
  votedIndex: number;
  voteText: "string";
  voteTotal: number;
  currentUser: "string";
};

export type getCommentResponseType = {
  count: number;
  next: string;
  previous: string;
  results: getCommentType[];
};

export type getCommentType = {
  boardId: number;
  owner: string;
  id: number;
  content: string;
};

export type VoteType = {
  content: string;
  count: number;
};

export type ImageType = {
  imgBase64: string | ArrayBuffer | null;
  imgFile: string | Blob | null;
};
