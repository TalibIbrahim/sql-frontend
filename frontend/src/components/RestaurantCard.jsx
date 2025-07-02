import React from "react";
import { Card, Box, Typography, Button } from "@mui/material";

const RestaurantCard = ({ restaurant, onOrderNow }) => {
  return (
    <Card
      sx={{
        display: "flex",
        width: "100%",
        maxWidth: 800,
        height: 180,
        boxShadow: 4,
        borderRadius: 3,
        background: "linear-gradient(135deg, #eaf3ff 0%, #ffffff 100%)",
      }}
    >
      {/* Logo */}
      <Box
        sx={{
          width: 140,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 1,
        }}
      >
        <img
          src={restaurant.ImageURL || "/fallback.jpg"}
          alt={restaurant.Name}
          style={{ width: "100%", height: "auto", borderRadius: 8 }}
        />
      </Box>

      {/* Details */}
      <Box
        sx={{
          flexGrow: 1,
          padding: 2,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography variant="h5" fontWeight={600}>
              {restaurant.Name}
            </Typography>
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
              }}
            >
              {restaurant.Status}
            </Box>
          </Box>

          <Typography variant="body1" color="text.secondary" mt={1}>
            {restaurant.Description}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {restaurant.Location}
          </Typography>
        </div>

        {/* Button */}
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            variant="contained"
            sx={{
              fontSize: "1rem",
              textTransform: "none",
              fontWeight: 500,
              borderRadius: 3,
              backgroundColor: "#1976d2",
              boxShadow: 2,
              transition: "all 0.3s ease-in-out",
              "&:hover": {
                backgroundColor: "#155fa0",
                boxShadow: 4,
              },
            }}
            onClick={onOrderNow}
          >
            Order Now
          </Button>
        </Box>
      </Box>
    </Card>
  );
};

export default RestaurantCard;
