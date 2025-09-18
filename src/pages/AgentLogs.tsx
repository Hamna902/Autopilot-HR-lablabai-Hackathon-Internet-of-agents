import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search, Mail, Users, Calendar, TrendingUp } from "lucide-react";

const agentActivities = [
  {
    id: 1,
    agent: "🕵️ Lead Gen Agent",
    action: "Scraped 10 new leads from LinkedIn targeting B2B software companies",
    timestamp: "2 minutes ago",
    type: "lead-generation",
    icon: Search,
  },
  {
    id: 2,
    agent: "📧 Email Agent",
    action: "Sent personalized follow-up emails to 15 prospects from Q4 Software Outreach campaign",
    timestamp: "8 minutes ago",
    type: "email",
    icon: Mail,
  },
  {
    id: 3,
    agent: "📅 Meeting Agent",
    action: "Scheduled 3 demo calls for this week with qualified prospects",
    timestamp: "15 minutes ago",
    type: "scheduling",
    icon: Calendar,
  },
  {
    id: 4,
    agent: "🔍 Research Agent",
    action: "Analyzed competitor pricing for 5 target accounts and updated lead scoring",
    timestamp: "23 minutes ago",
    type: "research",
    icon: TrendingUp,
  },
  {
    id: 5,
    agent: "👥 CRM Agent",
    action: "Updated 12 contact records with new company information and job titles",
    timestamp: "35 minutes ago",
    type: "data-update",
    icon: Users,
  },
  {
    id: 6,
    agent: "📧 Email Agent",
    action: "Generated 8 personalized email templates for Local Retail Holiday Campaign",
    timestamp: "45 minutes ago",
    type: "content-generation",
    icon: Mail,
  },
  {
    id: 7,
    agent: "🕵️ Lead Gen Agent",
    action: "Identified 25 high-value prospects matching e-commerce criteria",
    timestamp: "1 hour ago",
    type: "lead-generation",
    icon: Search,
  },
  {
    id: 8,
    agent: "📅 Meeting Agent",
    action: "Sent calendar invites for 4 confirmed meetings next week",
    timestamp: "1 hour ago",
    type: "scheduling",
    icon: Calendar,
  },
];

const getTypeColor = (type: string) => {
  switch (type) {
    case "lead-generation":
      return "bg-primary/10 text-primary";
    case "email":
      return "bg-blue-500/10 text-blue-500";
    case "scheduling":
      return "bg-success/10 text-success";
    case "research":
      return "bg-purple-500/10 text-purple-500";
    case "data-update":
      return "bg-orange-500/10 text-orange-500";
    case "content-generation":
      return "bg-pink-500/10 text-pink-500";
    default:
      return "bg-muted text-muted-foreground";
  }
};

export default function AgentLogs() {
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Agent Logs</h1>
        <p className="text-muted-foreground mt-2">
          Real-time activity feed from your AI sales agents
        </p>
      </div>

      {/* Activity Feed */}
      <Card className="kpi-card animate-slide-up">
        <CardHeader>
          <CardTitle>AI Agent Activity Timeline</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[600px] pr-4">
            <div className="space-y-6">
              {agentActivities.map((activity, index) => (
                <div key={activity.id} className="activity-item">
                  <div className="flex items-start space-x-4 p-4 rounded-lg bg-muted/20 hover:bg-muted/30 transition-colors">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <activity.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0 space-y-2">
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className={getTypeColor(activity.type)}>
                          {activity.agent}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {activity.timestamp}
                        </span>
                      </div>
                      <p className="text-sm text-foreground leading-relaxed">
                        {activity.action}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}