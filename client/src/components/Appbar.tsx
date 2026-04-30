import { AppBar, Toolbar, Typography,} from "@mui/material";
import { useAuth } from "../hooks/useAuth";

export default function Header() {
  const { user } = useAuth();

  const isLoggedIn = !!user;

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        backgroundColor: isLoggedIn ? "#000" : "#F7F7F7",
        color: isLoggedIn ? "#fff" : "#000",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "flex-start",
        }}
      >
        <Typography sx={{ fontWeight: 700 }}>
          Checked
        </Typography>
      </Toolbar>
    </AppBar>
  );
}