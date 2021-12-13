const express = require("express");
const PORT = 5000;
const app = express();
const connect = require("./schema.js");
const productRoutes = require("./routes");

app.use(express.json());

app.use("/api", productRoutes);

app.get("/", (req, res) => {
  res.send("Hello World");
});

connect();

app.use((error, req, res, next) => {
  res.status(500).json({ message: error.message });
});

app.listen(PORT);
console.log(`Running on port ${PORT}`);

// module.exports = app;
