const express = require("express");
const router = express.Router();
const db = require("../db");
const HttpError = require("../models/http-error");

// GET Restaurants
router.get("/", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM Restaurants");
    res.json(rows);
  } catch (err) {
    const error = new HttpError(
      "Fetching Restaurants failed, please try again",
      500
    );
    return next(error);
  }
});

module.exports = router;
