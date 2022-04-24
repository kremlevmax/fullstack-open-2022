import axios from "axios";

const baseURL = "http://localhost:3001/api/blogs";
let token = null;

const setToken = (tokenData) => {
  token = `bearer ${tokenData}`;
};

const getAll = async () => {
  const request = await axios.get(baseURL);
  return request;
};

const create = async (blogData) => {
  const config = { headers: { Authorization: token } };
  const response = await axios.post(baseURL, blogData, config);
  return response.data;
};

export default { getAll, create, setToken };
