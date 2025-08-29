import {
  Box,
  Button,
  ButtonGroup,
  CircularProgress,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
  Paper,
  Chip,
} from "@mui/material";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Edit from "@mui/icons-material/Edit";
import Delete from "@mui/icons-material/Delete";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PaymentIcon from "@mui/icons-material/Payment";
import { useCart } from "../hooks";
import { deleteProduct, getProduct } from "../utils/api";
import useAsync from "../hooks/useAsync";
import { NotFoundPage } from ".";
import { API_SERVER_DOMAIN } from "../constants";

const ProductPage = () => {
  const navigate = useNavigate();
  const { productId } = useParams<{ productId: string }>();
  const { addCarts } = useCart();

  const { loading: getProductLoading, data } = useAsync(() =>
    getProduct(productId!)
  );

  const { request: deleteProductRequest, loading: deleteProductLoading } =
    useAsync(() => deleteProduct(productId!), {
      initialRequest: false,
    });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModal, setIsDeleteModal] = useState(false);

  const handleAddCard = () => {
    if (product) {
      addCarts(product.id);
      setIsModalOpen(true);
    }
  };

  const handlePushPurchasePage = () => {
    if (productId) {
      navigate(`/purchase/${productId}`);
    }
  };

  const handlePushHomePage = () => {
    navigate(`/`);
  };

  const handlePushCartPage = () => {
    navigate(`/cart`);
  };

  const handleDeleteProduct = async () => {
    setIsDeleteModal(false);
    await deleteProductRequest();
    handlePushHomePage();
  };

  if (!productId || !data) return <NotFoundPage />;
  if (getProductLoading || deleteProductLoading) return <CircularProgress />;

  const product = data.data.product;

  return (
    <>
      <Container maxWidth="md">
        <Paper
          elevation={0}
          sx={{
            padding: 4,
            borderRadius: 4,
            background: "linear-gradient(145deg, #ffffff 0%, #fff8f0 100%)",
            border: "1px solid rgba(255, 138, 101, 0.15)",
            boxShadow: "0 4px 20px rgba(255, 138, 101, 0.1)",
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "center", mb: 4 }}>
            {product?.thumbnail && (
              <Box
                component="img"
                src={`${API_SERVER_DOMAIN}/${product.thumbnail}`}
                alt={product?.name}
                sx={{
                  width: "100%",
                  maxWidth: 500,
                  height: 400,
                  objectFit: "cover",
                  borderRadius: 3,
                  boxShadow: "0 8px 30px rgba(0, 0, 0, 0.1)",
                }}
              />
            )}
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 3,
              flexWrap: "wrap",
              gap: 2,
            }}
          >
            <Typography
              variant="h3"
              sx={{
                fontWeight: 700,
                color: "#2E2E2E",
                flex: 1,
                minWidth: 200,
              }}
            >
              {product?.name}
            </Typography>
            <ButtonGroup
              orientation="horizontal"
              sx={{
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                borderRadius: 2,
              }}
            >
              <Button
                variant="text"
                onClick={() => setIsDeleteModal(true)}
                sx={{
                  color: "#E57373",
                  "&:hover": {
                    backgroundColor: "rgba(229, 115, 115, 0.1)",
                  }
                }}
              >
                <Delete />
              </Button>
              <Button
                variant="text"
                sx={{
                  color: "#64B5F6",
                  "&:hover": {
                    backgroundColor: "rgba(100, 181, 246, 0.1)",
                  }
                }}
              >
                <Edit />
              </Button>
            </ButtonGroup>
          </Box>

          <Box sx={{ marginBottom: 4 }}>
            <Chip
              label={`${product?.price.toLocaleString("ko-KR")}원`}
              sx={{
                backgroundColor: "rgba(255, 138, 101, 0.2)",
                color: "#E64A19",
                fontWeight: 700,
                fontSize: "1.2rem",
                padding: "12px 20px",
                borderRadius: 3,
              }}
            />
          </Box>

          <Typography
            variant="body1"
            sx={{
              marginBottom: 4,
              lineHeight: 1.8,
              color: "#666666",
              fontSize: "1.1rem",
            }}
          >
            {product?.explanation}
          </Typography>

          <ButtonGroup
            orientation="vertical"
            fullWidth
            sx={{
              gap: 2,
              "& .MuiButtonGroup-grouped": {
                borderRadius: 2,
                marginBottom: 1,
              }
            }}
          >
            <Button
              variant="outlined"
              onClick={handleAddCard}
              sx={{
                borderColor: "#FF8A65",
                color: "#E64A19",
                fontWeight: 600,
                padding: "12px 24px",
                fontSize: "1rem",
                "&:hover": {
                  borderColor: "#E64A19",
                  backgroundColor: "rgba(255, 138, 101, 0.1)",
                }
              }}
              startIcon={<ShoppingCartIcon />}
            >
              장바구니 담기
            </Button>
            <Button
              variant="contained"
              onClick={handlePushPurchasePage}
              sx={{
                background: "linear-gradient(135deg, #FF8A65 0%, #FFAB91 100%)",
                color: "#FFFFFF",
                fontWeight: 600,
                padding: "12px 24px",
                fontSize: "1rem",
                boxShadow: "0 4px 12px rgba(255, 138, 101, 0.3)",
                "&:hover": {
                  background: "linear-gradient(135deg, #E64A19 0%, #FF8A65 100%)",
                  boxShadow: "0 6px 16px rgba(255, 138, 101, 0.4)",
                  transform: "translateY(-1px)",
                }
              }}
              startIcon={<PaymentIcon />}
            >
              구매하기
            </Button>
          </ButtonGroup>
        </Paper>
      </Container>

      <Dialog
        open={isDeleteModal}
        onClose={() => setIsDeleteModal(false)}
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
          상품을 정말로 삭제하시겠습니까?
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ color: "#666666" }}>
            이 작업은 되돌릴 수 없습니다.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ padding: 3 }}>
          <Button
            onClick={() => setIsDeleteModal(false)}
            sx={{
              color: "#666666",
              fontWeight: 600,
            }}
          >
            아니요
          </Button>
          <Button
            autoFocus
            onClick={handleDeleteProduct}
            sx={{
              backgroundColor: "#E57373",
              color: "#FFFFFF",
              fontWeight: 600,
              "&:hover": {
                backgroundColor: "#EF5350",
              }
            }}
          >
            네
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
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
          장바구니에 성공적으로 추가하였습니다.
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ color: "#666666" }}>
            장바구니 페이지로 이동하시겠습니까?
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ padding: 3 }}>
          <Button
            onClick={() => setIsModalOpen(false)}
            sx={{
              color: "#666666",
              fontWeight: 600,
            }}
          >
            아니요
          </Button>
          <Button
            onClick={handlePushCartPage}
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
            네
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ProductPage;
