import { getMembers, getResources, getActivity } from "../../lib/api.js";
export default async function Dashboard() {
  const [members, resources, activity] = await Promise.all([getMembers(), getResources(), getActivity()]);
  return (<main><h1>Admin Dashboard</h1>
    <p>Members: {members.length} · Resources: {resources.length} · Activity: {activity.length}</p>
    <h2>Members</h2><ul>{members.map(m => <li key={m.id}>{m.name} — {m.company} ({m.company_size})</li>)}</ul>
    <h2>Resources</h2><ul>{resources.map(r => <li key={r.id}>{r.title}</li>)}</ul>
    <p>To add a member or resource, use the FastAPI API: POST /api/members or POST /api/resources (see README and /docs).</p>
  </main>);
}
