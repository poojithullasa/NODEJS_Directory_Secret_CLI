import fs from "fs";
import path from "path";
import outputMessage from "../constants/responses.js";

export const listSecret = (request, response) => {
  const vault = request.query.vault;
  const file = request.query.path;
  if (!fs.existsSync(path.join("/", vault))) {
    response.send(`The Vault "${vault}" doesn't exists`);
  }
  const location = path.join("/", vault, file);
  if (!fs.existsSync(location)) {
    response.send(`The file "${file}" in  Vault "${vault}" doesn't exists`);
  }
  const files = getFiles(location);
  const secrets = getSecrets(location);
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

const getFiles = (path) => {
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

const getSecrets = (path) => {
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
