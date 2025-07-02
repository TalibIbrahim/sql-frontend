import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Typography,
  CircularProgress,
  Divider,
  Rating,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import BadgeIcon from "@mui/icons-material/Badge";

const UserPage = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/users/${id}`)
      .then((res) => {
        setUser(res.data.user);
        setReviews(res.data.reviews);
        setIsLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch user data");
        setIsLoading(false);
      });
  }, [id]);

  if (isLoading)
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
        <CircularProgress />
      </Box>
    );

  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Box
      sx={{
        px: 10,
        py: 6,
        minHeight: "100vh",
        background: "linear-gradient(to bottom,rgb(234, 240, 250), #ffffff)",
      }}
    >
      {/* User Info Section */}
      {user && (
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" fontWeight={700} mb={5}>
            User Profile
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
            <PersonIcon color="primary" />
            <Typography fontSize="1.2rem">{user.Name}</Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <BadgeIcon color="action" />
            <Typography fontSize="1.1rem" color="text.secondary">
              @{user.Username}
            </Typography>
          </Box>
        </Box>
      )}

      <Divider sx={{ my: 3 }} />

      {/* Reviews */}
      <Typography variant="h5" fontWeight={600} mb={2}>
        Reviews by {user?.Name}
      </Typography>

      {reviews.length === 0 ? (
        <Typography>No reviews yet from this user.</Typography>
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
            {/* Restaurant + Rating */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Typography
                variant="subtitle2"
                component={Link}
                to={`/restaurants/${review.RestaurantID}`}
                sx={{
                  color: "#000000",
                  fontSize: "1rem",
                  fontWeight: 600,
                  textDecoration: "none",
                  lineHeight: 1,
                  pt: "1px",
                  "&:hover": {
                    textDecoration: "underline",
                  },
                }}
              >
                {review.RestaurantName}
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

export default UserPage;
