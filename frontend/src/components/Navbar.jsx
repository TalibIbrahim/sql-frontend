// src/components/Navbar.jsx
import React from "react";
import { AppBar, Toolbar, Box, Button } from "@mui/material";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "var(--color-dark)",
        boxShadow: "none",
        paddingY: 1.5,
        paddingX: 2,
        fontFamily: "Roboto, sans-serif",
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Left: Logo */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <img
            src="/BYTE_logo.png"
            alt="Logo"
            style={{ height: 56, marginLeft: 8 }}
          />
        </Box>

        {/* Right: Navigation Links */}
        <Box sx={{ display: "flex", gap: 3, marginRight: 2 }}>
          {[
            { label: "Home", path: "/" },
            { label: "About", path: "/about" },
            { label: "Contact", path: "/contact" },
          ].map(({ label, path }) => (
            <Button
              key={label}
              component={Link}
              to={path}
              sx={{
                color: "var(--color-white)",
                fontWeight: 400,
                fontSize: "1.15rem",
                textTransform: "none",
                fontFamily: "Roboto, sans-serif",
                transition: "0.3s",
                "&:hover": {
                  color: "#1976d2",
                  backgroundColor: "transparent",
                },
              }}
            >
              {label}
            </Button>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
