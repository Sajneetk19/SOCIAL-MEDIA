import React from "react";
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import Form from "./Form";

const LoginPage = () => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  return (
    <Box>
      <Box
        width="100%"
        height="77px"
        backgroundColor={theme.palette.background.alt}
        p="1rem 6%"
        textAlign="center"
      >
        <Typography fontWeight="bold" fontSize="32px" color="#3887BE">
          SnapVibe
        </Typography>
      </Box>

      <Box
        width={isNonMobileScreens ? "40%" : "80%"}
        height="auto"
        p="2rem"
        m="1rem auto"
        borderRadius="1.5rem"
        backgroundColor={theme.palette.background.alt}
      >
        <Typography
          fontWeight="500"
          variant="h3"
          sx={{
            mb: "1.5rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          Welcome to SnapVibe!
        </Typography>
        <Form />
      </Box>
    </Box>
  );
};

export default LoginPage;
