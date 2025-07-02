import React from "react";
import { Box, Typography, Paper } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";
import InstagramIcon from "@mui/icons-material/Instagram";

const ContactPage = () => {
  return (
    <Box
      sx={{
        px: 6,
        py: 8,
        background: "linear-gradient(to bottom, #e0ecff, #ffffff)",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
      }}
    >
      <Paper
        elevation={4}
        sx={{
          p: 5,
          maxWidth: 600,
          borderRadius: 4,
          backgroundColor: "#ffffff",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 3 }}>
          <ContactSupportIcon sx={{ fontSize: 40, color: "#14213D" }} />
          <Typography
            variant="h3"
            fontWeight={800}
            sx={{ color: "#14213D", fontFamily: "Poppins, sans-serif" }}
          >
            Contact Us
          </Typography>
        </Box>

        <Typography
          variant="body1"
          fontSize="1.15rem"
          sx={{ lineHeight: 1.8, fontFamily: "Poppins, sans-serif" }}
        >
          Whether it's feedback, a collaboration idea, or just a hello — we’d
          love to hear from you!
        </Typography>

        <Box sx={{ mt: 4 }}>
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <EmailIcon sx={{ mr: 1, color: "#1976d2" }} />
            <Typography
              component="a"
              href="mailto:thehi5squad@proton.me"
              sx={{
                color: "#1976d2",
                textDecoration: "none",
                fontSize: "1rem",
              }}
            >
              thehi5squad@proton.me
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <PhoneIcon sx={{ mr: 1, color: "#1976d2" }} />
            <Typography sx={{ fontSize: "1rem" }}>+92-312-1234567</Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <InstagramIcon sx={{ mr: 1, color: "#1976d2" }} />
            <Typography
              component="a"
              href="https://www.instagram.com/bytercrew"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                color: "#1976d2",
                textDecoration: "none",
                fontSize: "1rem",
              }}
            >
              @bytercrew
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default ContactPage;
