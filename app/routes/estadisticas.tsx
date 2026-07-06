import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { TrafficChart } from '@/components/organisms/TrafficChart';
import { abilityModifier } from '@/domain/abilities';

export function meta() {
  return [
    { title: 'Escalados · BG3 Stats Metrics' },
    { name: 'description', content: 'Cómo escalan las estadísticas de BG3.' },
  ];
}

// Puntuaciones de característica 8–20 y su modificador (calculado en build).
const scores = Array.from({ length: 13 }, (_, i) => 8 + i);
const modifiers = scores.map(abilityModifier);

export default function EstadisticasPage() {
  return (
    <Stack spacing={3}>
      <Stack spacing={0.5}>
        <Typography variant="h4" component="h1">
          Escalados
        </Typography>
        <Typography color="text.secondary">
          Cómo escalan las estadísticas de BG3.
        </Typography>
      </Stack>

      <TrafficChart
        title="Modificador por puntuación"
        showDownload={false}
        ranges={[
          {
            key: 'modifier',
            label: 'Mod',
            subtitle: 'Modificador de característica (8 – 20)',
            xScaleType: 'linear',
            xLabels: scores,
            yRange: [-2, 6],
            series: [
              {
                id: 'modifier',
                label: 'Modificador',
                data: modifiers,
                area: true,
              },
            ],
          },
        ]}
      />
    </Stack>
  );
}
