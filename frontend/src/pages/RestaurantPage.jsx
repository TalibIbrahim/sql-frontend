import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Box, Typography, CircularProgress, Divider } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Rating } from "@mui/material";
import { Link } from "react-router-dom";

const RestaurantPage = () => {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [restaurantRes, reviewsRes] = await Promise.all([
          axios.get(`http://localhost:3000/restaurants/${id}`),
          axios.get(`http://localhost:3000/restaurants/${id}/reviews`),
        ]);
        setRestaurant(restaurantRes.data.restaurant);
        setReviews(reviewsRes.data);
        setMenu(restaurantRes.data.menu);
        setIsLoading(false);
      } catch {
        setError("Could not fetch restaurant or reviews");
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (isLoading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;
  if (!restaurant) return null;

  return (
    <Box
      sx={{
        px: 10,
        py: 8,
        backgroundColor: "#f9fafb", // soft white background
        color: "#111827",
        minHeight: "100vh",
      }}
    >
      {/* Header */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 3, mb: 4 }}>
        <img
          src={restaurant.ImageURL || "/fallback.jpg"}
          alt={restaurant.Name}
          style={{ width: 228, height: 228, borderRadius: 12 }}
        />
        <Box>
          <Typography variant="h4" fontWeight={700} gutterBottom>
            {restaurant.Name}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {restaurant.Description}
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              mt: 1,
              color: "#00000",
            }}
          >
            <LocationOnIcon sx={{ fontSize: 20, mr: 0.5 }} />
            <Typography variant="body2" component="span">
              {restaurant.Location}
            </Typography>
          </Box>

          <Box
            sx={{
              fontSize: "0.75rem",
              px: 1.5,
              py: 0.5,
              borderRadius: "999px",
              backgroundColor:
                restaurant.Status === "Open" ? "#D1FAE5" : "#FEE2E2",
              color: restaurant.Status === "Open" ? "#065F46" : "#991B1B",
              fontWeight: 500,
              display: "inline-block",
              mt: 1,
            }}
          >
            {restaurant.Status}
          </Box>
        </Box>
      </Box>

      <Divider sx={{ borderColor: "#e5e7eb", my: 4 }} />

      <Typography
        variant="h5"
        fontWeight={600}
        gutterBottom
        sx={{ color: "#00000", mb: 2 }}
      >
        Our Menu
      </Typography>

      {menu.length === 0 ? (
        <Typography variant="body2" color="text.secondary" mb={5}>
          No menu items available at the moment.
        </Typography>
      ) : (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "1fr 1fr",
              md: "1fr 1fr 1fr",
            },
            gap: 3,
            mb: 5,
          }}
        >
          {menu.map((item) => (
            <Box
              key={item.MenuItemID}
              sx={{
                backgroundColor: "#ffffff",
                border: "1px solid #e5e7eb",
                borderRadius: 3,
                padding: 2,
                boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
              }}
            >
              <Typography variant="h6" fontWeight={600}>
                {item.Name}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ my: 1 }}>
                {item.Description}
              </Typography>
              <Typography variant="body2" fontWeight={500}>
                Rs. {item.Price}
              </Typography>
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ display: "block", mt: 0.5 }}
              >
                {item.Category}
              </Typography>
            </Box>
          ))}
        </Box>
      )}

      {/* Reviews */}
      <Typography
        variant="h5"
        fontWeight={600}
        gutterBottom
        sx={{ color: "#00000" }}
      >
        See what people are saying
      </Typography>

      {reviews.length === 0 ? (
        <Typography variant="body2" color="text.secondary">
          No reviews yet. Be the first to taste and tell!
        </Typography>
      ) : (
        reviews.map((review, idx) => (
          <Box
            key={idx}
            sx={{
              backgroundColor: "#ffffff",
              border: "1px solid #e5e7eb",
              borderRadius: 3,
              padding: 2,
              mb: 2,
              color: "#111827",
              boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Typography
                variant="subtitle2"
                fontWeight={600}
                component={Link}
                to={`/users/${review.UserID}`}
                sx={{
                  textDecoration: "none",
                  fontSize: "1.2rem",
                  color: "#000000",
                  lineHeight: 1,
                  pt: "1px",
                  "&:hover": {
                    textDecoration: "underline",
                  },
                }}
              >
                {review.Username}
              </Typography>

              <Rating
                name="read-only"
                value={review.Rating}
                precision={0.5}
                readOnly
                sx={{ color: "#FCA311" }}
              />
            </Box>

            <Typography variant="body1" sx={{ mt: 1 }}>
              {review.Comment}
            </Typography>
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ display: "block", mt: 1 }}
            >
              {new Date(review.ReviewDate).toLocaleDateString()}
            </Typography>
          </Box>
        ))
      )}
    </Box>
  );
};

export default RestaurantPage;
