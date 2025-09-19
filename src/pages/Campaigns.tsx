import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Eye } from "lucide-react";

const campaignsInProgress = [
  {
    name: "Q4 Software Outreach",
    status: "Lead Gen: 75% Complete",
    progress: 75,
  },
  {
    name: "Local Retail Holiday Campaign",
    status: "Email Follow-up: 45% Complete", 
    progress: 45,
  },
  {
    name: "E-Commerce Conversion Drive",
    status: "Meeting Booking: 90% Complete",
    progress: 90,
  },
];

export default function Campaigns() {
  const [formData, setFormData] = useState({
    name: "",
    audience: "",
    goal: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          variant: "destructive",
          title: "Authentication required",
          description: "Please sign in to create campaigns.",
        });
        return;
      }

      const { error } = await (supabase as any)
        .from('campaigns')
        .insert({
          campaign_name: formData.name,
          target_audience: formData.audience,
          campaign_goal: formData.goal,
          user_id: user.id
        });

      if (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: error.message,
        });
      } else {
        toast({
          title: "Campaign created!",
          description: "Agents are standing by.",
        });
        setFormData({ name: "", audience: "", goal: "" });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "An unexpected error occurred.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Campaigns</h1>
        <p className="text-muted-foreground mt-2">
          Create and manage your AI-powered sales campaigns
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Create New Campaign Form */}
        <Card className="kpi-card animate-slide-up">
          <CardHeader>
            <CardTitle>Create New Campaign</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="campaign-name">Campaign Name</Label>
                <Input
                  id="campaign-name"
                  placeholder="Enter campaign name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="target-audience">Target Audience</Label>
                <Select onValueChange={(value) => setFormData({ ...formData, audience: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select target audience" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="b2b-software">B2B Software</SelectItem>
                    <SelectItem value="local-retail">Local Retail</SelectItem>
                    <SelectItem value="e-commerce">E-Commerce</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="campaign-goal">Campaign Goal</Label>
                <Textarea
                  id="campaign-goal"
                  placeholder="e.g., Generate 25 leads in Texas and schedule follow-up emails."
                  value={formData.goal}
                  onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
                  rows={4}
                />
              </div>

              <Button type="submit" className="w-full btn-gradient" disabled={isSubmitting}>
                {isSubmitting ? "Creating..." : "Launch Campaign"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Campaigns In Progress */}
        <Card className="kpi-card animate-slide-up" style={{ animationDelay: "0.1s" }}>
          <CardHeader>
            <CardTitle>Campaigns In Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {campaignsInProgress.map((campaign, index) => (
                <div key={index} className="space-y-3 p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-foreground">{campaign.name}</h4>
                    <Button variant="outline" size="sm" className="flex items-center gap-2">
                      <Eye className="w-4 h-4" />
                      View Progress
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground">{campaign.status}</p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>{campaign.progress}%</span>
                    </div>
                    <Progress value={campaign.progress} className="h-2" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}