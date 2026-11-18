import { createTheme } from "@mui/material/styles";

// The Alto Circle theme: deep teal with a warm amber accent.
export const theme = createTheme({
  palette: {
    primary: { main: "#00695C", dark: "#004D40", light: "#338A7D", contrastText: "#FFFFFF" },
    secondary: { main: "#FF8F00", dark: "#C56000", light: "#FFB74D", contrastText: "#1A1A1A" },
    background: { default: "#F4F7F6", paper: "#FFFFFF" },
  },
  typography: {
    h1: { fontWeight: 700 },
    h2: { fontWeight: 600 },
  },
});
