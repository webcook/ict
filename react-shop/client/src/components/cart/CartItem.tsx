// src/components/cart/CartItem.tsx
import {
  Card,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  Typography,
  Box,
  Chip,
} from "@mui/material";
import { Add, Delete, Remove } from "@mui/icons-material";

import type { ProductType } from "../../types";
import { API_SERVER_DOMAIN } from "../../constants";
import { useCart } from "../../hooks";

type Props = {
  cart: ProductType & { count: number };
};

const CartItem = ({ cart }: Props) => {
  const { changeCount, removeCart } = useCart();

  return (
    <Card
      sx={{
        display: "flex",
        marginBottom: 3,
        borderRadius: 3,
        background: "linear-gradient(145deg, #ffffff 0%, #fff8f0 100%)",
        border: "1px solid rgba(255, 138, 101, 0.15)",
        boxShadow: "0 2px 12px rgba(255, 138, 101, 0.06)",
        transition: "all 0.3s ease-in-out",
        "&:hover": {
          boxShadow: "0 4px 20px rgba(255, 138, 101, 0.1)",
          transform: "translateY(-1px)",
        }
      }}
    >
      {cart.thumbnail && (
        <CardMedia
          sx={{
            width: 120,
            height: 120,
            backgroundSize: "cover",
            backgroundPosition: "center",
            borderRight: "1px solid rgba(255, 138, 101, 0.1)",
          }}
          image={`${API_SERVER_DOMAIN}/${cart.thumbnail}`}
          title={cart.name}
        />
      )}
      <CardContent sx={{ width: "100%", padding: 3 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 2 }}>
          <Box sx={{ flex: 1 }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                color: "#2E2E2E",
                marginBottom: 1,
              }}
            >
              {cart.name}
            </Typography>
            <Chip
              label={`${cart.price.toLocaleString("ko-KR")}원`}
              size="small"
              sx={{
                backgroundColor: "rgba(255, 138, 101, 0.2)",
                color: "#E64A19",
                fontWeight: 600,
              }}
            />
          </Box>
          <IconButton
            onClick={() => removeCart(cart.id)}
            sx={{
              color: "#E57373",
              "&:hover": {
                backgroundColor: "rgba(229, 115, 115, 0.1)",
                transform: "scale(1.1)",
              }
            }}
          >
            <Delete />
          </IconButton>
        </Box>

        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <IconButton
                onClick={() => changeCount(cart.id, "decrease")}
                sx={{
                  backgroundColor: "rgba(255, 138, 101, 0.1)",
                  color: "#E64A19",
                  "&:hover": {
                    backgroundColor: "rgba(255, 138, 101, 0.2)",
                    transform: "scale(1.1)",
                  }
                }}
              >
                <Remove />
              </IconButton>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 600,
                  color: "#2E2E2E",
                  minWidth: 30,
                  textAlign: "center",
                }}
              >
                {cart.count}
              </Typography>
              <IconButton
                onClick={() => changeCount(cart.id, "increase")}
                sx={{
                  backgroundColor: "rgba(255, 138, 101, 0.1)",
                  color: "#E64A19",
                  "&:hover": {
                    backgroundColor: "rgba(255, 138, 101, 0.2)",
                    transform: "scale(1.1)",
                  }
                }}
              >
                <Add />
              </IconButton>
            </Box>
          </Grid>

          <Grid item>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                color: "#E64A19",
                backgroundColor: "rgba(255, 138, 101, 0.1)",
                padding: "8px 16px",
                borderRadius: 2,
                border: "1px solid rgba(255, 138, 101, 0.2)",
              }}
            >
              {(cart.price * cart.count).toLocaleString("ko-KR")}원
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};
export default CartItem;
