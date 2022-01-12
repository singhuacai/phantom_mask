require("dotenv").config();

// Express Initialization
const express = require("express");
const app = express();
const { PORT } = process.env;
const port = PORT || 3000;
const server = require("http").Server(app);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API routes
app.use([
  require("./server/routes/pharmacy_route"),
  require("./server/routes/user_route"),
  require("./server/routes/statistic_route"),
  require("./server/routes/search_route"),
]);

app.get("/", (req, res) => {
  res.send("This is PHANTOM_MASK SERVER!");
});

// Page not found
app.use(function (req, res, next) {
  res.status(404).send("Page Not Found!");
  return;
});

// Error handling
app.use(function (err, req, res, next) {
  console.log(err);
  res.status(500).send("Internal Server Error");
  return;
});

server.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
