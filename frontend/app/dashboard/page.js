import { getMembers, getResources, getActivity } from "../../lib/api.js";
import { formatDate, countBy } from "../../lib/format.js";
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
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export default async function Dashboard() {
  const [members, resources, activity] = await Promise.all([getMembers(), getResources(), getActivity()]);
  const byIndustry = countBy(members, (m) => m.industry);
  const bySize = countBy(members, (m) => `${m.company_size} business`);
  const stats = [
    { label: "Members", value: members.length },
    { label: "Resources", value: resources.length },
    { label: "Activity", value: activity.length },
  ];
  return (
    <main>
      <Typography variant="h3" component="h1" color="primary" gutterBottom>Admin Dashboard</Typography>
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

      <Typography variant="h5" component="h2" gutterBottom>Members by industry</Typography>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 1 }}>
        {byIndustry.map(([label, count]) => (
          <Chip key={label} label={`${label} · ${count}`} color="primary" variant="outlined" />
        ))}
      </Box>
      <Typography variant="h5" component="h2" gutterBottom>Members by company size</Typography>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 3 }}>
        {bySize.map(([label, count]) => (
          <Chip key={label} label={`${label} · ${count}`} color="secondary" />
        ))}
      </Box>

      <Typography variant="h5" component="h2" gutterBottom>Members</Typography>
      <TableContainer component={Paper} sx={{ mb: 3 }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell><TableCell>Name</TableCell><TableCell>Company</TableCell>
              <TableCell>Industry</TableCell><TableCell>Size</TableCell><TableCell>Role</TableCell><TableCell>Added</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {members.map((m) => (
              <TableRow key={m.id}>
                <TableCell>{m.id}</TableCell><TableCell>{m.name}</TableCell><TableCell>{m.company}</TableCell>
                <TableCell>{m.industry}</TableCell><TableCell>{m.company_size}</TableCell><TableCell>{m.role}</TableCell>
                <TableCell>{formatDate(m.created_at)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Typography variant="h5" component="h2" gutterBottom>Resources</Typography>
      <Card sx={{ mb: 3 }}>
        <List>
          {resources.map((r, i) => (
            <Box key={r.id}>
              {i > 0 && <Divider />}
              <ListItem>
                <ListItemText
                  primary={r.title}
                  secondary={`${r.category} — ${r.summary} · Added ${formatDate(r.created_at)}`}
                />
              </ListItem>
            </Box>
          ))}
        </List>
      </Card>

      <Typography variant="h5" component="h2" gutterBottom>Activity</Typography>
      <Card sx={{ mb: 3 }}>
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

      <Typography variant="body2" color="text.secondary">
        To add a member or resource, use the FastAPI API: POST /api/members or POST /api/resources (see README and /docs).
      </Typography>
    </main>
  );
}
