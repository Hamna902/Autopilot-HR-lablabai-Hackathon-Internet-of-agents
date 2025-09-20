import React, { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously, signInWithCustomToken, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, collection, onSnapshot, addDoc, updateDoc, doc, query } from 'firebase/firestore';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Toaster, toast } from "sonner";
import { Loader2, Plus, Send } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

// Firebase/Firestore Configuration
// MANDATORY: These variables are provided by the canvas environment.
const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
const firebaseConfig = typeof __firebase_config !== 'undefined' ? JSON.parse(__firebase_config) : {};
const initialAuthToken = typeof __initial_auth_token !== 'undefined' ? __initial_auth_token : null;

// Simulated Lead Data from your n8n workflow, for demonstration purposes.
// In a real application, this would come from the Apify scraper.
const MOCK_LEADS = [
  { firstName: "Jane", lastName: "Doe", title: "CEO", email: "jane.doe@example.com", organization: "Example Inc.", status: "Generated" },
  { firstName: "John", lastName: "Smith", title: "Marketing Director", email: "john.smith@acme.com", organization: "Acme Corp.", status: "Generated" },
  { firstName: "Peter", lastName: "Jones", title: "Founder", email: "peter.jones@startup.net", organization: "Startup Solutions", status: "Generated" },
];

// Simplified LLM prompt from your JSON file for email generation
const EMAIL_PROMPT = `
You are a cold-email copywriter.
Goal: produce a SHORT email that feels personal and keeps the core pitch unchanged.
Here is the core pitch:
"I'm reaching out because I believe there’s an opportunity to streamline {{organization}}’s operations by automating time-consuming, repetitive tasks—something that AI-driven automation excels at today."

Based on the recipient's information:
- Recipient Name: {{firstName}}
- Recipient Title: {{title}}
- Organization: {{organization}}

Start with a single, short, friendly ice-breaker sentence (max 15 words) that uses one specific detail. Then, smoothly transition to the core pitch. The total email should be under 100 words. Do not include a subject line, greeting, or sign-off.
`;

