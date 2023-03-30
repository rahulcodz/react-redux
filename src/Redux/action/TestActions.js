import axios from "axios";

export const getData = () => {
  return (dispatch) => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        dispatch({ type: "GET_DATA", payload: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export function getUsers(activeNum, name, order, title) {
  const url = new URL("https://64101e4be1212d9cc92a0def.mockapi.io/user");

  if (name) {
    url.searchParams.append("name", name);
  }
  //Pagination

  url.searchParams.append("limit", 10);
  url.searchParams.append("page", activeNum);
  // console.log(activeNum, "activeNum in action");

  //sorting

  if (title) {
    url.searchParams.append("sortBy", title);
    url.searchParams.append("order", "asc");
  }
  if (order) {
    url.searchParams.append("sortBy", "name");
    url.searchParams.append("order", order);
  }
  // url.searchParams.append("sortBy", title);
  // url.searchParams.append("order", order);
  // console.log(title, "title");

  return (dispatch) => {
    dispatch({
      type: "GET_USERS_SUCCESS",
      payload: true,
    });
    axios
      .get(url)
      .then((response) => {
        dispatch({ type: "GET_USERS", payload: response.data });
        dispatch({
          type: "GET_USERS_SUCCESS",
          payload: false,
        });
      })
      .catch((error) => {
        dispatch({
          type: "GET_USERS_ERROR",
          message: "There was an error submitting the form. Please try again.",
        });
      });
  };
}

export const getUserById = (id) => {
  return (dispatch) => {
    dispatch({
      type: "GET_USERS_SUCCESS",
      payload: true,
    });
    axios
      .get(`https://64101e4be1212d9cc92a0def.mockapi.io/user/${id}`)
      .then((response) => {
        dispatch({ type: "GET_SINGLE_USER", payload: response.data });
        dispatch({
          type: "GET_USERS_SUCCESS",
          payload: false,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const postUser = (item) => (dispatch) => {
  dispatch({
    type: "GET_USERS_SUCCESS",
    payload: true,
  });
  axios
    .post("https://64101e4be1212d9cc92a0def.mockapi.io/user", item)
    .then((response) => {
      dispatch({ type: "POST_USER", payload: response.data });
      dispatch({
        type: "POST_USER_SUCCESS",
        payload: "User Added Suceessfully!",
      });
      dispatch({
        type: "GET_USERS_SUCCESS",
        payload: false,
      });
    })
    .catch((error) => {
      dispatch({
        type: "POST_USER_ERROR",
        payload: error,
      });
    });
};

export const updateUser = (item, id) => (dispatch) => {
  dispatch({
    type: "GET_USERS_SUCCESS",
    payload: true,
  });
  axios
    .put(`https://64101e4be1212d9cc92a0def.mockapi.io/user/${id}`, item)
    .then((response) => {
      dispatch({
        type: "UPDATE_USER",
        payload: response.data,
      });
      dispatch({
        type: "UPDATE_USER_SUCCESS",
        payload: "User Added Suceessfully!",
      });
      dispatch({
        type: "GET_USERS_SUCCESS",
        payload: false,
      });
    })
    .catch((error) => {
      dispatch({
        type: "UPDATE_USER_ERROR",
        payload: error,
      });
    });
};

export const deleteUser = (id) => {
  return (dispatch) => {
    dispatch({ type: "DELETE_USER" });
    dispatch({
      type: "GET_USERS_SUCCESS",
      payload: true,
    });
    axios
      .delete(`https://64101e4be1212d9cc92a0def.mockapi.io/user/${id}`)
      .then(() => {
        dispatch({
          type: "DELETE_USER_SUCCESS",
        });
        dispatch({
          type: "GET_USERS_SUCCESS",
          payload: false,
        });
      })
      .catch((error) => dispatch({ type: "DELETE_USER_FAILURE", error }));
  };
};

export const toastAction = (value) => {
  return (dispatch) => {
    dispatch({
      type: "TOAST_ACTION",
      payload: value,
    });
  };
};
