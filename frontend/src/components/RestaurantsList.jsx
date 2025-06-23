import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  Typography,
  CircularProgress,
  TextField,
  Box,
  Button,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const RestaurantList = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [input, setInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3000/restaurants")
      .then((response) => {
        setRestaurants(response.data);
        setIsLoading(false);
      })
      .catch(() => {
        setError("Error Fetching Restaurants");
        setIsLoading(false);
      });
  }, []);

  const filteredRestaurants = restaurants.filter((restaurant) =>
    restaurant.Name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setSearchTerm(input.trim());
    }
  };

  if (isLoading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Box
      sx={{
        px: 2,
        py: 4,
        minHeight: "100vh",
        background: "linear-gradient(to bottom, #111827, #1f2937)",
      }}
    >
      {/* Search Bar */}
      <Box sx={{ display: "flex", justifyContent: "center", mb: 5 }}>
        <TextField
          placeholder="Search restaurants..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          variant="outlined"
          sx={{
            width: "100%",
            maxWidth: 500,
            transition: "all 0.3s ease-in-out",
            "& .MuiOutlinedInput-root": {
              borderRadius: "50px",
              backgroundColor: "white",
              boxShadow: 1,
              "& fieldset": {
                borderColor: "transparent",
              },
              "&:hover fieldset": {
                borderColor: "#1976d2",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#1976d2",
              },
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      {/* Restaurant Cards */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 3,
        }}
      >
        {filteredRestaurants.map((restaurant) => (
          <Card
            key={restaurant.RestaurantID}
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
                      color:
                        restaurant.Status === "Open" ? "#065F46" : "#991B1B",
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
                >
                  Order Now
                </Button>
              </Box>
            </Box>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default RestaurantList;