const App = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState(null);
  const [dbInstance, setDbInstance] = useState(null);
  const [isAuthReady, setIsAuthReady] = useState(false);

  // Auth state listener and Firebase initialization
  useEffect(() => {
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const db = getFirestore(app);
    setDbInstance(db);

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        // Sign in anonymously if no user is found
        if (initialAuthToken) {
          await signInWithCustomToken(auth, initialAuthToken);
        } else {
          await signInAnonymously(auth);
        }
      }
      setIsAuthReady(true);
    });

    return () => unsubscribe();
  }, []);

  // Firestore snapshot listener
  useEffect(() => {
    if (!isAuthReady || !dbInstance || !userId) return;

    // The appId can sometimes contain extra characters. We extract the core ID.
    const cleanAppId = appId.split('_')[0];
    const leadsCollection = collection(dbInstance, `artifacts/${cleanAppId}/users/${userId}/leads`);
    const q = query(leadsCollection);

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const leadsList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setLeads(leadsList);
    });

    return () => unsubscribe();
  }, [isAuthReady, dbInstance, userId]);

  // Agent 1: Lead Generation Simulation
  const handleGenerateLeads = async () => {
    if (!userId || !isAuthReady) {
      toast.error("Authentication in progress. Please wait.");
      return;
    }
    setLoading(true);
    toast.info("Generating new leads...");
    const cleanAppId = appId.split('_')[0];
    const leadsCollection = collection(dbInstance, `artifacts/${cleanAppId}/users/${userId}/leads`);

    try {
      for (const lead of MOCK_LEADS) {
        // Simulating the n8n HTTP request and data mapping
        await addDoc(leadsCollection, {
          ...lead,
          createdAt: new Date(),
        });
      }
      toast.success("Lead generation complete!");
    } catch (e) {
      console.error("Error adding document: ", e);
      toast.error("Failed to generate leads.");
    } finally {
      setLoading(false);
    }
  };

  // Agent 2: Email Outreach Simulation
  const handleSendEmails = async () => {
    if (!userId || !isAuthReady) {
      toast.error("Authentication in progress. Please wait.");
      return;
    }
    setLoading(true);
    toast.info("Preparing and sending emails...");
    
    try {
      // Filter for leads that haven't had an email prepared yet
      const pendingLeads = leads.filter(lead => lead.status === "Generated");

      // Simulating the LLM chain and database update
      const fetchPromises = pendingLeads.map(async (lead) => {
        // Here, the call would be made to a service like OpenAI.
        // For this hackathon project, we will generate the email client-side
        const personalizedEmail = EMAIL_PROMPT
          .replace("{{firstName}}", lead.firstName)
          .replace("{{title}}", lead.title)
          .replace("{{organization}}", lead.organization)
          .trim();
        
        const cleanAppId = appId.split('_')[0];
        const leadRef = doc(dbInstance, `artifacts/${cleanAppId}/users/${userId}/leads`, lead.id);
        return updateDoc(leadRef, {
          emailCopy: personalizedEmail,
          status: "Email Prepared",
          updatedAt: new Date(),
        });
      });

      await Promise.all(fetchPromises);
      toast.success("Emails prepared successfully!");
    } catch (e) {
      console.error("Error updating document: ", e);
      toast.error("Failed to prepare emails.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <TooltipProvider>
      <div className="flex min-h-screen w-full flex-col bg-slate-950 text-gray-100 font-sans">
        <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b border-gray-800 bg-gray-900 px-6 backdrop-blur-md">
          <h1 className="text-xl font-bold text-indigo-400">AutoPilot CRM Dashboard</h1>
          <div className="ml-auto flex items-center gap-4">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="default" 
                  size="sm" 
                  onClick={handleGenerateLeads} 
                  disabled={!isAuthReady || loading}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-full shadow-lg transition-all duration-300 ease-in-out hover:scale-105 active:scale-95"
                >
                  {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Plus className="h-4 w-4 mr-2" />}
                  Generate Leads
                </Button>
              </TooltipTrigger>
              <TooltipContent className="bg-gray-800 text-gray-200">Simulates the n8n Apollo.io Scraper workflow.</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleSendEmails} 
                  disabled={!isAuthReady || loading}
                  className="border-indigo-600 text-indigo-400 hover:bg-indigo-900/50 hover:text-white font-semibold rounded-full shadow-lg transition-all duration-300 ease-in-out hover:scale-105 active:scale-95"
                >
                  {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Send className="h-4 w-4 mr-2" />}
                  Prepare Emails
                </Button>
              </TooltipTrigger>
              <TooltipContent className="bg-gray-800 text-gray-200">Simulates the n8n LLM Chain and Google Sheets update.</TooltipContent>
            </Tooltip>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-6">
          <div className="grid gap-6">
            <Card className="shadow-2xl border-2 border-indigo-500/50 bg-gray-900 text-gray-200">
              <CardHeader className="border-b border-indigo-500/20">
                <CardTitle className="text-2xl font-bold text-indigo-400">Leads Database</CardTitle>
                <CardDescription className="text-gray-400">
                  Real-time view of leads from your automated agents.
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                {leads.length === 0 && !loading && (
                  <p className="text-center text-gray-500 py-8">
                    No leads found. Click "Generate Leads" to get started.
                  </p>
                )}
                {loading && (
                  <div className="flex items-center justify-center py-8 text-indigo-400">
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    <span>Loading...</span>
                  </div>
                )}
                {leads.length > 0 && (
                  <div className="overflow-x-auto rounded-md border border-gray-800">
                    <Table>
                      <TableHeader className="bg-gray-800">
                        <TableRow>
                          <TableHead className="text-gray-300">First Name</TableHead>
                          <TableHead className="text-gray-300">Last Name</TableHead>
                          <TableHead className="text-gray-300">Title</TableHead>
                          <TableHead className="text-gray-300">Organization</TableHead>
                          <TableHead className="text-gray-300">Email</TableHead>
                          <TableHead className="text-gray-300">Status</TableHead>
                          <TableHead className="text-gray-300">Email Copy</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {leads.map((lead) => (
                          <TableRow key={lead.id} className="border-gray-800 hover:bg-gray-800 transition-colors">
                            <TableCell>{lead.firstName}</TableCell>
                            <TableCell>{lead.lastName}</TableCell>
                            <TableCell>{lead.title}</TableCell>
                            <TableCell>{lead.organization}</TableCell>
                            <TableCell>{lead.email}</TableCell>
                            <TableCell>
                              <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                lead.status === 'Generated' ? 'bg-blue-600 text-white' :
                                lead.status === 'Email Prepared' ? 'bg-emerald-600 text-white' :
                                'bg-gray-600 text-white'
                              }`}>
                                {lead.status}
                              </span>
                            </TableCell>
                            <TableCell>
                                <div className="max-w-xs overflow-hidden text-ellipsis whitespace-nowrap">
                                  {lead.emailCopy || "N/A"}
                                </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
      <Toaster richColors position="bottom-right" />
    </TooltipProvider>
  );
};

export default App;
