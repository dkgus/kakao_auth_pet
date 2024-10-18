import axios from "axios";

const headerOption = {
  "Content-Type": "application/json",
  Cache: "No-cache",
};

export const getAxiosData = async (url) => {
  const res = await axios.get(url, {
    //headers: headerOption,
  });
  return res.data;
};

export const postAxiosData = async (url, data) => {
  const res = await axios.post(url, data, {
    //headers: headerOption,
  });
  return res.data;
};
