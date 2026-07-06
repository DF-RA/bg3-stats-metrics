import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';

export default function Home() {
  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Stack spacing={4}>
        <Stack spacing={1}>
          <Typography variant="h2" component="h1">
            BG3 Stats Metrics
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Panel de estadísticas y escalados de Baldur’s Gate 3.
          </Typography>
        </Stack>

        <Paper sx={{ p: 3 }}>
          <Typography variant="h5" gutterBottom>
            Base lista
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 2 }}>
            Next.js + React + Material UI + Storybook con tema BG3. Construimos
            los componentes en Storybook y luego los ensamblamos aquí.
          </Typography>
          <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap' }}>
            <Chip label="Next.js 16" color="primary" />
            <Chip label="React 19" color="primary" variant="outlined" />
            <Chip label="Material UI" color="secondary" />
            <Chip label="Storybook" color="secondary" variant="outlined" />
          </Stack>
        </Paper>
      </Stack>
    </Container>
  );
}
