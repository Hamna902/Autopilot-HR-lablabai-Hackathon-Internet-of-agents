import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Edit3, CheckCircle, Clock } from "lucide-react";

const contentItems = [
  {
    id: 1,
    campaign: "Q4 Software Outreach",
    contentType: "Email Outreach",
    status: "Pending Review",
    content: "Hi {{firstName}},\n\nI noticed your company has been expanding rapidly in the software space. Our AI-powered sales automation platform has helped similar companies increase their lead conversion by 40%.\n\nWould you be interested in a 15-minute demo to see how we can help streamline your sales process?\n\nBest regards,\nAI Sales Agent"
  },
  {
    id: 2,
    campaign: "Local Retail Holiday Campaign",
    contentType: "Follow-up Email",
    status: "Pending Review",
    content: "Hello {{firstName}},\n\nThe holiday season is approaching fast, and retailers who start their campaigns early see 60% better results.\n\nOur platform can help you:\n- Automate customer outreach\n- Personalize marketing messages\n- Track campaign performance\n\nReady to boost your holiday sales?\n\nWarm regards,\nYour AutoPilot Team"
  },
  {
    id: 3,
    campaign: "E-Commerce Conversion Drive",
    contentType: "LinkedIn Message",
    status: "Pending Review",
    content: "Hi {{firstName}},\n\nSaw your recent post about e-commerce growth challenges. Our AI automation has helped e-commerce stores increase conversion rates by 35% on average.\n\nInterested in learning how?\n\nBest,\nAI Assistant"
  },
];

export default function ContentReview() {
  const [selectedContent, setSelectedContent] = useState<typeof contentItems[0] | null>(null);
  const [editedContent, setEditedContent] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleReviewClick = (item: typeof contentItems[0]) => {
    setSelectedContent(item);
    setEditedContent(item.content);
    setIsModalOpen(true);
  };

  const handleApprove = () => {
    console.log("Approved and sent:", selectedContent?.id);
    setIsModalOpen(false);
  };

  const handleEdit = () => {
    console.log("Saved edited content:", editedContent);
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Content Review</h1>
        <p className="text-muted-foreground mt-2">
          Review and approve AI-generated content before it goes live
        </p>
      </div>

      {/* Content Table */}
      <Card className="kpi-card animate-slide-up">
        <CardHeader>
          <CardTitle>Generated Content Awaiting Approval</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Campaign</TableHead>
                <TableHead>Content Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {contentItems.map((item) => (
                <TableRow key={item.id} className="hover:bg-muted/30">
                  <TableCell className="font-medium">{item.campaign}</TableCell>
                  <TableCell>{item.contentType}</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {item.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                      <DialogTrigger asChild>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleReviewClick(item)}
                          className="flex items-center gap-2"
                        >
                          <Edit3 className="w-4 h-4" />
                          Review/Edit
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>Review Content</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="font-medium">Campaign:</span>
                              <p className="text-muted-foreground">{selectedContent?.campaign}</p>
                            </div>
                            <div>
                              <span className="font-medium">Content Type:</span>
                              <p className="text-muted-foreground">{selectedContent?.contentType}</p>
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Content:</label>
                            <Textarea
                              value={editedContent}
                              onChange={(e) => setEditedContent(e.target.value)}
                              rows={10}
                              className="font-mono text-sm"
                            />
                          </div>
                          
                          <div className="flex justify-end space-x-2">
                            <Button variant="outline" onClick={handleEdit}>
                              Edit Draft
                            </Button>
                            <Button onClick={handleApprove} className="btn-gradient flex items-center gap-2">
                              <CheckCircle className="w-4 h-4" />
                              Approve & Send
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}