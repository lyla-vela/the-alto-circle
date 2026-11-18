import { getMembers, getResources, getActivity } from "../lib/api.js";
import { formatDate, countBy } from "../lib/format.js";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";

export default async function Home() {
  const [members, resources, activity] = await Promise.all([getMembers(), getResources(), getActivity()]);
  const byIndustry = countBy(members, (m) => m.industry);
  const bySize = countBy(members, (m) => `${m.company_size} business`);
  const stats = [
    { label: "Sample members", value: members.length },
    { label: "Resources", value: resources.length },
    { label: "Activity items", value: activity.length },
  ];
  return (
    <main>
      <Typography variant="h3" component="h1" color="primary" gutterBottom>
        Palo Alto Community Space
      </Typography>
      <Typography variant="body1" paragraph>
        A web app and dashboards for a community space in Palo Alto serving medium to large business owners — find members, access resources, and see what&apos;s happening.
      </Typography>

      <Typography variant="h5" component="h2" gutterBottom>At a glance</Typography>
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {stats.map((s) => (
          <Grid item xs={12} sm={4} key={s.label}>
            <Card sx={{ bgcolor: "primary.main", color: "primary.contrastText" }}>
              <CardContent>
                <Typography variant="h4">{s.value}</Typography>
                <Typography variant="body2">{s.label}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Typography variant="h6" gutterBottom>Members by industry</Typography>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 1 }}>
        {byIndustry.map(([label, count]) => (
          <Chip key={label} label={`${label} · ${count}`} color="primary" variant="outlined" />
        ))}
      </Box>
      <Typography variant="h6" gutterBottom>Members by company size</Typography>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 3 }}>
        {bySize.map(([label, count]) => (
          <Chip key={label} label={`${label} · ${count}`} color="secondary" />
        ))}
      </Box>

      <Typography variant="h5" component="h2" gutterBottom>Latest activity</Typography>
      <Card>
        <List>
          {activity.map((a, i) => (
            <Box key={a.id}>
              {i > 0 && <Divider />}
              <ListItem>
                <ListItemText
                  primary={a.title}
                  secondary={`${a.detail} — ${formatDate(a.created_at)}`}
                />
              </ListItem>
            </Box>
          ))}
        </List>
      </Card>
      <Box sx={{ mt: 3, display: "flex", gap: 2 }}>
        <Button variant="contained" color="primary" href="/members">Browse members</Button>
        <Button variant="outlined" color="secondary" href="/resources">Browse resources</Button>
      </Box>
    </main>
  );
}
