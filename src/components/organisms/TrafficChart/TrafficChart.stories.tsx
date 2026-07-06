import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Box from '@mui/material/Box';
import { TrafficChart, type TrafficRange } from './TrafficChart';

const meta = {
  title: 'Organisms/TrafficChart',
  component: TrafficChart,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  argTypes: {
    title: { control: 'text', description: 'Título de la card.' },
    subtitle: {
      control: 'text',
      description: 'Subtítulo (fallback si el rango activo no define el suyo).',
    },
    height: {
      control: { type: 'range', min: 200, max: 500, step: 10 },
      description: 'Alto de la gráfica en px.',
    },
    yRange: {
      control: 'object',
      description: 'Rango del eje Y [min, max] por defecto.',
    },
    defaultRangeKey: {
      control: 'text',
      description: 'Rango activo inicial (modo no controlado).',
    },
    activeRangeKey: {
      control: 'text',
      description: 'Rango activo (modo controlado).',
    },
    ranges: {
      control: 'object',
      description: 'Datasets por rango temporal (editable como JSON).',
    },
    onRangeChange: { action: 'rangeChanged' },
    onDownload: {
      control: false,
      description:
        'Handler de descarga. Si se omite, exporta la vista actual a CSV.',
    },
  },
  decorators: [
    (Story) => (
      <Box sx={{ maxWidth: 760 }}>
        <Story />
      </Box>
    ),
  ],
} satisfies Meta<typeof TrafficChart>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Tres datasets, uno por granularidad temporal. El toggle alterna entre ellos. */
const RANGES: TrafficRange[] = [
  {
    key: 'day',
    label: 'Día',
    subtitle: 'Últimos 7 días',
    xLabels: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'],
    yRange: [0, 250],
    series: [
      {
        id: 'sessions',
        label: 'Sesiones',
        data: [80, 110, 95, 130, 170, 220, 150],
        area: true,
      },
      { id: 'unique', label: 'Únicos', data: [55, 70, 65, 90, 120, 160, 105] },
      {
        id: 'average',
        label: 'Media',
        data: [110, 110, 110, 110, 110, 110, 110],
        dashed: true,
      },
    ],
  },
  {
    key: 'month',
    label: 'Mes',
    subtitle: 'Enero – Julio 2026',
    xLabels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul'],
    yRange: [0, 250],
    series: [
      {
        id: 'sessions',
        label: 'Sesiones',
        data: [65, 120, 90, 160, 140, 205, 175],
        area: true,
      },
      { id: 'unique', label: 'Únicos', data: [40, 80, 70, 110, 95, 130, 120] },
      {
        id: 'average',
        label: 'Media',
        data: [65, 65, 65, 65, 65, 65, 65],
        dashed: true,
      },
    ],
  },
  {
    key: 'year',
    label: 'Año',
    subtitle: '2020 – 2026',
    xLabels: ['2020', '2021', '2022', '2023', '2024', '2025', '2026'],
    yRange: [0, 2500],
    series: [
      {
        id: 'sessions',
        label: 'Sesiones',
        data: [420, 680, 900, 1250, 1600, 2100, 2350],
        area: true,
      },
      {
        id: 'unique',
        label: 'Únicos',
        data: [300, 450, 620, 830, 1100, 1400, 1650],
      },
      {
        id: 'average',
        label: 'Media',
        data: [1200, 1200, 1200, 1200, 1200, 1200, 1200],
        dashed: true,
      },
    ],
  },
];

/**
 * Réplica completa del "Traffic" de CoreUI, restyleada al tema BG3.
 * El toggle Día/Mes/Año cambia el dataset; el icono descarga la vista en CSV.
 */
export const Default: Story = {
  args: {
    title: 'Tráfico',
    ranges: RANGES,
    defaultRangeKey: 'month',
    height: 300,
  },
  argTypes: {
    defaultRangeKey: {
      control: 'select',
      options: ['day', 'month', 'year'],
    },
    activeRangeKey: {
      control: 'select',
      options: [undefined, 'day', 'month', 'year'],
    },
  },
};

/**
 * Eje X numérico (`scaleType: 'linear'`): tanto X como Y son valores numéricos,
 * con espaciado proporcional. Útil para curvas de escalado (p. ej. valor de un
 * stat frente a otra magnitud numérica).
 */
export const NumericAxis: Story = {
  args: {
    title: 'Curvas de escalado',
    ranges: [
      {
        key: 'scaling',
        label: 'Escala',
        subtitle: 'Eje X numérico (0 – 100)',
        xScaleType: 'linear',
        xLabels: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
        yRange: [0, 250],
        series: [
          {
            id: 'quadratic',
            label: 'Cuadrática',
            data: [0, 3, 10, 22, 39, 61, 88, 120, 157, 199, 246],
            area: true,
          },
          {
            id: 'linear',
            label: 'Lineal',
            data: [0, 20, 40, 60, 80, 100, 120, 140, 160, 180, 200],
          },
          {
            id: 'baseline',
            label: 'Baseline',
            data: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100],
            dashed: true,
          },
        ],
      },
    ],
  },
};

/** Una sola serie de área, sin baseline. */
export const SingleArea: Story = {
  args: {
    title: 'Visitas',
    ranges: [
      {
        key: 'month',
        label: 'Mes',
        subtitle: 'Últimos 7 meses',
        xLabels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul'],
        yRange: [0, 250],
        series: [
          {
            id: 'visits',
            label: 'Visitas',
            data: [30, 60, 55, 95, 120, 150, 190],
            area: true,
          },
        ],
      },
    ],
  },
};
