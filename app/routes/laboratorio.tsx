import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Section } from '@/components/molecules/Section';
import { ArmourLab } from '@/components/organisms/ArmourLab';

export function meta() {
  return [
    { title: 'Laboratorio · BG3 Stats Metrics' },
    {
      name: 'description',
      content:
        'Experimenta con las estadísticas base de BG3 y observa cómo escalan.',
    },
  ];
}

/**
 * Laboratorio: una subsección por estadística base. Por ahora solo Armadura.
 * Cada subsección es un `Section` (landmark region) con su simulador interactivo.
 */
export default function LaboratorioPage() {
  return (
    <Stack spacing={4}>
      <Stack spacing={0.5}>
        <Typography variant="h4" component="h1">
          Laboratorio
        </Typography>
        <Typography color="text.secondary">
          Experimenta con las estadísticas base de BG3 y observa cómo escalan.
        </Typography>
      </Stack>

      <Section
        title="Armadura"
        description="Cómo la Clase de Armadura del objetivo afecta al acierto y al daño recibido."
      >
        <ArmourLab title="Simulador de CA" />
      </Section>
    </Stack>
  );
}
