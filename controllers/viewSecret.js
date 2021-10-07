const fs = require("fs");
const path = require("path");
const secretResponse = require("../constants/output");

exports.viewSecret = (request, response) => {
  const location = path.join("/", "Vault", "/Secret4");
  const values = this.readFile(location);
  if (values.length == undefined) {
    const output = secretResponse.errorResponse;
    output.route = "/secret/view";
    output.secret = values;
    response.send(output);
  } else {
    const output = secretResponse.secretResponse;
    output.value.push(values);
    response.send(output);
  }
};

exports.readFile = (path) => {
  try {
    const data = fs.readFileSync(path, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    return error;
  }
};
