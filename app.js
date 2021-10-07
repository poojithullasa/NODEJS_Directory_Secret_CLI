const express = require("express");

const directoryRoutes = require("./routes/directory");
const fileRoutes = require("./routes/files");

const app = express();

app.use("/directory", directoryRoutes);

app.use("/files", fileRoutes);

app.use("/", (request, response) => {
  response
    .status(404)
    .send("The following route doesn't exists.404 Error Not Found.");
});

app.listen(3000);
