const successResponse = {
  result: [],
  pagination: {
    next: "",
    prev: "",
  },
};

const failureResponse = {
  route: "",
  nodes: "",
  secrets: "",
};

const secretResponse = {
  entityType: "secret",
  name: "DB1",
  secretType: "DB",
  secretMode: "shared",
  value: [],
};

const errorResponse = {
  route: "",
  secret: "",
};

export default {
  successResponse,
  failureResponse,
  secretResponse,
  errorResponse,
};
