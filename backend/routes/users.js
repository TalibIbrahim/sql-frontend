const express = require("express");
const router = express.Router();
const db = require("../db");
const HttpError = require("../models/http-error");

router.get("/:id", async (req, res, next) => {
  const userId = req.params.id;

  try {
    // Fetch user (excluding private info like address/contact)
    const [userRows] = await db.query(
      `SELECT Username, Name FROM Users WHERE UserID = ?`,
      [userId]
    );

    if (userRows.length === 0) {
      return next(new HttpError("User not found", 404));
    }

    // Fetch user reviews with restaurant names
    const [reviewRows] = await db.query(
      `SELECT r.Rating, r.Comment, r.ReviewDate, r.RestaurantID, res.Name AS RestaurantName
       FROM Reviews r
       JOIN Restaurants res ON r.RestaurantID = res.RestaurantID
       WHERE r.UserID = ?
       ORDER BY r.ReviewDate DESC`,
      [userId]
    );

    res.json({ user: userRows[0], reviews: reviewRows });
  } catch (err) {
    return next(new HttpError("Failed to fetch user data", 500));
  }
});

router.get("/:id/reviews", async (req, res, next) => {
  const userId = req.params.id;

  try {
    const [results] = await db.query(
      `SELECT r.Rating, r.Comment, r.ReviewDate, res.Name AS RestaurantName, res.RestaurantID
       FROM Reviews r
       JOIN Restaurants res ON r.RestaurantID = res.RestaurantID
       WHERE r.UserID = ?
       ORDER BY r.ReviewDate DESC`,
      [userId]
    );

    res.json(results);
  } catch (err) {
    next(new HttpError("Fetching user reviews failed", 500));
  }
});

module.exports = router;
