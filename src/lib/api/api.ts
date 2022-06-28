import axios, { AxiosError } from "axios";

//메인배너
// export const apiOrigin = "http://3.39.167.118:8000";
export const apiOrigin = "http://localhost:8000";

export const apiRoute = {
  board: "/boards",
  comment: "/comments/",
  user: "/users",
  categoty: "/category",
  vote: "/vote/",
  login: "/api/token/",
  register: "/register/",
  mine: "/boards/mine/",
  recently_voted: "/recently_voted/",
  hot: "/hot/",
  current_user: "/users/current/",
  delete_user: "/delete/",
};

export function requestGet<T>(url: string, header: object) {
  return new Promise<T>((resolve, reject) => {
    axios
      .get(url, {
        headers: {
          "Content-Type": "application/json",
          ...header,
        },
      })
      .then((res) => {
        console.log(res);
        const returnVal = { ...res } as unknown;
        resolve(returnVal as T);
      })
      .catch((error: AxiosError) => {
        console.error(error.response?.data);
        console.error(error.response?.status);
        reject(error);
      });
  });
}

export function requestDelete<T>(url: string, header: object) {
  return new Promise<T>((resolve, reject) => {
    axios
      .delete(url, {
        headers: {
          "Content-Type": "application/json",
          ...header,
        },
      })
      .then((res) => {
        console.log(res);
        const returnVal = { ...res } as unknown;
        resolve(returnVal as T);
      })
      .catch((error: AxiosError) => {
        console.error(error.response?.data);
        console.error(error.response?.status);
        reject(error);
      });
  });
}

export function requestPost<T>(url: string, header: object, body: object) {
  return new Promise<T>((resolve, reject) => {
    axios
      .post(url, body, {
        headers: {
          "Content-Type": "application/json",
          ...header,
        },
      })
      .then((res) => {
        console.log(res);
        const returnVal = { ...res } as unknown;
        resolve(returnVal as T);
      })
      .catch((error: AxiosError) => {
        console.error(error.response?.data);
        console.error(error.response?.status);
        reject(error);
      });
  });
}

export function requestPut<T>(url: string, header: object, body: object) {
  return new Promise<T>((resolve, reject) => {
    axios
      .put(url, body, {
        headers: {
          "Content-Type": "application/json",
          ...header,
        },
      })
      .then((res) => {
        const returnVal = { ...res } as unknown;
        resolve(returnVal as T);
      })
      .catch((error: AxiosError) => {
        console.error(error.response?.data);
        console.error(error.response?.status);
        reject(error);
      });
  });
}

export function requestFormPost<T>(
  url: string,
  header: object,
  form: FormData
) {
  return new Promise<T>((resolve, reject) => {
    axios
      .post(url, form, {
        headers: {
          "Content-Type": "multipart/form-data",
          ...header,
        },
      })
      .then((res) => {
        console.log(res);
        const returnVal = { ...res } as unknown;
        resolve(returnVal as T);
      })
      .catch((error: AxiosError) => {
        console.error(error.response?.data);
        console.error(error.response?.status);
        reject(error);
      });
  });
}

export function requestFormPut<T>(url: string, header: object, form: FormData) {
  return new Promise<T>((resolve, reject) => {
    axios
      .put(url, form, {
        headers: {
          "Content-Type": "multipart/form-data",
          ...header,
        },
      })
      .then((res) => {
        const returnVal = { ...res } as unknown;
        resolve(returnVal as T);
      })
      .catch((error: AxiosError) => {
        console.error(error.response?.data);
        console.error(error.response?.status);
        reject(error);
      });
  });
}

export function requestFormPatch<T>(
  url: string,
  header: object,
  form: FormData
) {
  return new Promise<T>((resolve, reject) => {
    axios
      .patch(url, form, {
        headers: {
          "Content-Type": "multipart/form-data",
          ...header,
        },
      })
      .then((res) => {
        const returnVal = { ...res } as unknown;
        resolve(returnVal as T);
      })
      .catch((error: AxiosError) => {
        console.error(error.response?.data);
        console.error(error.response?.status);
        reject(error);
      });
  });
}

export function requestUrlParamsPost<T>(
  url: string,
  header: object,
  params: URLSearchParams
) {
  return new Promise<T>((resolve, reject) => {
    axios
      .post(url, params, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          ...header,
        },
      })
      .then((res) => {
        const returnVal = { ...res } as unknown;
        resolve(returnVal as T);
      })
      .catch((error: AxiosError) => {
        console.error(error.response?.data);
        console.error(error.response?.status);
        reject(error);
      });
  });
}
