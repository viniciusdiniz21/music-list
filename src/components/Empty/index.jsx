import * as React from "react";
import { Box, Typography } from "@mui/material";

function index({ children }) {
  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Typography variant="h4" sx={{ fontWeight: 500, color: "white" }}>
        {children}
      </Typography>
    </Box>
  );
}

export default index;
