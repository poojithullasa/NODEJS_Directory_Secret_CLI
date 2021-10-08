exports.successResponse = {
  result: [],
  pagination: {
    next: "",
    prev: "",
  },
};

exports.failureResponse = {
  route: "",
  nodes: "",
  secrets: "",
};

exports.secretResponse = {
  entityType: "secret",
  name: "DB1",
  secretType: "DB",
  secretMode: "shared",
  value: [],
};

exports.errorResponse = {
  route: "",
  secret: "",
};
