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
  console.log(config);
  const response = await axios.post(baseURL, blogData, config);
  console.log(response.data);
  return response.data;
};

export default { getAll, create, setToken };