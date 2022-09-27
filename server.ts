import express, { Request, Response, NextFunction } from "express";
import Mongo from "./schema";
import "dotenv/config";

const connect = require("./schema");
const productRoutes = require("./routes");

const app = express();

app.use(express.json());
app.use("/api", productRoutes);
Mongo.connect();

app.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.send("hello world");
});

app.listen(process.env.PORT, () => {
  console.log(`server listening on port ${process.env.PORT} `);
});
