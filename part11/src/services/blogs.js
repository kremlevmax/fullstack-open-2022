import axios from "axios";

const baseURL = "http://localhost:3001/api/blogs/";
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

const like = async (blogData) => {
  const URL = baseURL + blogData.id;
  await axios.put(URL, blogData);
};

export default { getAll, create, setToken, like };
