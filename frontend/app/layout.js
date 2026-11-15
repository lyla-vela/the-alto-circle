export const metadata = { title: "Palo Alto Community Space", description: "Community space web app and dashboards for medium to large business owners in Palo Alto." };
export default function RootLayout({ children }) {
  return (<html lang="en"><body style={{ fontFamily: "system-ui, sans-serif", maxWidth: 900, margin: "0 auto", padding: 24 }}>
    <nav style={{ display: "flex", gap: 16, marginBottom: 24 }}>
      <a href="/">Home</a><a href="/members">Members</a><a href="/resources">Resources</a><a href="/dashboard">Dashboard</a>
    </nav>{children}</body></html>);
}
