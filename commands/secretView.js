const { apiCall } = require("../constants/apiCall");

exports.secretView = async (vault, path, option) => {
  const response = await apiCall("/secret/view");
  console.log(response, vault, path, option);
};
