import { useEffect, useState } from "react";

interface RiskGaugeProps {
  risk: number;
}

const RiskGauge = ({ risk }: RiskGaugeProps) => {
  const [animatedRisk, setAnimatedRisk] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedRisk(risk);
    }, 100);
    return () => clearTimeout(timer);
  }, [risk]);

  const getRiskColor = (value: number) => {
    if (value <= 25) return "safe";
    if (value <= 50) return "caution";
    if (value <= 75) return "warning";
    return "danger";
  };

  const getRiskMessage = (value: number) => {
    if (value <= 25) return { text: "안전합니다", emoji: "✅" };
    if (value <= 50) return { text: "주의가 필요합니다", emoji: "⚠️" };
    if (value <= 75) return { text: "위험합니다", emoji: "🚨" };
    return { text: "고립 가능성 높음", emoji: "🔴" };
  };

  const getSafetyTips = (value: number) => {
    if (value <= 50) return null;
    if (value <= 75) {
      return [
        "여행 일정 변경을 고려하세요",
        "날씨 예보를 수시로 확인하세요",
        "대체 교통편을 미리 알아보세요",
        "여행자 보험 가입을 확인하세요"
      ];
    }
    return [
      "여행 연기를 강력히 권장합니다",
      "비상 연락망을 확보하세요",
      "충분한 식량과 물을 준비하세요",
      "현지 안전 정보를 확인하세요",
      "가족에게 여행 일정을 공유하세요"
    ];
  };

  const riskColor = getRiskColor(animatedRisk);
  const riskMessage = getRiskMessage(animatedRisk);
  const safetyTips = getSafetyTips(animatedRisk);
  const circumference = 2 * Math.PI * 120;
  const strokeDashoffset = circumference - (animatedRisk / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-4 md:gap-6 p-4 md:p-8">
      <div className="relative w-64 h-64 md:w-80 md:h-80">
        {/* Background glow effect */}
        <div
          className="absolute inset-0 rounded-full blur-3xl opacity-20 transition-all duration-1000"
          style={{ backgroundColor: `hsl(var(--${riskColor}))` }}
        />

        {/* Background circle - Mobile */}
        <svg className="w-full h-full transform -rotate-90 relative z-10 md:hidden" viewBox="0 0 256 256">
          <circle
            cx="128"
            cy="128"
            r="100"
            fill="none"
            stroke="currentColor"
            strokeWidth="20"
            className="text-muted dark:opacity-10"
            opacity="0.15"
          />
          {/* Progress circle */}
          <circle
            cx="128"
            cy="128"
            r="100"
            fill="none"
            stroke="currentColor"
            strokeWidth="20"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className={`text-${riskColor} transition-all duration-1000 ease-out drop-shadow-lg`}
            style={{
              stroke: `hsl(var(--${riskColor}))`,
              filter: `drop-shadow(0 0 8px hsl(var(--${riskColor}) / 0.5))`,
            }}
          />
        </svg>

        {/* Background circle - Desktop */}
        <svg className="w-full h-full transform -rotate-90 relative z-10 hidden md:block" viewBox="0 0 320 320">
          <circle
            cx="160"
            cy="160"
            r="120"
            fill="none"
            stroke="currentColor"
            strokeWidth="24"
            className="text-muted dark:opacity-10"
            opacity="0.15"
          />
          {/* Progress circle */}
          <circle
            cx="160"
            cy="160"
            r="120"
            fill="none"
            stroke="currentColor"
            strokeWidth="24"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className={`text-${riskColor} transition-all duration-1000 ease-out drop-shadow-lg`}
            style={{
              stroke: `hsl(var(--${riskColor}))`,
              filter: `drop-shadow(0 0 8px hsl(var(--${riskColor}) / 0.5))`,
            }}
          />
        </svg>

        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
          <div className="text-5xl md:text-7xl font-bold animate-fade-in" style={{ color: `hsl(var(--${riskColor}))` }}>
            {Math.round(animatedRisk)}%
          </div>
          <div className="text-muted-foreground text-base md:text-lg mt-2">고립 확률</div>
        </div>
      </div>

      {/* Status message */}
      <div className="text-center animate-fade-in">
        <div className="text-3xl md:text-4xl mb-2">{riskMessage.emoji}</div>
        <div className="text-xl md:text-2xl font-semibold" style={{ color: `hsl(var(--${riskColor}))` }}>
          {riskMessage.text}
        </div>
      </div>

      {/* Safety tips for high risk */}
      {safetyTips && (
        <div className="w-full max-w-md animate-fade-in">
          <div className="glass rounded-xl md:rounded-2xl p-5 md:p-6 shadow-lg border-l-4" style={{ borderLeftColor: `hsl(var(--${riskColor}))` }}>
            <h3 className="text-base md:text-lg font-semibold mb-4 flex items-center gap-2">
              <span>⚡</span>
              <span>대처방안</span>
            </h3>
            <ul className="space-y-2.5">
              {safetyTips.map((tip, index) => (
                <li key={index} className="flex items-start gap-2 text-xs md:text-sm text-muted-foreground hover:text-foreground transition-colors">
                  <span className="mt-0.5 font-bold" style={{ color: `hsl(var(--${riskColor}))` }}>•</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default RiskGauge;
