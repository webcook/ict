// Layout.tsx
import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Box,
  Button,
  Container,
  Fab,
  Toolbar,
  Typography,
} from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  const navigate = useNavigate();

  const handlePushHomePage = () => navigate("/");
  const handlePushCartPage = () => navigate("/cart");
  const handlePushCreatePage = () => navigate("/create");

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          position="static"
          sx={{
            mb: 4,
            background: "linear-gradient(135deg, #FF8A65 0%, #FFAB91 100%)",
            boxShadow: "0 2px 20px rgba(255, 138, 101, 0.15)",
          }}
        >
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography
              variant="h1"
              sx={{
                fontSize: 28,
                fontWeight: 700,
                cursor: "pointer",
                color: "#FFFFFF",
                textShadow: "0 1px 2px rgba(0, 0, 0, 0.1)",
                transition: "all 0.3s ease-in-out",
                "&:hover": {
                  transform: "scale(1.02)",
                  textShadow: "0 2px 4px rgba(0, 0, 0, 0.15)",
                }
              }}
              onClick={handlePushHomePage}
            >
              탐라사완
            </Typography>
            <Button
              color="inherit"
              onClick={handlePushCartPage}
              sx={{
                color: "#FFFFFF",
                fontWeight: 600,
                borderRadius: 12,
                padding: "8px 20px",
                transition: "all 0.3s ease-in-out",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.2)",
                  transform: "translateY(-1px)",
                }
              }}
              startIcon={<ShoppingCartIcon />}
            >
              장바구니
            </Button>
          </Toolbar>
        </AppBar>

        <Container
          fixed
          sx={{
            minHeight: "calc(100vh - 200px)",
            paddingTop: 2,
            paddingBottom: 8
          }}
        >
          {children}
        </Container>
      </Box>

      <Box sx={{ position: "fixed", bottom: "24px", right: "24px" }}>
        <Fab
          color="primary"
          onClick={handlePushCreatePage}
          sx={{
            background: "linear-gradient(135deg, #FFCC02 0%, #FFD54F 100%)",
            color: "#2E2E2E",
            boxShadow: "0 4px 20px rgba(255, 204, 2, 0.4)",
            "&:hover": {
              background: "linear-gradient(135deg, #F57F17 0%, #FFCC02 100%)",
              boxShadow: "0 6px 25px rgba(255, 204, 2, 0.6)",
              transform: "scale(1.05)",
            }
          }}
        >
          <CreateIcon />
        </Fab>
      </Box>
    </>
  );
};

export default Layout;
