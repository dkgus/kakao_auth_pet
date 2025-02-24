import axios from "axios";

const headerOption = {
  "Content-Type": "application/json",
};

const headerFormOption = {
  "Content-Type": "multipart/form-data",
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

export const updateAxiosData = async (url: string, data: object) => {
  const res = await axios.put(url, data, {
    headers: headerOption,
  });
  return res.data;
};

export const updateFileAxiosData = async (url: string, data: object) => {
  const res = await axios.post(url, data, {
    headers: headerFormOption,
  });
  return res.data;
};

export const deleteAxiosData = async (
  url: string,
  key: { userId: string; reserveId: string }
) => {
  const res = await axios.delete(url, {
    headers: headerOption,
    data: key,
  });
  return res.data;
};
