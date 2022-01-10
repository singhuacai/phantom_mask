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
]);

app.get("/", (req, res) => {
  res.send("This is PHANTOM_MASK SERVER!");
});

server.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
