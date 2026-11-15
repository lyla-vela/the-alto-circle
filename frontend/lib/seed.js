// Sample data only — used when the FastAPI backend is unreachable.
export const seedMembers = [
  { id: 1, name: "Sample Member — Manufacturing", company: "Sample Manufacturing Co.", industry: "Manufacturing", company_size: "large", role: "Owner" },
  { id: 2, name: "Sample Member — Logistics", company: "Sample Logistics Co.", industry: "Logistics", company_size: "medium", role: "Owner" },
  { id: 3, name: "Sample Member — Technology", company: "Sample Technology Co.", industry: "Technology", company_size: "large", role: "Founder" },
];
export const seedResources = [
  { id: 1, title: "Sample Resource: Member Welcome Guide", category: "Onboarding", summary: "How new members join, introduce themselves, and find the right people." },
  { id: 2, title: "Sample Resource: Community Events Playbook", category: "Events", summary: "How the community plans and runs member events in Palo Alto." },
];
export const seedActivity = [
  { id: 1, title: "Sample Activity: Monthly member meetup", detail: "Members meet, share updates, and make introductions." },
  { id: 2, title: "Sample Activity: New resource published", detail: "A new guide was added to the resources library." },
];
