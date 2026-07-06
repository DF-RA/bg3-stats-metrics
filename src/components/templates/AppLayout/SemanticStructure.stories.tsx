import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { within, expect } from 'storybook/test';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { AppLayout } from './AppLayout';
import { Header } from '@/components/organisms/Header';
import { Footer } from '@/components/organisms/Footer';
import { Nav } from '@/components/molecules/Nav';
import { Section } from '@/components/molecules/Section';
import { Article } from '@/components/molecules/Article';
import { Aside } from '@/components/molecules/Aside';
import { TrafficChart } from '@/components/organisms/TrafficChart';
import { abilityModifier } from '@/domain/abilities';

const meta = {
  title: 'Templates/Estructura semántica',
  component: AppLayout,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof AppLayout>;

export default meta;
type Story = StoryObj<typeof meta>;

const NAV = [
  { label: 'Inicio', href: '#', active: true },
  { label: 'Personajes', href: '#' },
  { label: 'Estadísticas', href: '#' },
];

const SIDE_NAV = [
  { label: 'Características', href: '#', active: true },
  { label: 'Clase de Armadura', href: '#' },
  { label: 'Competencia', href: '#' },
];

const scores = Array.from({ length: 13 }, (_, i) => 8 + i);
const modifiers = scores.map(abilityModifier);

/** La página completa: las 7 piezas semánticas ensambladas. */
function SemanticPage() {
  return (
    <AppLayout
      header={
        <Header
          title="BG3 Stats Metrics"
          navItems={NAV}
          actions={
            <IconButton aria-label="Perfil" color="inherit">
              <AccountCircleOutlinedIcon />
            </IconButton>
          }
        />
      }
      footer={
        <Footer
          copyright="© 2026 BG3 Stats Metrics"
          links={[
            { label: 'Acerca de', href: '#' },
            { label: 'GitHub', href: '#' },
          ]}
        />
      }
    >
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '1fr 260px' },
          gap: 3,
          alignItems: 'start',
        }}
      >
        {/* Columna principal: secciones con artículos */}
        <Stack spacing={4}>
          <Section
            title="Características"
            description="Las seis características y su escalado."
          >
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
                gap: 2,
              }}
            >
              <Article title="Fuerza" variant="outlined">
                <Typography color="text.secondary">
                  Ataques y daño cuerpo a cuerpo, cargar objetos.
                </Typography>
              </Article>
              <Article title="Destreza" variant="outlined">
                <Typography color="text.secondary">
                  Clase de Armadura, iniciativa y sigilo.
                </Typography>
              </Article>
            </Box>
          </Section>

          <Section title="Escalado">
            <Article title="Modificador por puntuación">
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
            </Article>
          </Section>
        </Stack>

        {/* Barra lateral complementaria */}
        <Aside title="Recursos" sticky>
          <Nav items={SIDE_NAV} orientation="vertical" ariaLabel="Recursos" />
        </Aside>
      </Box>
    </AppLayout>
  );
}

/**
 * Página completa que ensambla las 7 piezas semánticas:
 *
 * Header(<header>+Nav) → Main(<main>) → Section(<section>) →
 * [ Article(<article>) | Aside(<aside>) ] → Footer(<footer>).
 *
 * El `play` verifica que cada landmark ARIA existe con su nombre accesible.
 */
export const Completa: Story = {
  render: () => <SemanticPage />,
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Están los 7 landmarks semánticos', async () => {
      await expect(canvas.getByRole('banner')).toBeInTheDocument();
      await expect(canvas.getAllByRole('navigation').length).toBeGreaterThan(0);
      await expect(canvas.getByRole('main')).toBeInTheDocument();
      await expect(
        canvas.getByRole('region', { name: 'Características' }),
      ).toBeInTheDocument();
      await expect(
        canvas.getByRole('article', { name: 'Fuerza' }),
      ).toBeInTheDocument();
      await expect(
        canvas.getByRole('complementary', { name: 'Recursos' }),
      ).toBeInTheDocument();
      await expect(canvas.getByRole('contentinfo')).toBeInTheDocument();
    });
  },
};

/** Cada región semántica con su color, para visualizar el espacio ocupado. */
const REGIONS = [
  { tag: 'header', label: 'Header', role: 'banner', color: '#4f8def' },
  { tag: 'nav', label: 'Nav', role: 'navigation', color: '#26c6da' },
  { tag: 'main', label: 'Main', role: 'main', color: '#66bb6a' },
  { tag: 'section', label: 'Section', role: 'region', color: '#ffa726' },
  { tag: 'article', label: 'Article', role: 'article', color: '#ba68c8' },
  { tag: 'aside', label: 'Aside', role: 'complementary', color: '#f06292' },
  { tag: 'footer', label: 'Footer', role: 'contentinfo', color: '#a1887f' },
] as const;

// Fondo (color + 22 ≈ 13% alpha) y borde por cada tag semántico.
const colorSx = Object.fromEntries(
  REGIONS.map((r) => [
    `& ${r.tag}`,
    {
      outline: `2px solid ${r.color}`,
      outlineOffset: '-2px',
      backgroundColor: `${r.color}22`,
    },
  ]),
);

/** Leyenda flotante color → elemento (rol). */
function Legend() {
  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 16,
        right: 16,
        zIndex: 1300,
        p: 1.5,
        borderRadius: 1,
        bgcolor: 'rgba(16, 12, 8, 0.92)',
        border: '1px solid',
        borderColor: 'divider',
        boxShadow: 6,
      }}
    >
      <Typography variant="caption" sx={{ fontWeight: 700, display: 'block', mb: 0.5 }}>
        Espacio por componente
      </Typography>
      <Stack spacing={0.5}>
        {REGIONS.map((r) => (
          <Stack
            key={r.tag}
            direction="row"
            spacing={1}
            sx={{ alignItems: 'center' }}
          >
            <Box
              sx={{
                width: 14,
                height: 14,
                borderRadius: 0.5,
                bgcolor: `${r.color}22`,
                border: `2px solid ${r.color}`,
                flexShrink: 0,
              }}
            />
            <Typography variant="caption">
              <Box component="code" sx={{ color: r.color }}>
                {`<${r.tag}>`}
              </Box>{' '}
              — {r.role}
            </Typography>
          </Stack>
        ))}
      </Stack>
    </Box>
  );
}

/**
 * Misma estructura, pero cada elemento semántico pintado con su color (fondo +
 * borde) para ver el espacio que ocupa. Útil para entender el layout y la
 * anidación (nav dentro de header, article dentro de section, etc.).
 */
export const Coloreada: Story = {
  render: () => (
    <Box sx={colorSx}>
      <SemanticPage />
      <Legend />
    </Box>
  ),
};
