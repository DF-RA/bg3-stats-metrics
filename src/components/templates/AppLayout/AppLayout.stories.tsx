import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { within, userEvent, expect } from 'storybook/test';
import {
  MemoryRouter,
  Routes,
  Route,
  Link,
  useLocation,
  type LinkProps,
} from 'react-router';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { AppLayout } from './AppLayout';
import { Header } from '@/components/organisms/Header';
import { Footer } from '@/components/organisms/Footer';

const meta = {
  title: 'Templates/AppLayout',
  component: AppLayout,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof AppLayout>;

export default meta;
type Story = StoryObj<typeof meta>;

/** El rompecabezas completo: Header + Main + Footer ensamblados. */
export const Default: Story = {
  args: {
    header: (
      <Header
        title="BG3 Stats Metrics"
        navItems={[
          { label: 'Inicio', href: '#', active: true },
          { label: 'Personajes', href: '#' },
          { label: 'Estadísticas', href: '#' },
        ]}
        actions={
          <IconButton aria-label="Perfil" color="inherit">
            <AccountCircleOutlinedIcon />
          </IconButton>
        }
      />
    ),
    footer: (
      <Footer
        copyright="© 2026 BG3 Stats Metrics"
        links={[
          { label: 'Acerca de', href: '#' },
          { label: 'GitHub', href: '#' },
        ]}
      />
    ),
    children: (
      <Stack spacing={2}>
        <Typography variant="h4" component="h1">
          Panel
        </Typography>
        <Paper sx={{ p: 3 }}>
          <Typography color="text.secondary">
            Contenido de la página. El footer se mantiene al fondo aunque el
            contenido sea corto (sticky footer).
          </Typography>
        </Paper>
      </Stack>
    ),
  },
};

/**
 * Adaptador: MUI pasa `href` a su LinkComponent, pero el Link de React Router
 * usa `to`. (Mismo patrón que el AppChrome real de la app.)
 */
const RouterLink = React.forwardRef<
  HTMLAnchorElement,
  Omit<LinkProps, 'to'> & { href?: string }
>(function RouterLink({ href = '', ...props }, ref) {
  return <Link ref={ref} to={href} {...props} />;
});

/** Vistas de cada sección (marcadas con un heading para las aserciones). */
function InicioView() {
  return (
    <Typography variant="h4" component="h1">
      Inicio
    </Typography>
  );
}
function EscaladosView() {
  return (
    <Typography variant="h4" component="h1">
      Escalados
    </Typography>
  );
}

/** El shell conectado a rutas: el Nav cambia el contenido del Main. */
function RoutedShell() {
  const { pathname } = useLocation();
  const navItems = [
    { label: 'Inicio', href: '/' },
    { label: 'Escalados', href: '/estadisticas' },
  ].map((item) => ({ ...item, active: item.href === pathname }));

  return (
    <AppLayout
      header={
        <Header
          title="BG3 Stats Metrics"
          navItems={navItems}
          linkComponent={RouterLink}
        />
      }
      footer={<Footer copyright="© 2026 BG3 Stats Metrics" />}
    >
      <Routes>
        <Route index element={<InicioView />} />
        <Route path="estadisticas" element={<EscaladosView />} />
      </Routes>
    </AppLayout>
  );
}

/**
 * Interacción Nav ↔ Main: al pulsar un ítem del Nav, React Router cambia la
 * ruta y el Main renderiza la vista correspondiente (navegación SPA), sin
 * recargar el Header/Footer.
 */
export const Navegacion: Story = {
  render: () => (
    <MemoryRouter initialEntries={['/']}>
      <RoutedShell />
    </MemoryRouter>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Arranca en "Inicio"', async () => {
      await expect(
        canvas.getByRole('heading', { name: 'Inicio' }),
      ).toBeInTheDocument();
      await expect(
        canvas.getByRole('link', { name: 'Inicio' }),
      ).toHaveAttribute('aria-current', 'page');
    });

    await step('Click en "Escalados" cambia el Main', async () => {
      await userEvent.click(canvas.getByRole('link', { name: 'Escalados' }));
      // El Main ahora muestra la vista de Escalados...
      await expect(
        await canvas.findByRole('heading', { name: 'Escalados' }),
      ).toBeInTheDocument();
      // ...y la de Inicio desapareció.
      await expect(
        canvas.queryByRole('heading', { name: 'Inicio' }),
      ).not.toBeInTheDocument();
      // El ítem activo se movió a "Escalados".
      await expect(
        canvas.getByRole('link', { name: 'Escalados' }),
      ).toHaveAttribute('aria-current', 'page');
    });

    await step('Volver a "Inicio"', async () => {
      await userEvent.click(canvas.getByRole('link', { name: 'Inicio' }));
      await expect(
        await canvas.findByRole('heading', { name: 'Inicio' }),
      ).toBeInTheDocument();
    });
  },
};
