import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

export const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

export const getAll = () => {
  return axios
    .get(baseUrl)
    .then((response) => response.data)
    .catch((error) => console.log(error));
};

export const create = (newObject) => {
  const config = {
    headers: { Authorization: token },
  };

  return axios
    .post(baseUrl, newObject, config)
    .then((response) => response.data);
};

export const update = (id, newObject) => {
  return axios
    .put(`${baseUrl}/${id}`, newObject)
    .then((response) => response.data);
};

export const remove = (id) => {
  const config = {
    headers: { Authorization: token },
  };
  return axios
    .delete(`${baseUrl}/${id}`, config)
    .then((response) => response.data);
};
