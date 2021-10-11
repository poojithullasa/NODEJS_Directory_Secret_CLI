import axios from "axios";

exports.apiCall = async (url, path, vault) => {
  const response = await axios({
    method: "GET",
    baseURL: "http://localhost:3000",
    url: url,
    params: {
      path: path,
      vault: vault,
    },
  })
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      return error.response.status;
    });
  return response;
};
