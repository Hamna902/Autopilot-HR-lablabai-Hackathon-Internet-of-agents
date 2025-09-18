import { DollarSign, Users } from "lucide-react";
import { KPICard } from "@/components/dashboard/kpi-card";
import { SimpleChart } from "@/components/dashboard/simple-chart";
import { RecentPayments } from "@/components/dashboard/recent-payments";

export default function Dashboard() {
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Welcome to AutoPilot CRM - Your AI-powered sales automation center
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <KPICard
          title="Total Revenue Generated"
          value="$12,500"
          icon={DollarSign}
          trend="+23.4%"
          trendDirection="up"
          className="animate-slide-up"
        />
        <div className="animate-slide-up" style={{ animationDelay: "0.1s" }}>
          <KPICard
            title="New Customers Acquired"
            value="12"
            icon={Users}
            trend="+5.2%"
            trendDirection="up"
          />
        </div>
      </div>

      {/* Charts and Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="animate-slide-up" style={{ animationDelay: "0.2s" }}>
          <SimpleChart />
        </div>
        <div className="animate-slide-up" style={{ animationDelay: "0.3s" }}>
          <RecentPayments />
        </div>
      </div>
    </div>
  );
}