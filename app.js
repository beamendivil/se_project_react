import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import routes from "./routes/index.js";
import auth from "./middlewares/auth.js";
import { login, createUser } from "./controllers/users.js";
import { getClothingItems } from "./controllers/clothingItems.js";
import {
  INVALID_DATA_ERROR,
  NOT_FOUND_ERROR,
  DEFAULT_ERROR,
} from "./utils/errors.js";

const { PORT = 3001, MONGO_URL = "mongodb://localhost:27017/wtwr_db" } = process.env;

const app = express();

app.use(express.json());
app.use(cors());

// connect to MongoDB
mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

// Public auth routes
app.post("/signin", login);
app.post("/signup", createUser);
app.get("/items", getClothingItems);

// Auth middleware (protect routes below)
app.use(auth);

// central API routes
app.use("/", routes);

// 404 handler
app.use((req, res) => {
  res.status(NOT_FOUND_ERROR).send({ message: "Requested resource not found" });
});

// basic error handler
app.use((err, req, res, _next) => {
  const { statusCode = DEFAULT_ERROR, message } = err;

  if (statusCode === INVALID_DATA_ERROR) {
    return res.status(statusCode).send({ message });
  }

  return res
    .status(statusCode)
    .send({ message: statusCode === DEFAULT_ERROR ? "An error occurred on the server" : message });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
