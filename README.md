The SMB Sales & Marketing Squad: Multi-Agent Automation Dashboard 🚀
Project Overview
Theme: Internet of Agents (Multi-Agent Workflow Automation for SMB Sales & Marketing)

This project delivers an intelligent, affordable, and fully automated sales and marketing system for Small to Medium Businesses (SMBs). It utilizes a team of specialized AI agents, all orchestrated via a simple Human-in-the-Loop dashboard built with Lovable AI.

The Multi-Agent Workflow
Lead Generation Agent: Uses Apify for targeted data scraping and Apollo API for lead enrichment.

Marketing Content Agent: Applies AI/ML to generate personalized emails and messages.

Sales Outreach Agent: Executes campaigns via Gmail API and logs all performance data to Google Sheets.

💻 Technologies Used
Category	Tools & Frameworks
Frontend/UI	Lovable AI, React, Vite, TypeScript, Tailwind CSS, shadcn-ui
Agent Backend	AI/ML (LLM Integration), Python/Node.js (for agent logic)
APIs & Data	Apollo API, Apify, Google Sheets, Gmail
Deployment	Vercel (Frontend & Serverless Functions)

Export to Sheets
⚙️ Quick Start (Local Development)
This project requires Node.js and npm installed.

Clone the Repository:

Bash

git clone <YOUR_GIT_URL>
cd <YOUR_PROJECT_NAME>
Install Dependencies:

Bash

npm i
Start the Development Server:

Bash

npm run dev
Backend Environment: Ensure your environment variables (APOLLO_API_KEY, LLM_API_KEY, etc.) are configured locally to run the backend agents and API calls.

 Deployment (Hackathon Submission)
Frontend & API Deployment on Vercel
The frontend (Lovable AI project) and the backend API endpoints (as Serverless Functions) are deployed together on Vercel.

Vercel Connection: The project is deployed via a direct connection to this GitHub repository.

Secrets: All sensitive API keys are securely stored as Environment Variables in the Vercel dashboard.

👉 LIVE DEMO URL:
https://<YOUR-PROJECT-NAME>.vercel.app

(This is the link to be shared for evaluation.)

🖋️ Editing and Contribution
Method	Description
Lovable AI	Visit the Lovable Project URL and prompt for changes. Changes are automatically committed here.
Preferred IDE	Clone the repo, make changes, and push. Changes are reflected in Lovable and trigger Vercel deployments.
GitHub Codespaces	Use the "Code" button to launch a Codespace for an instant cloud development environment.
