import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { bg3Colors, rarityColors } from './palette';

/**
 * Página de "fundamentos" del design system BG3. No es un componente de la app,
 * sino la referencia viva de tokens: colores, rarezas y tipografía.
 */
function Swatch({ name, value }: { name: string; value: string }) {
  return (
    <Stack spacing={0.5} sx={{ width: 120 }}>
      <Box
        sx={{
          height: 56,
          borderRadius: 1,
          bgcolor: value,
          border: '1px solid rgba(255,255,255,0.12)',
        }}
      />
      <Typography variant="caption" sx={{ fontWeight: 700 }}>
        {name}
      </Typography>
      <Typography variant="caption" color="text.secondary">
        {value}
      </Typography>
    </Stack>
  );
}

function Foundations() {
  return (
    <Stack spacing={4} sx={{ p: 3, maxWidth: 900 }}>
      <Box>
        <Typography variant="h3" gutterBottom>
          BG3 Stats Metrics — Fundamentos
        </Typography>
        <Typography color="text.secondary">
          Tokens base del design system. Todos los componentes se construyen
          sobre esta paleta.
        </Typography>
      </Box>

      <Box>
        <Typography variant="h5" gutterBottom>
          Marca
        </Typography>
        <Stack direction="row" spacing={2} sx={{ flexWrap: 'wrap' }}>
          <Swatch name="Oro" value={bg3Colors.gold.main} />
          <Swatch name="Carmesí" value={bg3Colors.crimson.main} />
          <Swatch name="Tinta" value={bg3Colors.ink[800]} />
          <Swatch name="Pergamino" value={bg3Colors.parchment[200]} />
        </Stack>
      </Box>

      <Box>
        <Typography variant="h5" gutterBottom>
          Rarezas (escalado de objetos)
        </Typography>
        <Stack direction="row" spacing={2} sx={{ flexWrap: 'wrap' }}>
          {Object.entries(rarityColors).map(([name, value]) => (
            <Swatch key={name} name={name} value={value} />
          ))}
        </Stack>
      </Box>

      <Box>
        <Typography variant="h5" gutterBottom>
          Tipografía
        </Typography>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h2">Cinzel Display</Typography>
          <Typography variant="body1">
            EB Garamond para el cuerpo: legible como un grimorio, con la solemnidad
            de una hoja de personaje.
          </Typography>
        </Paper>
      </Box>
    </Stack>
  );
}

const meta = {
  title: 'Fundamentos/Design Tokens',
  component: Foundations,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof Foundations>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Overview: Story = {};
