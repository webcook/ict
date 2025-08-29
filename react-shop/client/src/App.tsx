// App.tsx
import { Route, Routes } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { Layout } from "./components/shared";
import {
  CartPage,
  HomePage,
  NotFoundPage,
  ProductCreatePage,
  ProductPage,
  PurchasePage,
} from "./pages";

// 오렌지 계열의 머터리얼 디자인 테마 생성
const theme = createTheme({
  palette: {
    primary: {
      main: "#FF8A65", // 부드러운 오렌지
      light: "#FFAB91",
      dark: "#E64A19",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#FFCC02", // 제주 감귤색
      light: "#FFD54F",
      dark: "#F57F17",
      contrastText: "#2E2E2E",
    },
    background: {
      default: "#FFF8F0", // 매우 연한 오렌지 크림색
      paper: "#FFFFFF",
    },
    text: {
      primary: "#2E2E2E",
      secondary: "#666666",
    },
    success: {
      main: "#81C784", // 부드러운 연두색
      light: "#A5D6A7",
      dark: "#66BB6A",
    },
    error: {
      main: "#E57373", // 부드러운 연한 빨간색
      light: "#EF9A9A",
      dark: "#EF5350",
    },
    warning: {
      main: "#FFB74D", // 부드러운 연한 주황색
      light: "#FFCC02",
      dark: "#FF9800",
    },
    info: {
      main: "#64B5F6", // 부드러운 연한 파란색
      light: "#90CAF9",
      dark: "#42A5F5",
    },
  },
  typography: {
    fontFamily: "'Noto Sans KR', 'Roboto', 'Helvetica', 'Arial', sans-serif",
    h1: {
      fontWeight: 600,
      color: "#2E2E2E",
    },
    h2: {
      fontWeight: 600,
      color: "#2E2E2E",
    },
    h3: {
      fontWeight: 600,
      color: "#2E2E2E",
    },
    h4: {
      fontWeight: 600,
      color: "#2E2E2E",
    },
    h5: {
      fontWeight: 500,
      color: "#2E2E2E",
    },
    h6: {
      fontWeight: 500,
      color: "#2E2E2E",
    },
    body1: {
      color: "#666666",
    },
    body2: {
      color: "#666666",
    },
  },
  shape: {
    borderRadius: 16, // 더 부드러운 모서리
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: "0 4px 20px rgba(255, 138, 101, 0.1)",
          border: "1px solid rgba(255, 138, 101, 0.1)",
          transition: "all 0.3s ease-in-out",
          "&:hover": {
            boxShadow: "0 8px 30px rgba(255, 138, 101, 0.15)",
            transform: "translateY(-2px)",
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          textTransform: "none",
          fontWeight: 500,
          padding: "10px 24px",
          transition: "all 0.3s ease-in-out",
          "&:hover": {
            transform: "translateY(-1px)",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
          },
        },
        contained: {
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: "0 2px 20px rgba(255, 138, 101, 0.15)",
          background: "linear-gradient(135deg, #FF8A65 0%, #FFAB91 100%)",
        },
      },
    },
    MuiFab: {
      styleOverrides: {
        root: {
          boxShadow: "0 4px 20px rgba(255, 204, 2, 0.4)",
          "&:hover": {
            boxShadow: "0 6px 25px rgba(255, 204, 2, 0.6)",
            transform: "scale(1.05)",
          },
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 20,
          boxShadow: "0 10px 40px rgba(0, 0, 0, 0.1)",
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Layout>
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="create" element={<ProductCreatePage />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="product/:productId" element={<ProductPage />} />
          <Route path="purchase/:productId" element={<PurchasePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Layout>
    </ThemeProvider>
  );
}

export default App;
