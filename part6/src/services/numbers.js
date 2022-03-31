import axios from "axios";

const baseURL = "http://localhost:3001/numbers";

const getAll = () => {
  const request = axios.get(baseURL);
  return request.then((response) => response.data);
};

const createEntry = (entry) => {
  const request = axios.post(baseURL, entry);
  return request.then((response) => response.data);
};

const deleteEntry = (id) => {
  if (window.confirm("Do you want to delete this entry?")) {
    axios.delete(baseURL.concat(`/${id}`));
  }
};

const updateEntry = (id, entry) => {
  if (window.confirm("Entry already exists. Do you want to update it?")) {
    return axios
      .put(baseURL.concat(`/${id}`), entry)
      .then((response) => response.data);
  }
};

export default { getAll, createEntry, deleteEntry, updateEntry };

// Service Module
