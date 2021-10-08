const { default: axios } = require("axios");

exports.apiCall = async (url) => {
  const response = await axios({
    method: "GET",
    baseURL: "http://localhost:3000",
    url: url,
  })
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      return error.response.status;
    });
  return response;
};
