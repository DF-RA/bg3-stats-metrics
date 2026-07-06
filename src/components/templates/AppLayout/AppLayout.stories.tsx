import type { Meta, StoryObj } from '@storybook/nextjs-vite';
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
