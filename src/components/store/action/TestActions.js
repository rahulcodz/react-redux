import axios from "axios";

export const getUsers = () => {
  return (dispatch) => {
    axios
      .get("https://64101e4be1212d9cc92a0def.mockapi.io/user")
      .then((response) => {
        dispatch({ type: "GET_USERS", payload: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const getUserById = (id) => {
  return (dispatch) => {
    axios
      .get(`https://64101e4be1212d9cc92a0def.mockapi.io/user/${id}`)
      .then((response) => {
        dispatch({ type: "GET_SINGLE_USER", payload: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const postUser = (item) => (dispatch) => {
  axios
    .post("https://64101e4be1212d9cc92a0def.mockapi.io/user", item)
    .then((response) =>
      dispatch({
        type: "POST_USER",
        payload: response.data,
      })
    )
    .catch((error) => {
      console.log(error);
    });
};

export const updateUser = (item, id) => (dispatch) => {
  axios
    .put(`https://64101e4be1212d9cc92a0def.mockapi.io/user/${id}`, item)
    .then((response) =>
      dispatch({
        type: "UPDATE_USER",
        payload: response.data,
      })
    )
    .catch((error) => {
      console.log(error);
    });
};

export const deleteUser = (id) => {
  return (dispatch) => {
    dispatch({ type: "DELETE_USER" });
    axios
      .delete(`https://64101e4be1212d9cc92a0def.mockapi.io/user/${id}`)
      .then(() => dispatch({ type: "DELETE_USER_SUCCESS" }))
      .catch((error) => dispatch({ type: "DELETE_USER_FAILURE", error }));
  };
};

// export const deleteUser = (id) => (dispatch) => {
//   axios
//     .delete(`https://64101e4be1212d9cc92a0def.mockapi.io/user/${id}`)
//     .then((response) =>
//       dispatch({
//         type: "DELETE_USER",

//       })
//     )
//     .catch((error) => {
//       console.log(error);
//     });
// };

// const API_URL = "https://64101e4be1212d9cc92a0def.mockapi.io";

//   export const getItems = async () => {
//     const response = await axios.get(`${API_URL}/user`);
//     return response.data;
//   };

//   export const getItem = async (id) => {
//     const response = await axios.get(`${API_URL}/user/${id}`);
//     return response.data;
//   };

//   export const createItem = async (item) => {
//     const response = await axios.post(`${API_URL}/user`, item);
//     return response.data;
//   };

//   export const updateItem = async (id, item) => {
//     const response = await axios.put(`${API_URL}/user/${id}`, item);
//     return response.data;
//   };

//   export const deleteItem = async (id) => {
//     const response = await axios.delete(`${API_URL}/user/${id}`);
//     return response.data;
//   };
