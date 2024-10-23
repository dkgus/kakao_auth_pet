import axios from "axios";

const headerOption = {
  "Content-Type": "application/json",
};

export const getAxiosData = async (url: string) => {
  const res = await axios.get(url, {
    headers: headerOption,
  });
  return res.data;
};

export const postAxiosData = async (url: string, data: object) => {
  const res = await axios.post(url, data, {
    headers: headerOption,
  });
  return res.data;
};
