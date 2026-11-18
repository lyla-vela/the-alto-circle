import { getMembers } from "../../lib/api.js";
import { formatDate, countBy } from "../../lib/format.js";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export default async function Members({ searchParams }) {
  const members = await getMembers();
  const q = (searchParams?.q || "").toLowerCase();
  const shown = members.filter(m => !q || `${m.name} ${m.company} ${m.industry}`.toLowerCase().includes(q));
  const byIndustry = countBy(members, (m) => m.industry);
  return (
    <main>
      <Typography variant="h3" component="h1" color="primary" gutterBottom>Member Directory</Typography>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 3 }}>
        {byIndustry.map(([label, count]) => (
          <Chip key={label} label={`${label} · ${count}`} color="primary" variant="outlined" />
        ))}
      </Box>
      <Box component="form" sx={{ display: "flex", gap: 1, mb: 1 }}>
        <TextField name="q" defaultValue={searchParams?.q || ""} placeholder="Search members, companies, industries" fullWidth size="small" />
        <Button type="submit" variant="contained" color="primary">Search</Button>
      </Box>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Showing {shown.length} of {members.length} sample members
      </Typography>
      <Grid container spacing={2}>
        {shown.map((m) => (
          <Grid item xs={12} sm={6} key={m.id}>
            <Card sx={{ height: "100%" }}>
              <CardContent>
                <Typography variant="h6">{m.name}</Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>{m.company}</Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 1 }}>
                  <Chip label={m.industry} color="primary" size="small" />
                  <Chip label={`${m.company_size} business`} color="secondary" size="small" />
                  <Chip label={m.role} size="small" variant="outlined" />
                </Box>
                <Typography variant="caption" color="text.secondary">
                  Member #{m.id} · Added {formatDate(m.created_at)}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </main>
  );
}
