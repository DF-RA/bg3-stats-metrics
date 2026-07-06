import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { action } from 'storybook/actions';
import { within, userEvent, expect, fn } from 'storybook/test';
import IconButton from '@mui/material/IconButton';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { Header, type HeaderNavItem } from './Header';

const meta = {
  title: 'Organisms/Header',
  component: Header,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  argTypes: {
    title: { control: 'text', description: 'Título/marca.' },
    navItems: { control: 'object', description: 'Ítems de navegación.' },
    actions: { control: false, description: 'Slot de acciones a la derecha.' },
    onNavItemClick: { table: { category: 'Eventos' } },
    onBrandClick: { table: { category: 'Eventos' } },
  },
  args: {
    onNavItemClick: fn((item) => action('onNavItemClick')(item)),
    onBrandClick: fn(() => action('onBrandClick')()),
  },
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

const NAV: HeaderNavItem[] = [
  { label: 'Inicio', href: '#', active: true },
  { label: 'Personajes', href: '#' },
  { label: 'Estadísticas', href: '#' },
  { label: 'Objetos', href: '#' },
];

export const Default: Story = {
  args: {
    title: 'BG3 Stats Metrics',
    navItems: NAV,
  },
  play: async ({ canvasElement, args, step }) => {
    const canvas = within(canvasElement);

    await step('Muestra la marca', async () => {
      await expect(canvas.getByText('BG3 Stats Metrics')).toBeInTheDocument();
    });

    await step('Navegar dispara onNavItemClick', async () => {
      await userEvent.click(canvas.getByRole('link', { name: 'Personajes' }));
      await expect(args.onNavItemClick).toHaveBeenCalledWith(
        expect.objectContaining({ label: 'Personajes' }),
      );
    });
  },
};

/** Con acciones a la derecha (p. ej. menú de usuario). */
export const WithActions: Story = {
  args: {
    title: 'BG3 Stats Metrics',
    navItems: NAV,
    actions: (
      <IconButton aria-label="Perfil" color="inherit">
        <AccountCircleOutlinedIcon />
      </IconButton>
    ),
  },
};

/** Solo la marca, sin navegación. */
export const BrandOnly: Story = {
  args: {
    title: 'BG3 Stats Metrics',
    navItems: [],
  },
};
