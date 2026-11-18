import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import ThemeRegistry from "./ThemeRegistry.js";

export const metadata = { title: "Palo Alto Community Space", description: "Community space web app and dashboards for medium to large business owners in Palo Alto." };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ThemeRegistry>
          <AppBar position="static" color="primary">
            <Toolbar>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                The Alto Circle
              </Typography>
              <Button color="inherit" href="/">Home</Button>
              <Button color="inherit" href="/members">Members</Button>
              <Button color="inherit" href="/resources">Resources</Button>
              <Button color="inherit" href="/dashboard">Dashboard</Button>
            </Toolbar>
          </AppBar>
          <Container maxWidth="md" sx={{ py: 4 }}>
            <Box>{children}</Box>
          </Container>
        </ThemeRegistry>
      </body>
    </html>
  );
}
