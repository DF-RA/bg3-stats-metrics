'use client';

import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import TextField from '@mui/material/TextField';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { LineChart } from '@mui/x-charts/LineChart';
import { ChartsReferenceLine } from '@mui/x-charts/ChartsReferenceLine';
import {
  GAME_MAX_AC,
  type RollMode,
  hitChance,
  critChance,
  expectedDamagePerAttack,
} from '@/domain/combat';

export interface ArmourLabProps {
  title?: string;
  subtitle?: string;
  /** CA máxima del eje X / slider. Por defecto, la máxima práctica del juego. */
  maxAc?: number;
  /** Bono de ataque inicial del atacante. */
  defaultAttackBonus?: number;
  /** Modo de tirada inicial. */
  defaultMode?: RollMode;
  /** Daño medio de un golpe normal. */
  defaultAverageHit?: number;
  /** Parte de dados del daño, que se duplica en crítico. */
  defaultAverageDamageDice?: number;
  height?: number;
}

const MODE_LABELS: Record<RollMode, string> = {
  disadvantage: 'Desventaja',
  normal: 'Normal',
  advantage: 'Ventaja',
};

const pct = (v: number) => `${Math.round(v * 100)}%`;

/**
 * Laboratorio → Armadura. Explora cómo la Clase de Armadura (CA) del objetivo se
 * traduce en probabilidad de ser impactado y en daño recibido, según el atacante.
 *
 * Eje X: CA (0 … máx). Dos líneas con **doble eje Y**: % de acierto (izquierda) y
 * daño recibido por ataque (derecha). El slider elige una CA concreta para leer
 * los valores exactos; el bono de ataque, el modo de tirada y el daño medio
 * reconfiguran las curvas.
 *
 * Teoría en `doc/armadura/ca-vs-acierto.md`; cálculo en `src/domain/combat.ts`.
 */
