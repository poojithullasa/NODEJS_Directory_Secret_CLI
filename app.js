const express = require("express");

const secretRoutes = require("./routes/secret");

const app = express();

app.use("/secret", secretRoutes);

app.use("/", (request, response) => {
  response.status(404).send({
    status: "The following route doesn't exists. 404 Error Not Found.",
    route: `${request.url}`,
  });
});

app.listen(3000);
