import { Button, Card, CardMedia, Typography, Box } from "@mui/material";
import { ChangeEvent, useRef } from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

type Props = {
  value: File | null;
  onChange: (value: File | null) => void;
};

const ThumbnailUploader = ({ value, onChange }: Props) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) onChange(event.target.files[0]);
  };

  const handleButtonClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  return (
    <>
      <input
        type="file"
        multiple={false}
        accept="image/*"
        onChange={handleChangeInput}
        hidden
        ref={inputRef}
      />
      <Card
        sx={{
          padding: 3,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          borderRadius: 3,
          background: "linear-gradient(145deg, #ffffff 0%, #fff8f0 100%)",
          border: "2px dashed rgba(255, 138, 101, 0.3)",
          boxShadow: "0 2px 12px rgba(255, 138, 101, 0.06)",
          transition: "all 0.3s ease-in-out",
          "&:hover": {
            borderColor: "rgba(255, 138, 101, 0.6)",
            boxShadow: "0 4px 20px rgba(255, 138, 101, 0.1)",
          }
        }}
      >
        {value ? (
          <Box sx={{ width: "100%", textAlign: "center" }}>
            <CardMedia
              component="img"
              alt={value.name}
              height={250}
              sx={{
                objectFit: "cover",
                marginBottom: 2,
                borderRadius: 2,
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
              }}
              src={URL.createObjectURL(value)}
            />
            <Typography
              variant="body2"
              sx={{
                color: "#666666",
                marginBottom: 2,
                fontStyle: "italic",
              }}
            >
              {value.name}
            </Typography>
            <Button
              variant="outlined"
              onClick={handleButtonClick}
              sx={{
                borderColor: "#FF8A65",
                color: "#E64A19",
                fontWeight: 600,
                borderRadius: 2,
                "&:hover": {
                  borderColor: "#E64A19",
                  backgroundColor: "rgba(255, 138, 101, 0.1)",
                }
              }}
            >
              다른 이미지 선택
            </Button>
          </Box>
        ) : (
          <Box sx={{ textAlign: "center" }}>
            <CloudUploadIcon
              sx={{
                fontSize: 64,
                color: "#FF8A65",
                marginBottom: 2,
              }}
            />
            <Typography
              variant="h6"
              sx={{
                color: "#2E2E2E",
                fontWeight: 600,
                marginBottom: 1,
              }}
            >
              상품 이미지 업로드
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: "#666666",
                marginBottom: 3,
              }}
            >
              클릭하여 상품 이미지를 선택해주세요
            </Typography>
            <Button
              variant="contained"
              onClick={handleButtonClick}
              sx={{
                background: "linear-gradient(135deg, #FF8A65 0%, #FFAB91 100%)",
                color: "#FFFFFF",
                fontWeight: 600,
                borderRadius: 2,
                padding: "10px 24px",
                boxShadow: "0 2px 8px rgba(255, 138, 101, 0.3)",
                "&:hover": {
                  background: "linear-gradient(135deg, #E64A19 0%, #FF8A65 100%)",
                  boxShadow: "0 4px 12px rgba(255, 138, 101, 0.4)",
                  transform: "translateY(-1px)",
                }
              }}
              startIcon={<CloudUploadIcon />}
            >
              이미지 선택하기
            </Button>
          </Box>
        )}
      </Card>
    </>
  );
};

export default ThumbnailUploader;
