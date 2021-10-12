import axios from "axios";

export const getApiCall = async (vault, path, type) => {
  const response = await axios({
    method: "GET",
    baseURL: `https://secmgr1.dev.britive-app.com/api/v1/secretmanager/${vault}/secrets`,
    params: {
      path: path,
      type: type,
    },
    headers: {
      Authorization: `TOKEN ${process.env.TOKEN}`,
    },
  })
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      return error;
    });
  return response;
};

export const postApiCall = async (path, vault) => {
  const response = await axios({
    method: "POST",
    baseURL: `https://secmgr1.dev.britive-app.com/api/v1/secretmanager/${vault}/accesssecrets`,
    params: {
      path: path,
    },
    headers: {
      Authorization: `TOKEN ${process.env.TOKEN}`,
    },
  })
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      return error;
    });
  return response;
};
