// ProductCreateForm.tsx
import {
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Typography,
  Paper,
  Box,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import { ThumbnailUploader } from ".";
import useAsync from "../../hooks/useAsync";
import { createProduct, modifyThumbnail } from "../../utils/api";

const ProductCreateForm = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [explanation, setExplanation] = useState("");
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [createdProductId, setCreatedProductId] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(Number(event.target.value));
  };

  const handleExplanationChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setExplanation(event.target.value);
  };

  const { request: createProductRequest } = useAsync(createProduct, {
    initialRequest: false,
  });

  const { request: thumbnailUploadRequest } = useAsync(modifyThumbnail, {
    initialRequest: false,
  });

  const handlePushProductPage = () => {
    setIsModalOpen(false);
    navigate(`/product/${createdProductId}`);
  };

  const handleCreateProduct = async (event: React.FormEvent) => {
    event.preventDefault();

    const createProductResponse = await createProductRequest({
      name,
      explanation,
      price,
    });

    if (thumbnail) {
      await thumbnailUploadRequest(
        createProductResponse.data.product.id,
        thumbnail
      );
    }

    setCreatedProductId(createProductResponse.data.product.id);
    setIsModalOpen(true);
  };

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
          <Typography
            variant="h3"
            align="center"
            gutterBottom
            sx={{
              fontWeight: 700,
              color: "#2E2E2E",
              marginBottom: 4,
            }}
          >
            ➕ 상품 등록하기
          </Typography>

          <form onSubmit={handleCreateProduct}>
            <Box sx={{ marginBottom: 3 }}>
              <TextField
                label="상품 이름"
                fullWidth
                value={name}
                onChange={handleNameChange}
                margin="normal"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                    "&:hover fieldset": {
                      borderColor: "#FF8A65",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#E64A19",
                    },
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: "#E64A19",
                  },
                }}
              />
            </Box>

            <Box sx={{ marginBottom: 3 }}>
              <TextField
                label="가격"
                type="number"
                fullWidth
                value={price}
                onChange={handlePriceChange}
                margin="normal"
                InputProps={{
                  startAdornment: <Typography sx={{ color: "#666666", mr: 1 }}>₩</Typography>,
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                    "&:hover fieldset": {
                      borderColor: "#FF8A65",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#E64A19",
                    },
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: "#E64A19",
                  },
                }}
              />
            </Box>

            <Box sx={{ marginBottom: 3 }}>
              <TextField
                label="상품 설명"
                fullWidth
                multiline
                rows={4}
                value={explanation}
                onChange={handleExplanationChange}
                margin="normal"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                    "&:hover fieldset": {
                      borderColor: "#FF8A65",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#E64A19",
                    },
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: "#E64A19",
                  },
                }}
              />
            </Box>

            <Box sx={{ marginBottom: 4 }}>
              <ThumbnailUploader
                value={thumbnail}
                onChange={(file) => setThumbnail(file)}
              />
            </Box>

            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                marginTop: 2,
                background: "linear-gradient(135deg, #FF8A65 0%, #FFAB91 100%)",
                color: "#FFFFFF",
                fontWeight: 600,
                padding: "14px 24px",
                fontSize: "1.1rem",
                borderRadius: 2,
                boxShadow: "0 4px 12px rgba(255, 138, 101, 0.3)",
                "&:hover": {
                  background: "linear-gradient(135deg, #E64A19 0%, #FF8A65 100%)",
                  boxShadow: "0 6px 16px rgba(255, 138, 101, 0.4)",
                  transform: "translateY(-1px)",
                }
              }}
              startIcon={<AddIcon />}
            >
              상품 등록하기
            </Button>
          </form>
        </Paper>
      </Container>

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
          🎉 상품을 성공적으로 추가했습니다!
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ color: "#666666" }}>
            확인을 누르면 상품상세 페이지로 이동합니다.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ padding: 3 }}>
          <Button
            onClick={handlePushProductPage}
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

export default ProductCreateForm;
