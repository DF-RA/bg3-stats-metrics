'use client';

import * as React from 'react';
import { alpha, useTheme } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import { LineChart } from '@mui/x-charts/LineChart';

/** Una serie de la gráfica. */
export interface TrafficSeries {
  id: string;
  label: string;
  data: number[];
  /** Color explícito; si se omite, se usa un color del tema por posición. */
  color?: string;
  /** Rellena el área bajo la línea (translúcido). */
  area?: boolean;
  /** Dibuja la línea punteada (útil para líneas de referencia/media). */
  dashed?: boolean;
}

/** Un rango temporal seleccionable (Día / Mes / Año), con su propio dataset. */
export interface TrafficRange {
  /** Identificador estable (p. ej. 'day' | 'month' | 'year'). */
  key: string;
  /** Etiqueta del botón (p. ej. 'Día'). */
  label: string;
  /** Valores del eje X para este rango (categorías de texto o números). */
  xLabels: (string | number)[];
  /**
   * Tipo de escala del eje X:
   *  - 'point' (por defecto): categórico, puntos equiespaciados.
   *  - 'linear': numérico continuo (usar cuando xLabels son números).
   */
  xScaleType?: 'point' | 'linear';
  /** Series a dibujar en este rango. */
  series: TrafficSeries[];
  /** Subtítulo específico del rango (fallback: subtitle del componente). */
  subtitle?: string;
  /** Rango del eje Y para este rango (fallback: yRange del componente). */
  yRange?: [number, number];
}

export interface TrafficChartProps {
  title?: string;
  subtitle?: string;
  /** Datasets por rango temporal; el toggle alterna entre ellos. */
  ranges: TrafficRange[];
  /** Rango activo por defecto (no controlado). Por defecto, el segundo o el primero. */
  defaultRangeKey?: string;
  /** Rango activo (modo controlado). */
  activeRangeKey?: string;
  onRangeChange?: (key: string) => void;
  /** Rango del eje Y por defecto si el rango activo no define el suyo. */
  yRange?: [number, number];
  height?: number;
  /**
   * Handler de descarga. Si se omite, se exporta a CSV la vista actual.
   * Recibe el rango activo para que el consumidor decida qué hacer.
   */
  onDownload?: (range: TrafficRange) => void;
}

/** Exporta el dataset visible a un archivo CSV (comportamiento por defecto). */
function downloadRangeAsCsv(title: string, range: TrafficRange) {
  const header = ['x', ...range.series.map((s) => s.label)].join(',');
  const rows = range.xLabels.map((x, i) =>
    [x, ...range.series.map((s) => s.data[i] ?? '')].join(','),
  );
  const csv = [header, ...rows].join('\n');

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${title}-${range.key}.csv`
    .replace(/\s+/g, '-')
    .toLowerCase();
  link.click();
  URL.revokeObjectURL(url);
}

export function TrafficChart({
  title = 'Tráfico',
  subtitle,
  ranges,
  defaultRangeKey,
  activeRangeKey,
  onRangeChange,
  yRange = [0, 250],
  height = 300,
  onDownload,
}: TrafficChartProps) {
  const theme = useTheme();

  const initialKey =
    defaultRangeKey ?? ranges[1]?.key ?? ranges[0]?.key ?? '';
  const [internalKey, setInternalKey] = React.useState(initialKey);
  const currentKey = activeRangeKey ?? internalKey;

  const activeRange =
    ranges.find((r) => r.key === currentKey) ?? ranges[0];

  const handleRange = (_: React.MouseEvent, value: string | null) => {
    if (!value) return; // no permitir deselección total
    setInternalKey(value);
    onRangeChange?.(value);
  };

  const handleDownload = () => {
    if (!activeRange) return;
    if (onDownload) onDownload(activeRange);
    else downloadRangeAsCsv(title, activeRange);
  };

  // Colores por defecto tomados del tema BG3.
  const themeColors = [
    theme.palette.primary.main, // oro
    theme.palette.info.main, // arcano
    theme.palette.secondary.main, // carmesí
  ];

  const series = activeRange?.series ?? [];
  const colorFor = (s: TrafficSeries, i: number) =>
    s.color ?? themeColors[i % themeColors.length];

  const chartSeries = series.map((s, i) => ({
    id: s.id,
    label: s.label,
    data: s.data,
    area: s.area ?? false,
    showMark: false,
    curve: 'catmullRom' as const,
    color: colorFor(s, i),
  }));

  // Estilos por serie: relleno translúcido para áreas, guiones para punteadas.
  const seriesSx = series.reduce<Record<string, object>>((acc, s, i) => {
    if (s.area) {
      acc[`& .MuiAreaElement-series-${s.id}`] = {
        fill: alpha(colorFor(s, i), 0.16),
      };
    }
    if (s.dashed) {
      acc[`& .MuiLineElement-series-${s.id}`] = {
        strokeDasharray: '6 6',
        strokeWidth: 1,
      };
    }
    return acc;
  }, {});

  const activeSubtitle = activeRange?.subtitle ?? subtitle;
  const activeYRange = activeRange?.yRange ?? yRange;

  return (
    <Paper sx={{ p: 3 }}>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={2}
        sx={{
          mb: 2,
          justifyContent: 'space-between',
          alignItems: { xs: 'flex-start', sm: 'center' },
        }}
      >
        <Box>
          <Typography variant="h5" component="h2">
            {title}
          </Typography>
          {activeSubtitle && (
            <Typography variant="body2" color="text.secondary">
              {activeSubtitle}
            </Typography>
          )}
        </Box>

        <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
          <ToggleButtonGroup
            size="small"
            exclusive
            value={currentKey}
            onChange={handleRange}
            color="primary"
            aria-label="Rango temporal"
          >
            {ranges.map((r) => (
              <ToggleButton key={r.key} value={r.key} sx={{ px: 2 }}>
                {r.label}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
          <IconButton aria-label="Descargar" onClick={handleDownload}>
            <FileDownloadOutlinedIcon />
          </IconButton>
        </Stack>
      </Stack>

      <LineChart
        height={height}
        series={chartSeries}
        xAxis={[
          {
            scaleType: activeRange?.xScaleType ?? 'point',
            data: activeRange?.xLabels ?? [],
          },
        ]}
        yAxis={[{ min: activeYRange[0], max: activeYRange[1] }]}
        grid={{ horizontal: true }}
        hideLegend
        margin={{ top: 16, right: 8, bottom: 24, left: 8 }}
        sx={seriesSx}
      />
    </Paper>
  );
}

export default TrafficChart;
