import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts";
import { Calendar } from "lucide-react";

interface ForecastData {
  date: string;
  risk: number;
  weather: string;
}

interface ForecastChartProps {
  data: ForecastData[];
}

const ForecastChart = ({ data }: ForecastChartProps) => {
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const riskValue = payload[0].value;
      let color = "hsl(var(--safe))";
      if (riskValue > 75) color = "hsl(var(--danger))";
      else if (riskValue > 50) color = "hsl(var(--warning))";
      else if (riskValue > 25) color = "hsl(var(--caution))";

      return (
        <div className="glass rounded-xl p-3 shadow-xl border">
          <p className="font-semibold text-sm">{payload[0].payload.date}</p>
          <p className="text-xs text-muted-foreground">{payload[0].payload.weather}</p>
          <p className="font-bold text-base mt-1" style={{ color }}>
            고립 확률: {riskValue}%
          </p>
        </div>
      );
    }
    return null;
  };

  const getGradientId = (value: number) => {
    if (value <= 25) return "gradientSafe";
    if (value <= 50) return "gradientCaution";
    if (value <= 75) return "gradientWarning";
    return "gradientDanger";
  };

  return (
    <Card className="animate-fade-in border-border/50 overflow-hidden relative group">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

      <CardHeader className="relative z-10">
        <CardTitle className="flex items-center gap-2 text-xl md:text-2xl">
          <Calendar className="w-6 h-6 md:w-7 md:h-7 text-primary" />
          7일 예보
        </CardTitle>
      </CardHeader>
      <CardContent className="relative z-10">
        <ResponsiveContainer width="100%" height={250} className="md:h-[300px]">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="gradientSafe" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(142 76% 36%)" stopOpacity={0.4} />
                <stop offset="95%" stopColor="hsl(142 76% 36%)" stopOpacity={0.05} />
              </linearGradient>
              <linearGradient id="gradientCaution" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(45 93% 47%)" stopOpacity={0.4} />
                <stop offset="95%" stopColor="hsl(45 93% 47%)" stopOpacity={0.05} />
              </linearGradient>
              <linearGradient id="gradientWarning" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(25 95% 53%)" stopOpacity={0.4} />
                <stop offset="95%" stopColor="hsl(25 95% 53%)" stopOpacity={0.05} />
              </linearGradient>
              <linearGradient id="gradientDanger" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(0 84% 60%)" stopOpacity={0.4} />
                <stop offset="95%" stopColor="hsl(0 84% 60%)" stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" className="opacity-20 dark:opacity-10" stroke="hsl(var(--muted-foreground))" />
            <XAxis
              dataKey="date"
              className="text-xs md:text-sm"
              tick={{ fill: "hsl(var(--muted-foreground))" }}
              stroke="hsl(var(--border))"
            />
            <YAxis
              className="text-xs md:text-sm"
              tick={{ fill: "hsl(var(--muted-foreground))" }}
              domain={[0, 100]}
              stroke="hsl(var(--border))"
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="risk"
              stroke="hsl(var(--primary))"
              strokeWidth={2.5}
              fill="url(#gradientSafe)"
            />
            <Line
              type="monotone"
              dataKey="risk"
              stroke="hsl(var(--primary))"
              strokeWidth={2.5}
              dot={{ fill: "hsl(var(--primary))", r: 4, strokeWidth: 2, stroke: "hsl(var(--background))" }}
              activeDot={{ r: 6, strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>

        {/* Weather icons */}
        <div className="grid grid-cols-7 gap-1 md:gap-2 mt-4">
          {data.map((day, index) => (
            <div
              key={index}
              className="flex flex-col items-center gap-0.5 md:gap-1 p-1.5 md:p-2 rounded-lg hover:bg-muted/50 transition-all hover:scale-105 cursor-pointer"
            >
              <span className="text-[10px] md:text-xs text-muted-foreground font-medium">{day.date}</span>
              <span className="text-base md:text-lg">{getWeatherEmoji(day.weather)}</span>
              <span
                className="text-[10px] md:text-xs font-bold"
                style={{
                  color:
                    day.risk <= 25
                      ? "hsl(var(--safe))"
                      : day.risk <= 50
                      ? "hsl(var(--caution))"
                      : day.risk <= 75
                      ? "hsl(var(--warning))"
                      : "hsl(var(--danger))",
                }}
              >
                {day.risk}%
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

const getWeatherEmoji = (weather: string) => {
  if (weather.includes("맑음")) return "☀️";
  if (weather.includes("흐림")) return "☁️";
  if (weather.includes("비")) return "🌧️";
  if (weather.includes("눈")) return "❄️";
  if (weather.includes("바람")) return "💨";
  return "🌤️";
};

export default ForecastChart;
