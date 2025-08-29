// ProductItem.tsx
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  Chip,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { API_SERVER_DOMAIN } from "../../constants";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import { ProductType } from "../../types";

interface ProductItemProps {
  product: ProductType;
}

function ProductItem({ product }: ProductItemProps) {
  const navigate = useNavigate();

  const handlePushProductPage = () => navigate(`/product/${product.id}`);
  const handlePushPurchasePage = () => navigate(`/purchase/${product.id}`);

  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Card
        sx={{
          maxWidth: 345,
          height: 400,
          cursor: "pointer",
          background: "linear-gradient(145deg, #ffffff 0%, #fff8f0 100%)",
          border: "1px solid rgba(255, 138, 101, 0.15)",
          boxShadow: "0 4px 20px rgba(255, 138, 101, 0.1)",
          transition: "all 0.3s ease-in-out",
          "&:hover": {
            boxShadow: "0 8px 30px rgba(255, 138, 101, 0.15)",
            transform: "translateY(-4px)",
            border: "1px solid rgba(255, 138, 101, 0.3)",
          }
        }}
        onClick={handlePushProductPage}
      >
        {product.thumbnail && (
          <CardMedia
            sx={{
              height: 200,
              backgroundSize: "cover",
              backgroundPosition: "center",
              borderBottom: "1px solid rgba(255, 138, 101, 0.1)",
            }}
            image={`${API_SERVER_DOMAIN}/${product.thumbnail}`}
            title={product.name}
          />
        )}
        <CardContent sx={{ padding: 2, height: 140, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <Box>
            <Typography
              gutterBottom
              variant="h6"
              component="div"
              sx={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                fontWeight: 600,
                color: "#2E2E2E",
                marginBottom: 1,
              }}
            >
              {product.name}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                height: 40,
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                lineHeight: 1.4,
                color: "#666666",
                marginBottom: 1,
              }}
            >
              {product.explanation}
            </Typography>
            <Chip
              label={`${product.price.toLocaleString("ko-KR")}원`}
              sx={{
                backgroundColor: "rgba(255, 138, 101, 0.2)",
                color: "#E64A19",
                fontWeight: 600,
                fontSize: "0.9rem",
              }}
            />
          </Box>

          <Box sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center", marginTop: 2 }}>
            <Button
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                handlePushPurchasePage();
              }}
              variant="contained"
              sx={{
                background: "linear-gradient(135deg, #FF8A65 0%, #FFAB91 100%)",
                color: "#FFFFFF",
                fontWeight: 600,
                borderRadius: 8,
                padding: "6px 16px",
                fontSize: "0.8rem",
                boxShadow: "0 2px 8px rgba(255, 138, 101, 0.3)",
                "&:hover": {
                  background: "linear-gradient(135deg, #E64A19 0%, #FF8A65 100%)",
                  boxShadow: "0 4px 12px rgba(255, 138, 101, 0.4)",
                  transform: "translateY(-1px)",
                }
              }}
              startIcon={<ShoppingCartIcon sx={{ fontSize: 16 }} />}
            >
              구매하기
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
}

export default ProductItem;
