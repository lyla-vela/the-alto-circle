import { getResources } from "../../lib/api.js";
export default async function Resources() {
  const resources = await getResources();
  return (<main><h1>Resources</h1><ul>{resources.map(r => <li key={r.id}><strong>{r.title}</strong> ({r.category}) — {r.summary}</li>)}</ul></main>);
}
