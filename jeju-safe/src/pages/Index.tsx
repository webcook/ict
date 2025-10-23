import { useState } from "react";
import RiskGauge from "@/components/RiskGauge";
import WeatherCard from "@/components/WeatherCard";
import TransportStatus from "@/components/TransportStatus";
import ForecastChart from "@/components/ForecastChart";
import TripPlanner from "@/components/TripPlanner";
import ThemeToggle from "@/components/ThemeToggle";
import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

// Mock 데이터
const weatherData = {
  currentRisk: 35,
  windSpeed: 12,
  rainfall: 5,
  waveHeight: 1.5,
  temperature: 18,
  updatedAt: "2025-10-17 14:30",
};

const forecastData = [
  { date: "10/18", risk: 20, weather: "맑음" },
  { date: "10/19", risk: 45, weather: "흐림" },
  { date: "10/20", risk: 70, weather: "비" },
  { date: "10/21", risk: 55, weather: "비" },
  { date: "10/22", risk: 30, weather: "흐림" },
  { date: "10/23", risk: 15, weather: "맑음" },
  { date: "10/24", risk: 10, weather: "맑음" },
];

const flightStatus = {
  operating: 85,
  cancelled: 3,
  delayed: 5,
};

const ferryStatus = {
  jejuPort: true,
  seongsanPort: false,
};

const Index = () => {
  const [lastUpdate, setLastUpdate] = useState(weatherData.updatedAt);

  const handleRefresh = () => {
    const now = new Date();
    const timeStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(
      now.getDate()
    ).padStart(2, "0")} ${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(
      2,
      "0"
    )}`;
    setLastUpdate(timeStr);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 transition-colors duration-300">
      {/* Header */}
      <header className="border-b sticky top-0 bg-background/95 backdrop-blur-xl z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="text-3xl md:text-4xl">
                <img src="/logo.png" alt="logo" className="h-14"/>
              </div>
              <div>
                <h1 className="text-xl md:text-3xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-gradient">
                  제주 고립 확률 예측
                </h1>
                <p className="text-xs md:text-sm text-muted-foreground">실시간 날씨 기반 항공/해운 운항 예측</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <Button
                variant="outline"
                size="sm"
                onClick={handleRefresh}
                className="gap-2 hover:scale-105 transition-transform"
              >
                <RefreshCw className="w-4 h-4" />
                <span className="hidden md:inline">새로고침</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 md:py-12 space-y-8 md:space-y-12">
        {/* Risk Gauge Section */}
        <section className="flex flex-col items-center animate-fade-in">
          <RiskGauge risk={weatherData.currentRisk} />
          <p className="text-xs md:text-sm text-muted-foreground mt-4 flex items-center gap-2">
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
            마지막 업데이트: {lastUpdate}
          </p>
        </section>

        {/* Weather & Transport Section */}
        <section className="space-y-6 md:space-y-8">
          <div className="animate-slide-up">
            <h2 className="text-xl md:text-2xl font-bold mb-4 flex items-center gap-2">
              <span className="text-2xl md:text-3xl">🌤️</span>
              현재 기상 정보
            </h2>
            <WeatherCard data={weatherData} />
          </div>

          <div className="animate-slide-up" style={{ animationDelay: "200ms" }}>
            <h2 className="text-xl md:text-2xl font-bold mb-4 flex items-center gap-2">
              <span className="text-2xl md:text-3xl">🚆</span>
              교통 현황
            </h2>
            <TransportStatus flightStatus={flightStatus} ferryStatus={ferryStatus} />
          </div>
        </section>

        {/* Forecast Chart Section */}
        <section className="animate-slide-up" style={{ animationDelay: "400ms" }}>
          <ForecastChart data={forecastData} />
        </section>

        {/* Info Section */}
        <section className="bg-gradient-to-br from-muted/50 to-muted rounded-2xl md:rounded-3xl p-6 md:p-8 space-y-6 shadow-lg border border-border/50 backdrop-blur-sm animate-slide-up" style={{ animationDelay: "600ms" }}>
          <div>
            <h2 className="text-2xl font-bold mb-3 flex items-center gap-2">
              <span className="text-3xl">ℹ️</span>
              제주 고립이란?
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              태풍, 강풍 등 기상 악화로 인해 제주도와 육지를 오가는 항공편 및 여객선이 중단되어 제주도에
              일시적으로 갇히게 되는 현상입니다. 주로 가을철 태풍 시즌에 자주 발생하며, 여행 계획 시
              반드시 고려해야 합니다.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-3">고립 확률 계산 기준</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-start gap-2">
                <span className="text-danger font-bold">•</span>
                <span>
                  <strong className="text-foreground">풍속</strong>: 14m/s 이상 시 항공 운항에 영향
                </span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-warning font-bold">•</span>
                <span>
                  <strong className="text-foreground">파고</strong>: 2m 이상 시 여객선 운항 중단 가능성
                </span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-caution font-bold">•</span>
                <span>
                  <strong className="text-foreground">강수량</strong>: 30mm 이상 시 시정 악화로 결항 증가
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 pt-4">
            <div className="flex flex-col items-center gap-2 p-3 md:p-4 bg-background/80 backdrop-blur-sm rounded-xl border border-safe/20 hover:scale-105 hover:shadow-lg transition-all duration-300">
              <div className="text-xl md:text-2xl">✅</div>
              <div className="text-xs md:text-sm font-semibold text-safe">안전 (0-25%)</div>
            </div>
            <div className="flex flex-col items-center gap-2 p-3 md:p-4 bg-background/80 backdrop-blur-sm rounded-xl border border-caution/20 hover:scale-105 hover:shadow-lg transition-all duration-300">
              <div className="text-xl md:text-2xl">⚠️</div>
              <div className="text-xs md:text-sm font-semibold text-caution">주의 (26-50%)</div>
            </div>
            <div className="flex flex-col items-center gap-2 p-3 md:p-4 bg-background/80 backdrop-blur-sm rounded-xl border border-warning/20 hover:scale-105 hover:shadow-lg transition-all duration-300">
              <div className="text-xl md:text-2xl">🚨</div>
              <div className="text-xs md:text-sm font-semibold text-warning">위험 (51-75%)</div>
            </div>
            <div className="flex flex-col items-center gap-2 p-3 md:p-4 bg-background/80 backdrop-blur-sm rounded-xl border border-danger/20 hover:scale-105 hover:shadow-lg transition-all duration-300">
              <div className="text-xl md:text-2xl">🔴</div>
              <div className="text-xs md:text-sm font-semibold text-danger">고립 가능 (76-100%)</div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center text-xs md:text-sm text-muted-foreground pb-6 md:pb-8 space-y-2">
          <p className="leading-relaxed">본 서비스는 예측 정보이며, 실제 운항 상황은 기상청 및 각 교통사 공식 발표를 확인하세요.</p>
          <p className="opacity-75">© 2025 제주 고립 확률 예측. All rights reserved.</p>
        </footer>
      </main>

      {/* Floating Trip Planner Button */}
      <TripPlanner forecastData={forecastData} />
    </div>
  );
};

export default Index;
