import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CalendarCheck } from "lucide-react";
import { addDays, format } from "date-fns";
import { ko } from "date-fns/locale";
import { DateRange } from "react-day-picker";

interface TripPlannerProps {
  forecastData: Array<{ date: string; risk: number }>;
}

const TripPlanner = ({ forecastData }: TripPlannerProps) => {
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [open, setOpen] = useState(false);

  const calculateTripRisk = () => {
    if (!dateRange?.from || !dateRange?.to) return null;
    
    const departureDate = dateRange.from;
    const returnDate = dateRange.to;

    const tripDays = Math.ceil((returnDate.getTime() - departureDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;
    let totalRisk = 0;
    let count = 0;
    let maxRisk = 0;

    for (let i = 0; i < tripDays; i++) {
      const currentDate = addDays(departureDate, i);
      const dateStr = format(currentDate, "M/d");
      const forecast = forecastData.find((f) => f.date === dateStr);
      if (forecast) {
        totalRisk += forecast.risk;
        maxRisk = Math.max(maxRisk, forecast.risk);
        count++;
      }
    }

    const avgRisk = count > 0 ? totalRisk / count : 0;

    return {
      avgRisk: Math.round(avgRisk),
      maxRisk,
      tripDays,
    };
  };

  const tripRisk = calculateTripRisk();

  const getRecommendation = (avgRisk: number, maxRisk: number) => {
    if (maxRisk > 75) {
      return {
        status: "일정 변경 권장",
        message: "여행 기간 중 고립 가능성이 매우 높은 날이 있습니다.",
        color: "danger",
        emoji: "🚨",
      };
    } else if (avgRisk > 50 || maxRisk > 50) {
      return {
        status: "주의 필요",
        message: "여행 일정에 주의가 필요합니다. 날씨를 계속 확인하세요.",
        color: "warning",
        emoji: "⚠️",
      };
    } else if (avgRisk > 25) {
      return {
        status: "주의 필요",
        message: "대체로 안전하지만 일부 날씨 변동이 예상됩니다.",
        color: "caution",
        emoji: "⚡",
      };
    } else {
      return {
        status: "여행 가능",
        message: "안전한 여행 기간입니다!",
        color: "safe",
        emoji: "✅",
      };
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          size="lg"
          className="fixed bottom-6 right-6 md:bottom-8 md:right-8 rounded-full shadow-2xl h-14 md:h-16 px-6 md:px-8 text-base md:text-lg hover-scale z-40 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
        >
          <CalendarCheck className="w-5 h-5 md:w-6 md:h-6 mr-2" />
          <span className="hidden sm:inline">여행 일정 체크</span>
          <span className="sm:hidden">일정 체크</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl md:text-2xl">여행 일정 체크</DialogTitle>
          <DialogDescription className="text-sm">출발일과 귀가일을 선택하여 고립 확률을 확인하세요.</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 md:space-y-6">
          <div>
            <label className="text-xs md:text-sm font-semibold mb-2 md:mb-3 block text-center">
              출발일과 귀가일을 선택하세요
            </label>
            <div className="flex justify-center">
              <Calendar
                mode="range"
                selected={dateRange}
                onSelect={setDateRange}
                className="rounded-lg border pointer-events-auto"
                locale={ko}
                numberOfMonths={1}
                disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
              />
            </div>
          </div>

          {tripRisk && dateRange?.from && dateRange?.to && (
            <div className="animate-fade-in">
              <div className="glass rounded-xl md:rounded-2xl p-4 md:p-6 space-y-3 md:space-y-4 border shadow-lg">
                <div className="flex items-center justify-between border-b pb-2 md:pb-3">
                  <span className="text-xs md:text-sm text-muted-foreground">선택한 기간</span>
                  <span className="font-semibold text-sm md:text-base">
                    {format(dateRange.from, "M월 d일", { locale: ko })} - {format(dateRange.to, "M월 d일", { locale: ko })}
                  </span>
                </div>
                <div className="flex items-center justify-between p-2 md:p-3 rounded-lg bg-background/50">
                  <span className="text-xs md:text-sm text-muted-foreground">여행 기간</span>
                  <span className="font-semibold text-sm md:text-base">{tripRisk.tripDays}일</span>
                </div>
                <div className="flex items-center justify-between p-2 md:p-3 rounded-lg bg-background/50">
                  <span className="text-xs md:text-sm text-muted-foreground">평균 고립 확률</span>
                  <span
                    className="text-xl md:text-2xl font-bold"
                    style={{
                      color: `hsl(var(--${
                        tripRisk.avgRisk <= 25
                          ? "safe"
                          : tripRisk.avgRisk <= 50
                          ? "caution"
                          : tripRisk.avgRisk <= 75
                          ? "warning"
                          : "danger"
                      }))`,
                    }}
                  >
                    {tripRisk.avgRisk}%
                  </span>
                </div>
                <div className="flex items-center justify-between p-2 md:p-3 rounded-lg bg-background/50">
                  <span className="text-xs md:text-sm text-muted-foreground">최대 고립 확률</span>
                  <span
                    className="text-lg md:text-xl font-bold"
                    style={{
                      color: `hsl(var(--${
                        tripRisk.maxRisk <= 25
                          ? "safe"
                          : tripRisk.maxRisk <= 50
                          ? "caution"
                          : tripRisk.maxRisk <= 75
                          ? "warning"
                          : "danger"
                      }))`,
                    }}
                  >
                    {tripRisk.maxRisk}%
                  </span>
                </div>

                {(() => {
                  const recommendation = getRecommendation(tripRisk.avgRisk, tripRisk.maxRisk);
                  return (
                    <div className="border-t pt-3 md:pt-4 mt-3 md:mt-4">
                      <div className="flex items-start gap-2 md:gap-3 p-3 rounded-lg bg-gradient-to-r from-background to-muted/30">
                        <span className="text-2xl md:text-3xl">{recommendation.emoji}</span>
                        <div className="flex-1">
                          <div
                            className="font-bold text-base md:text-lg"
                            style={{ color: `hsl(var(--${recommendation.color}))` }}
                          >
                            {recommendation.status}
                          </div>
                          <div className="text-xs md:text-sm text-muted-foreground mt-1">{recommendation.message}</div>
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TripPlanner;
