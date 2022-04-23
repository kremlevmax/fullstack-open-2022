import axios from "axios";

const baseURL = "http://localhost:3001/api/blogs";

const getAll = () => {
  const request = axios.get(baseURL);
  return request.then((response) => response);
};

export default { getAll };
