const express = require("express");
const cors = require("cors");
const HttpError = require("./models/http-error");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Basic test route
app.get("/", (req, res) => {
  res.send("Backend is running");
});

const restaurantsRouter = require("./routes/restaurants");
app.use("/restaurants", restaurantsRouter);

const usersRouter = require("./routes/users");
app.use("/users", usersRouter);

// Catch all unhandled routes
app.use((req, res, next) => {
  const error = new HttpError("Could not find this route.", 404);
  next(error);
});

// Error handling middleware
app.use((error, req, res, next) => {
  if (res.headersSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occurred!" });
});

// TODO: Import and use routes here

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
