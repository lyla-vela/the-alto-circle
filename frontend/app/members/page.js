import { getMembers } from "../../lib/api.js";
export default async function Members({ searchParams }) {
  const members = await getMembers();
  const q = (searchParams?.q || "").toLowerCase();
  const shown = members.filter(m => !q || `${m.name} ${m.company} ${m.industry}`.toLowerCase().includes(q));
  return (<main><h1>Member Directory</h1>
    <form><input name="q" defaultValue={searchParams?.q || ""} placeholder="Search members, companies, industries" style={{ width: "100%", padding: 8 }} /><button type="submit">Search</button></form>
    <ul>{shown.map(m => <li key={m.id}><strong>{m.name}</strong> — {m.company} · {m.industry} · {m.company_size} business · {m.role}</li>)}</ul>
  </main>);
}
