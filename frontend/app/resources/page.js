import { getResources } from "../../lib/api.js";
import { formatDate, countBy } from "../../lib/format.js";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";

export default async function Resources() {
  const resources = await getResources();
  const byCategory = countBy(resources, (r) => r.category);
  return (
    <main>
      <Typography variant="h3" component="h1" color="primary" gutterBottom>Resources</Typography>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 3 }}>
        {byCategory.map(([label, count]) => (
          <Chip key={label} label={`${label} · ${count}`} color="secondary" />
        ))}
      </Box>
      <Grid container spacing={2}>
        {resources.map((r) => (
          <Grid item xs={12} sm={6} key={r.id}>
            <Card sx={{ height: "100%" }}>
              <CardContent>
                <Typography variant="h6">{r.title}</Typography>
                <Box sx={{ display: "flex", gap: 1, my: 1 }}>
                  <Chip label={r.category} color="primary" size="small" />
                </Box>
                <Typography variant="body2" paragraph>{r.summary}</Typography>
                <Typography variant="caption" color="text.secondary">
                  Resource #{r.id} · Added {formatDate(r.created_at)}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </main>
  );
}
