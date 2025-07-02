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

router.get("/:id", async (req, res, next) => {
  const restaurantId = req.params.id;

  try {
    // Fetch restaurant info
    const [restaurantRows] = await db.query(
      "SELECT * FROM Restaurants WHERE RestaurantID = ?",
      [restaurantId]
    );

    if (restaurantRows.length === 0) {
      return next(new HttpError("Restaurant Not Found", 404));
    }

    // Fetch associated menu items
    const [menuItems] = await db.query(
      "SELECT * FROM MenuItems WHERE RestaurantID = ?",
      [restaurantId]
    );

    // Send both in response
    res.json({
      restaurant: restaurantRows[0],
      menu: menuItems,
    });
  } catch (err) {
    return next(new HttpError("Fetching Restaurant Failed", 500));
  }
});

router.get("/:id/reviews", async (req, res, next) => {
  const restaurantId = req.params.id;

  try {
    const [results] = await db.query(
      `SELECT Reviews.Rating, Reviews.Comment, Reviews.ReviewDate, Users.Username, Users.UserID
       FROM Reviews
       JOIN Users ON Reviews.UserID = Users.UserID
       WHERE Reviews.RestaurantID = ?
       ORDER BY Reviews.ReviewDate DESC`,
      [restaurantId]
    );

    res.json(results);
  } catch (err) {
    next(new HttpError("Fetching reviews failed", 500));
  }
});

module.exports = router;
