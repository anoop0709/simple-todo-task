// pages/Dashboard.tsx
import { Box, Typography } from "@mui/material";

export default function Taskboard() {
  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 480,
        margin: "0 auto",
        padding: "24px",
      }}
    >
      {/* Header */}
      <Typography
        variant="h4"
        sx={{
          fontWeight: 700,
          marginBottom: "24px",
        }}
      >
        Todo List board
      </Typography>

    </Box>
  );
}