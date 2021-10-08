const fs = require("fs");
const path = require("path");
const secretResponse = require("../constants/responses");

exports.viewSecret = (request, response) => {
  const location = path.join("/", request.query.vault, request.query.path);
  const values = this.readFile(location);
  if (values.length == undefined) {
    const output = secretResponse.errorResponse;
    output.route = "/secret/view";
    output.secret = values;
    response.send(output);
  } else {
    const output = secretResponse.secretResponse;
    if (output.value.length != 0) output.value = [];
    values.forEach((value) => {
      output.value.push(value);
    });
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
