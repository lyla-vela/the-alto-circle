import { seedMembers, seedResources, seedActivity } from "./seed.js";
const base = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
export async function fetchList(path, fallback) {
  try {
    const res = await fetch(`${base}${path}`, { cache: "no-store" });
    if (!res.ok) throw new Error("api error");
    return await res.json();
  } catch { return fallback; }
}
export const getMembers = () => fetchList("/api/members", seedMembers);
export const getResources = () => fetchList("/api/resources", seedResources);
export const getActivity = () => fetchList("/api/activity", seedActivity);
