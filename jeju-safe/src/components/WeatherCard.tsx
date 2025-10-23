import { Wind, CloudRain, Waves, Thermometer } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface WeatherData {
  windSpeed: number;
  rainfall: number;
  waveHeight: number;
  temperature: number;
}

interface WeatherCardProps {
  data: WeatherData;
}

const WeatherCard = ({ data }: WeatherCardProps) => {
  const weatherItems = [
    {
      icon: Wind,
      label: "풍속",
      value: data.windSpeed,
      unit: "m/s",
      color: data.windSpeed > 14 ? "text-danger" : data.windSpeed > 10 ? "text-warning" : "text-primary",
    },
    {
      icon: CloudRain,
      label: "강수량",
      value: data.rainfall,
      unit: "mm",
      color: data.rainfall > 30 ? "text-danger" : data.rainfall > 15 ? "text-warning" : "text-primary",
    },
    {
      icon: Waves,
      label: "파고",
      value: data.waveHeight,
      unit: "m",
      color: data.waveHeight > 2 ? "text-danger" : data.waveHeight > 1.5 ? "text-warning" : "text-primary",
    },
    {
      icon: Thermometer,
      label: "기온",
      value: data.temperature,
      unit: "°C",
      color: "text-primary",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
      {weatherItems.map((item, index) => (
        <Card
          key={index}
          className="hover-scale animate-fade-in overflow-hidden relative group border-border/50 hover:border-primary/30 transition-all"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          {/* Gradient overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

          <CardContent className="p-4 md:p-6 flex flex-col items-center gap-2 md:gap-3 relative z-10">
            <item.icon className={`w-8 h-8 md:w-10 md:h-10 ${item.color} transition-transform group-hover:scale-110`} />
            <div className="text-center">
              <div className={`text-2xl md:text-3xl font-bold ${item.color}`}>
                {item.value}
                <span className="text-lg md:text-xl ml-1">{item.unit}</span>
              </div>
              <div className="text-muted-foreground text-xs md:text-sm mt-1">{item.label}</div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default WeatherCard;
