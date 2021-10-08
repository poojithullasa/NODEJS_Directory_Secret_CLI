const { apiCall } = require("../constants/apiCall");

exports.secretList = async (vault, path) => {
  const response = await apiCall("/secret/list");
  console.log(response, vault, path);
};
