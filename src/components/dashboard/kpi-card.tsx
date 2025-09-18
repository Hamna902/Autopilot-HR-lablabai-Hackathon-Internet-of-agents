import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface KPICardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  trend?: string;
  trendDirection?: "up" | "down";
  className?: string;
}

export function KPICard({ 
  title, 
  value, 
  icon: Icon, 
  trend, 
  trendDirection,
  className 
}: KPICardProps) {
  return (
    <div className={cn("kpi-card p-6 rounded-xl", className)}>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-3xl font-bold text-foreground mt-2">{value}</p>
          {trend && (
            <div className="flex items-center mt-2 space-x-1">
              <span 
                className={cn(
                  "text-sm font-medium",
                  trendDirection === "up" ? "text-success" : "text-destructive"
                )}
              >
                {trendDirection === "up" ? "↗" : "↘"} {trend}
              </span>
              <span className="text-xs text-muted-foreground">vs last month</span>
            </div>
          )}
        </div>
        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
          <Icon className="w-6 h-6 text-primary" />
        </div>
      </div>
    </div>
  );
}