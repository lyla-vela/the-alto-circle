import { getMembers, getResources, getActivity } from "../lib/api.js";
export default async function Home() {
  const [members, resources, activity] = await Promise.all([getMembers(), getResources(), getActivity()]);
  return (<main><h1>Palo Alto Community Space</h1>
    <p>A web app and dashboards for a community space in Palo Alto serving medium to large business owners — find members, access resources, and see what&apos;s happening.</p>
    <h2>At a glance</h2><ul><li>{members.length} sample members</li><li>{resources.length} resources</li><li>{activity.length} activity items</li></ul>
    <h2>Latest activity</h2><ul>{activity.map(a => <li key={a.id}><strong>{a.title}</strong> — {a.detail}</li>)}</ul>
  </main>);
}
