import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const payments = [
  { customer: "Acme Corp", amount: "$2,400", date: "Dec 15, 2024" },
  { customer: "TechStart Inc", amount: "$1,800", date: "Dec 14, 2024" },
  { customer: "Digital Solutions", amount: "$3,200", date: "Dec 13, 2024" },
  { customer: "Growth Co", amount: "$950", date: "Dec 12, 2024" },
];

export function RecentPayments() {
  return (
    <Card className="kpi-card">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Recent Payments</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {payments.map((payment, index) => (
            <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
              <div className="flex flex-col">
                <span className="font-medium text-foreground">{payment.customer}</span>
                <span className="text-sm text-muted-foreground">{payment.date}</span>
              </div>
              <span className="font-semibold text-success">{payment.amount}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}