import React, { useEffect, useState } from "react";
import axios from "axios";

import RestaurantCard from "./RestaurantCard";
import { useNavigate } from "react-router-dom";

import {
  Typography,
  CircularProgress,
  TextField,
  Box,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const RestaurantList = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [input, setInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();

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

  if (isLoading)
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "50vh", // adjust if you want more or less height
        }}
      >
        <CircularProgress />
      </Box>
    );

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
          <RestaurantCard
            key={restaurant.RestaurantID}
            restaurant={restaurant}
            onOrderNow={() =>
              navigate(`/restaurants/${restaurant.RestaurantID}`)
            }
          />
        ))}
      </Box>
    </Box>
  );
};

export default RestaurantList;
