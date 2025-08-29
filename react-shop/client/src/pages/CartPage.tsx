// CartPage.tsx
import {
  Box,
  Button,
  Card,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Typography,
  Paper,
  Chip,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PaymentIcon from "@mui/icons-material/Payment";
import { CartItem } from "../components/cart";
import { useCart } from "../hooks";

const CartPage = () => {
  const navigate = useNavigate();
  const { carts } = useCart();

  const totalPrice = carts.reduce(
    (prev, cur) => prev + cur.price * cur.count,
    0
  );

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePurchaseProduct = (event: React.FormEvent) => {
    event.preventDefault();
    setIsModalOpen(true);
  };

  const handlePushHomePage = () => {
    setIsModalOpen(false);
    navigate("/");
  };

  return (
    <>
      <Container fixed>
        <Typography
          variant="h3"
          sx={{
            marginBottom: 4,
            fontWeight: 700,
            color: "#2E2E2E",
            textAlign: "center",
          }}
        >
          🛒 장바구니
        </Typography>

        <Grid container spacing={4}>
          <Grid item xs={12} lg={8}>
            <Paper
              elevation={0}
              sx={{
                padding: 3,
                borderRadius: 3,
                background: "linear-gradient(145deg, #ffffff 0%, #fff8f0 100%)",
                border: "1px solid rgba(255, 138, 101, 0.15)",
                boxShadow: "0 4px 20px rgba(255, 138, 101, 0.1)",
              }}
            >
              {carts.length === 0 ? (
                <Box sx={{ textAlign: "center", padding: 4 }}>
                  <Typography
                    variant="h6"
                    sx={{
                      color: "#666666",
                      marginBottom: 2,
                    }}
                  >
                    장바구니에 담긴 상품이 없습니다.
                  </Typography>
                  <Button
                    variant="contained"
                    onClick={() => navigate("/")}
                    sx={{
                      background: "linear-gradient(135deg, #FF8A65 0%, #FFAB91 100%)",
                      color: "#FFFFFF",
                      fontWeight: 600,
                      borderRadius: 2,
                      padding: "10px 24px",
                      "&:hover": {
                        background: "linear-gradient(135deg, #E64A19 0%, #FF8A65 100%)",
                        transform: "translateY(-1px)",
                      }
                    }}
                  >
                    쇼핑하러 가기
                  </Button>
                </Box>
              ) : (
                <Box>
                  <Typography
                    variant="h5"
                    sx={{
                      marginBottom: 3,
                      fontWeight: 600,
                      color: "#2E2E2E",
                    }}
                  >
                    상품 목록 ({carts.length}개)
                  </Typography>
                  {carts.map((cart) => <CartItem key={cart.id} cart={cart} />)}
                </Box>
              )}
            </Paper>
          </Grid>

          <Grid item xs={12} lg={4}>
            <Box sx={{ position: "sticky", top: 20 }}>
              <Paper
                elevation={0}
                sx={{
                  padding: 3,
                  borderRadius: 3,
                  background: "linear-gradient(145deg, #ffffff 0%, #fff8f0 100%)",
                  border: "1px solid rgba(255, 138, 101, 0.15)",
                  boxShadow: "0 4px 20px rgba(255, 138, 101, 0.1)",
                }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    marginBottom: 3,
                    fontWeight: 600,
                    color: "#2E2E2E",
                  }}
                >
                  💳 결제 정보
                </Typography>

                <Box sx={{ marginBottom: 3 }}>
                  <Box sx={{ display: "flex", justifyContent: "space-between", marginBottom: 2 }}>
                    <Typography variant="body1" sx={{ color: "#666666" }}>
                      총 상품 가격:
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 600, color: "#2E2E2E" }}>
                      {totalPrice.toLocaleString("ko-KR")}원
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", justifyContent: "space-between", marginBottom: 2 }}>
                    <Typography variant="body1" sx={{ color: "#666666" }}>
                      배송비:
                    </Typography>
                    <Chip
                      label="평생 무료"
                      size="small"
                      sx={{
                        backgroundColor: "rgba(255, 138, 101, 0.2)",
                        color: "#E64A19",
                        fontWeight: 600,
                      }}
                    />
                  </Box>
                  <Box sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: 3,
                    padding: 2,
                    backgroundColor: "rgba(255, 138, 101, 0.1)",
                    borderRadius: 2,
                    border: "1px solid rgba(255, 138, 101, 0.2)",
                  }}>
                    <Typography variant="h6" sx={{ fontWeight: 700, color: "#E64A19" }}>
                      총 결제 금액:
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 700, color: "#E64A19" }}>
                      {totalPrice.toLocaleString("ko-KR")}원
                    </Typography>
                  </Box>
                </Box>

                <Button
                  variant="contained"
                  fullWidth
                  onClick={handlePurchaseProduct}
                  disabled={carts.length === 0}
                  sx={{
                    background: "linear-gradient(135deg, #FF8A65 0%, #FFAB91 100%)",
                    color: "#FFFFFF",
                    fontWeight: 600,
                    padding: "12px 24px",
                    fontSize: "1.1rem",
                    borderRadius: 2,
                    boxShadow: "0 4px 12px rgba(255, 138, 101, 0.3)",
                    "&:hover": {
                      background: "linear-gradient(135deg, #E64A19 0%, #FF8A65 100%)",
                      boxShadow: "0 6px 16px rgba(255, 138, 101, 0.4)",
                      transform: "translateY(-1px)",
                    },
                    "&:disabled": {
                      background: "#E0E0E0",
                      color: "#9E9E9E",
                      boxShadow: "none",
                    }
                  }}
                  startIcon={<PaymentIcon />}
                >
                  결제하기
                </Button>
              </Paper>
            </Box>
          </Grid>
        </Grid>
      </Container>

      <Dialog
        open={isModalOpen}
        onClose={handlePushHomePage}
        aria-labelledby="responsive-dialog-title"
        PaperProps={{
          sx: {
            borderRadius: 3,
            background: "linear-gradient(145deg, #ffffff 0%, #fff8f0 100%)",
          }
        }}
      >
        <DialogTitle
          id="responsive-dialog-title"
          sx={{
            color: "#2E2E2E",
            fontWeight: 600,
          }}
        >
          🎉 성공적으로 구매하였습니다!
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ color: "#666666" }}>
            메인 페이지로 이동합니다.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ padding: 3 }}>
          <Button
            onClick={handlePushHomePage}
            autoFocus
            sx={{
              backgroundColor: "#FF8A65",
              color: "#FFFFFF",
              fontWeight: 600,
              "&:hover": {
                backgroundColor: "#E64A19",
              }
            }}
          >
            확인
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CartPage;
