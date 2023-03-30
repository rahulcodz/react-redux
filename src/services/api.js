import axios from "axios";

const API_URL = "https://64101e4be1212d9cc92a0def.mockapi.io";

export const getItems = async () => {
  const response = await axios.get(`${API_URL}/user`);
  return response.data;
};

export const getItem = async (id) => {
  const response = await axios.get(`${API_URL}/user/${id}`);
  return response.data;
};

export const createItem = async (item) => {
  const response = await axios.post(`${API_URL}/user`, item);
  return response.data;
};

export const updateItem = async (id, item) => {
  const response = await axios.put(`${API_URL}/user/${id}`, item);
  return response.data;
};

export const deleteItem = async (id) => {
  const response = await axios.delete(`${API_URL}/user/${id}`);
  return response.data;
};
