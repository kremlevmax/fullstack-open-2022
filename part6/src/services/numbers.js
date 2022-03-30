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

const updateEntry = () => {
  if (window.confirm("Entry already exists. Do you want to update it?")) {
  }
};

export default { getAll, createEntry, deleteEntry };

// Service Module
