import express from "express";

import { router } from "./routes/secret.js";

const app = express();

app.use("/secret", router);

app.use("/", (request, response) => {
  response.status(404).send({
    status: "The following route doesn't exists. 404 Error Not Found.",
    route: `${request.url}`,
  });
});

app.listen(3000);