export function ArmourLab({
  title = 'Laboratorio · Armadura',
  subtitle = 'Cómo la CA afecta al acierto y al daño recibido',
  maxAc = GAME_MAX_AC,
  defaultAttackBonus = 6,
  defaultMode = 'normal',
  defaultAverageHit = 10,
  defaultAverageDamageDice = 4,
  height = 320,
}: ArmourLabProps) {
  const theme = useTheme();

  const [selectedAc, setSelectedAc] = React.useState(Math.round(maxAc / 2));
  const [attackBonus, setAttackBonus] = React.useState(defaultAttackBonus);
  const [mode, setMode] = React.useState<RollMode>(defaultMode);
  const [averageHit, setAverageHit] = React.useState(defaultAverageHit);
  const [averageDamageDice, setAverageDamageDice] = React.useState(
    defaultAverageDamageDice,
  );

  // Eje X: todas las CA de 0 a maxAc.
  const acValues = React.useMemo(
    () => Array.from({ length: maxAc + 1 }, (_, i) => i),
    [maxAc],
  );

  const damage = { averageHit, averageDamageDice };

  // Curva de % de acierto (0–100).
  const hitCurve = React.useMemo(
    () => acValues.map((ac) => hitChance(ac, attackBonus, mode) * 100),
    [acValues, attackBonus, mode],
  );

  // Curva de daño esperado por ataque.
  const damageCurve = React.useMemo(
    () =>
      acValues.map((ac) =>
        expectedDamagePerAttack(ac, attackBonus, mode, damage),
      ),
    [acValues, attackBonus, mode, averageHit, averageDamageDice],
  );

  // Valores exactos en la CA seleccionada (para el readout).
  const readoutHit = hitChance(selectedAc, attackBonus, mode);
  const readoutCrit = Math.min(critChance(mode), readoutHit);
  const readoutDamage = expectedDamagePerAttack(
    selectedAc,
    attackBonus,
    mode,
    damage,
  );

  const hitColor = theme.palette.info.main; // azul → acierto
  const damageColor = theme.palette.secondary.main; // carmesí → daño
  // El daño es máximo con CA 0; deja algo de margen superior.
  const damageMax = Math.max(1, Math.ceil((damageCurve[0] ?? averageHit) * 1.1));

  const handleMode = (_: React.MouseEvent, value: RollMode | null) => {
    if (value) setMode(value);
  };

  return (
    <Paper sx={{ p: 3 }}>
      {/* Encabezado */}
      <Box sx={{ mb: 2 }}>
        <Typography variant="h5" component="h2">
          {title}
        </Typography>
        {subtitle && (
          <Typography variant="body2" color="text.secondary">
            {subtitle}
          </Typography>
        )}
      </Box>

      {/* Gráfica: CA (X) → acierto % (Y izq.) y daño (Y der.), en dos líneas */}
      <LineChart
        height={height}
        series={[
          {
            id: 'hit',
            label: '% de acierto',
            data: hitCurve,
            color: hitColor,
            yAxisId: 'hit',
            showMark: false,
            curve: 'linear',
            valueFormatter: (v) => (v == null ? '' : pct(v / 100)),
          },
          {
            id: 'damage',
            label: 'Daño recibido',
            data: damageCurve,
            color: damageColor,
            yAxisId: 'damage',
            showMark: false,
            curve: 'linear',
            valueFormatter: (v) => (v == null ? '' : v.toFixed(1)),
          },
        ]}
        xAxis={[
          {
            scaleType: 'linear',
            data: acValues,
            label: 'Clase de Armadura (CA)',
          },
        ]}
        yAxis={[
          {
            id: 'hit',
            position: 'left',
            min: 0,
            max: 100,
            label: 'Acierto (%)',
            valueFormatter: (v: number) => `${v}%`,
          },
          {
            id: 'damage',
            position: 'right',
            min: 0,
            max: damageMax,
            label: 'Daño / ataque',
          },
        ]}
        grid={{ horizontal: true }}
        margin={{ top: 16, right: 8, bottom: 40, left: 8 }}
      >
        <ChartsReferenceLine
          x={selectedAc}
          label={`CA ${selectedAc}`}
          labelAlign="start"
          lineStyle={{
            stroke: theme.palette.primary.main,
            strokeDasharray: '5 4',
          }}
        />
      </LineChart>

      {/* Readout de la CA seleccionada */}
      <Box
        sx={{
          mt: 1,
          mb: 2,
          p: 1.5,
          borderRadius: 1,
          bgcolor: (t) => t.palette.action.hover,
          border: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Typography variant="body2">
          Contra <strong>CA {selectedAc}</strong>, un atacante con bono{' '}
          <strong>{attackBonus >= 0 ? `+${attackBonus}` : attackBonus}</strong> (
          {MODE_LABELS[mode].toLowerCase()}) acierta el{' '}
          <Box component="strong" sx={{ color: hitColor }}>
            {pct(readoutHit)}
          </Box>{' '}
          · crítico <strong>{pct(readoutCrit)}</strong> · daño esperado{' '}
          <Box component="strong" sx={{ color: damageColor }}>
            ~{readoutDamage.toFixed(1)}
          </Box>{' '}
          / ataque.
        </Typography>
      </Box>

      {/* Controles */}
      <Stack spacing={3}>
        <Box>
          <Typography id="ac-slider-label" variant="subtitle2" gutterBottom>
            CA seleccionada: {selectedAc}
          </Typography>
          <Slider
            value={selectedAc}
            onChange={(_, v) => setSelectedAc(v as number)}
            min={0}
            max={maxAc}
            step={1}
            marks={[
              { value: 0, label: '0' },
              { value: maxAc, label: `${maxAc}` },
            ]}
            valueLabelDisplay="auto"
            aria-labelledby="ac-slider-label"
          />
        </Box>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
            gap: 2,
          }}
        >
          <TextField
            label="Bono de ataque del atacante"
            type="number"
            size="small"
            value={attackBonus}
            onChange={(e) => setAttackBonus(Number(e.target.value))}
            helperText="Competencia + mod. característica + arma (+X) + efectos (Bendición…)"
          />

          <Box>
            <Typography variant="caption" color="text.secondary">
              Modo de tirada
            </Typography>
            <ToggleButtonGroup
              size="small"
              exclusive
              fullWidth
              value={mode}
              onChange={handleMode}
              color="primary"
              aria-label="Modo de tirada"
              sx={{ mt: 0.5 }}
            >
              {(['disadvantage', 'normal', 'advantage'] as RollMode[]).map(
                (m) => (
                  <ToggleButton key={m} value={m}>
                    {MODE_LABELS[m]}
                  </ToggleButton>
                ),
              )}
            </ToggleButtonGroup>
          </Box>

          <TextField
            label="Daño medio por golpe"
            type="number"
            size="small"
            value={averageHit}
            onChange={(e) => setAverageHit(Number(e.target.value))}
            helperText="Dados + modificadores planos de un golpe normal"
          />
          <TextField
            label="Daño de dados (se duplica en crítico)"
            type="number"
            size="small"
            value={averageDamageDice}
            onChange={(e) => setAverageDamageDice(Number(e.target.value))}
            helperText="Solo la parte de dados; 0 para ignorar el crítico"
          />
        </Box>
      </Stack>
    </Paper>
  );
}

export default ArmourLab;
