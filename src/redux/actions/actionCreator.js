import * as actionTypes from "./actionTypes";
import axios from "axios";

export const addItemSuccess = (data) => ({
  type: actionTypes.ADD_ITEM_SUCCESS,
  payload: data,
});

export const addItemFail = (err) => ({
  type: actionTypes.ADD_ITEM_FAIL,
  payload: err,
});

export const addItemStart = () => ({
  type: actionTypes.ADD_ITEM_START,
});

export const updateItem = (token, userId) => (dispatch) => {
  dispatch(addItemStart());
  const queryParams =
    "?auth=" + token + '&orderBy="userId"&equalTo="' + userId + '"';
  axios
    .get("https://todo-list-b0f5e.firebaseio.com/lists.json" + queryParams)
    .then((res) => {
      const newList = [];
      for (let key in res.data) {
        newList.push({
          todoId: key,
          ...res.data[key],
        });
      }

      dispatch(addItemSuccess(newList));
    })
    .catch((err) => {
      dispatch(addItemFail(err));
    });
};

export const addItems = (data) => (dispatch) => {
  const updData = {
    id: new Date().getTime(),
    title: data.title,
    description: data.description,
    userId: data.userId,
  };
  const Token = localStorage.getItem("token");
  axios
    .post(
      "https://todo-list-b0f5e.firebaseio.com/lists.json?auth=" + Token,
      updData
    )
    .then(() => {
      dispatch(updateItem(Token, data.userId));
    })
    .catch((err) => {
      console.log(err.message);
    });
};

export const deleteItem = (listId, token) => (dispatch) => {
  axios
    .delete(
      "https://todo-list-b0f5e.firebaseio.com/lists/" +
        listId +
        ".json?auth=" +
        token
    )
    .then((res) => {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");
      dispatch(updateItem(token, userId));
    })
    .catch((err) => {
      console.log(err);
    });
};

export const authStart = () => ({
  type: actionTypes.AUTH_START,
});

export const authSuccess = (token, userId) => ({
  type: actionTypes.AUTH_SUCCESS,
  token: token,
  userId: userId,
});

export const authFail = (error) => ({
  type: actionTypes.AUTH_FAIL,
  payload: error,
});

export const auth = (email, password) => (dispatch) => {
  dispatch(authStart());
  const data = {
    email: email,
    password: password,
    returnSecureToken: true,
  };
  axios
    .post(
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCdhV8WffWDaeAi3mO2egvhdW4OfzsDXiU",
      data
    )
    .then()
    .catch((err) => console.log(err));
};

export const authLogin = (email, password) => (dispatch) => {
  const authData = {
    email: email,
    password: password,
    returnSecureToken: true,
  };
  dispatch(authStart());
  axios
    .post(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCdhV8WffWDaeAi3mO2egvhdW4OfzsDXiU",
      authData
    )
    .then((res) => {
      const expDate = new Date(
        new Date().getTime() + res.data.expiresIn * 1000
      );
      localStorage.setItem("token", res.data.idToken);
      localStorage.setItem("expirationDate", expDate);
      localStorage.setItem("userId", res.data.localId);
      dispatch(authSuccess(res.data.idToken, res.data.localId));
      dispatch(checkTimeOut(res.data.expiresIn));
    })
    .catch((err) => {
      dispatch(authFail(err.message));
    });
};
export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("userId");
  localStorage.removeItem("expirationDate");
  return {
    type: actionTypes.LOG_OUT,
  };
};

export const checkTimeOut = (expTime) => (dispatch) => {
  setTimeout(() => {
    dispatch(logout());
  }, expTime * 1000);
};

export const authCheckState = () => (dispatch) => {
  const token = localStorage.getItem("token");
  if (!token) {
    dispatch(logout());
    return false;
  } else {
    const expDate = new Date(localStorage.getItem("expirationDate"));
    if (expDate >= new Date()) {
      const userId = localStorage.getItem("userId");
      dispatch(authSuccess(token, userId));
      dispatch(checkTimeOut((expDate.getTime() - new Date().getTime()) / 1000));
      return true;
    } else {
      dispatch(logout());
      return false;
    }
  }
};
