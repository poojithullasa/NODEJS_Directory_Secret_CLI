const fs = require("fs");
const path = require("path");
const outputMessage = require("../constants/responses");

exports.listSecret = (request, response) => {
  const location = path.join("/", "Vault", "/");
  const files = this.getFiles(location);
  const secrets = this.getSecrets(location);
  if (files.length == undefined || secrets.length == undefined) {
    const output = outputMessage.failureResponse;
    output.nodes = files;
    output.secrets = secrets;
    output.route = "/secret/list";
    response.send(output);
  } else {
    const output = outputMessage.successResponse;
    if (output.result.length != 0) output.result = [];
    files.forEach((file) => {
      output.result.push({ entityType: "node", name: file });
    });
    secrets.forEach((secret) => {
      output.result.push({ entityType: "secret", name: secret });
    });
    response.send(output);
  }
};

exports.getFiles = (path) => {
  try {
    const files = fs
      .readdirSync(path, { withFileTypes: true })
      .filter((dirent) => dirent.isDirectory())
      .map((dirent) => dirent.name);
    return files;
  } catch (error) {
    return error;
  }
};

exports.getSecrets = (path) => {
  try {
    const secrets = fs
      .readdirSync(path, { withFileTypes: true })
      .filter((dirent) => dirent.isFile())
      .map((dirent) => dirent.name);
    return secrets;
  } catch (error) {
    return error;
  }
};
