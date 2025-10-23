import { Plane, Ship, CheckCircle2, XCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface FlightStatus {
  operating: number;
  cancelled: number;
  delayed: number;
}

interface FerryStatus {
  jejuPort: boolean;
  seongsanPort: boolean;
}

interface TransportStatusProps {
  flightStatus: FlightStatus;
  ferryStatus: FerryStatus;
}

const TransportStatus = ({ flightStatus, ferryStatus }: TransportStatusProps) => {
  return (
    <div className="grid md:grid-cols-2 gap-3 md:gap-4">
      {/* Flight Status */}
      <Card className="animate-fade-in hover-scale overflow-hidden relative group border-border/50">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

        <CardHeader className="pb-3 md:pb-4 relative z-10">
          <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
            <Plane className="w-5 h-5 md:w-6 md:h-6 text-primary transition-transform group-hover:translate-x-1" />
            제주공항 운항 현황
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 md:space-y-4 relative z-10">
          <div className="flex items-center justify-between p-3 rounded-lg bg-gradient-to-r from-primary/10 to-transparent">
            <span className="text-sm md:text-base text-muted-foreground">정상 운항률</span>
            <span className="text-xl md:text-2xl font-bold text-primary">{flightStatus.operating}%</span>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs md:text-sm p-2 rounded-lg hover:bg-muted/50 transition-colors">
              <span className="text-muted-foreground">결항</span>
              <span className={`font-semibold ${flightStatus.cancelled > 0 ? "text-danger" : "text-safe"}`}>
                {flightStatus.cancelled}편
              </span>
            </div>
            <div className="flex items-center justify-between text-xs md:text-sm p-2 rounded-lg hover:bg-muted/50 transition-colors">
              <span className="text-muted-foreground">지연</span>
              <span className={`font-semibold ${flightStatus.delayed > 0 ? "text-warning" : "text-safe"}`}>
                {flightStatus.delayed}편
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Ferry Status */}
      <Card className="animate-fade-in hover-scale overflow-hidden relative group border-border/50" style={{ animationDelay: "100ms" }}>
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

        <CardHeader className="pb-3 md:pb-4 relative z-10">
          <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
            <Ship className="w-5 h-5 md:w-6 md:h-6 text-primary transition-transform group-hover:translate-x-1" />
            여객선 운항 현황
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 md:space-y-4 relative z-10">
          <div className="space-y-2.5 md:space-y-3">
            <div className="flex items-center justify-between p-2.5 md:p-3 rounded-lg bg-muted/80 hover:bg-muted transition-colors border border-border/30">
              <span className="text-sm md:text-base font-medium">제주항</span>
              <div className="flex items-center gap-1.5 md:gap-2">
                {ferryStatus.jejuPort ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-safe" />
                    <span className="text-xs md:text-sm text-safe font-semibold">운항 중</span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-4 h-4 md:w-5 md:h-5 text-danger" />
                    <span className="text-xs md:text-sm text-danger font-semibold">운항 중단</span>
                  </>
                )}
              </div>
            </div>
            <div className="flex items-center justify-between p-2.5 md:p-3 rounded-lg bg-muted/80 hover:bg-muted transition-colors border border-border/30">
              <span className="text-sm md:text-base font-medium">성산항</span>
              <div className="flex items-center gap-1.5 md:gap-2">
                {ferryStatus.seongsanPort ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-safe" />
                    <span className="text-xs md:text-sm text-safe font-semibold">운항 중</span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-4 h-4 md:w-5 md:h-5 text-danger" />
                    <span className="text-xs md:text-sm text-danger font-semibold">운항 중단</span>
                  </>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TransportStatus;
