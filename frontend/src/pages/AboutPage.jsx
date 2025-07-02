import React from "react";
import { Box, Typography } from "@mui/material";
import RestaurantIcon from "@mui/icons-material/Restaurant";

const AboutPage = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        alignItems: "center",
        justifyContent: "center",
        px: { xs: 4, md: 10 },
        py: 0,
        background: "linear-gradient(to bottom, #e0ecff, #ffffff)",
        minHeight: "91vh",
        gap: { xs: 6, md: 10 }, // spacing between text and image
      }}
    >
      {/* Left: Text */}
      <Box sx={{ maxWidth: 620, width: "100%" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 3 }}>
          <RestaurantIcon sx={{ fontSize: 40, color: "#14213D" }} />
          <Typography
            variant="h3"
            fontWeight={800}
            sx={{ color: "#14213D", fontFamily: "Poppins, sans-serif" }}
          >
            Our Story
          </Typography>
        </Box>

        <Typography
          variant="body1"
          fontSize="1.2rem"
          lineHeight={1.8}
          sx={{
            color: "#333",
            fontFamily: "Poppins, sans-serif",
          }}
        >
          As university students in Pakistan, we faced the daily struggle of
          finding affordable, reliable, and delicious food. Cafeterias were
          crowded, delivery apps were expensive, and options were limited.
          <br />
          <br />
          That's when we decided to build something different — a platform
          designed by students, for students. We wanted to revolutionize how
          food is discovered, ordered, and enjoyed on campus and beyond.
          <br />
          <br />
          With <strong>BYTERS</strong>, we're not just creating an app — we're
          building a community where food brings people together, one byte at a
          time.
        </Typography>
      </Box>

      {/* Right: Image */}
      <Box
        sx={{
          width: "100%",
          maxWidth: 420,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Box
          component="img"
          src="/aboutPage.jpg"
          alt="About Us"
          sx={{
            width: "100%",
            borderRadius: "50% 60% 50% 60% / 60% 40% 60% 40%",
            boxShadow: "0 8px 30px rgba(0,0,0,0.1)",
            border: "5px solid rgba(25, 118, 210, 0.38)",
            objectFit: "cover",
          }}
        />
      </Box>
    </Box>
  );
};

export default AboutPage;
