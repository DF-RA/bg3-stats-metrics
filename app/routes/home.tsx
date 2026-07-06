import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';

export function meta() {
  return [
    { title: 'BG3 Stats Metrics' },
    {
      name: 'description',
      content: 'Panel de estadísticas y escalados de Baldur’s Gate 3.',
    },
  ];
}

export default function Home() {
  return (
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
          SPA con React Router v7
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 2 }}>
          React Router v7 (SPA) + React + Material UI + Storybook con tema BG3.
          Construimos los componentes en Storybook y luego los ensamblamos aquí.
        </Typography>
        <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap' }}>
          <Chip label="React Router v7" color="primary" />
          <Chip label="React 19" color="primary" variant="outlined" />
          <Chip label="Material UI" color="secondary" />
          <Chip label="Storybook" color="secondary" variant="outlined" />
        </Stack>
      </Paper>
    </Stack>
  );
}
