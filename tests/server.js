const express = require("express");
const cors = require("cors");
const routes = require("/routes");

const app = express();
const port = 8000;

//handle
app.use(cors());
app.use(express.urlencoded({ extends: true }));
app.use(express.json());

routes(app);

app.listen(port, () => {
  console.log("Server is running on http://localhost:${port}");
});

module.exports = app;
