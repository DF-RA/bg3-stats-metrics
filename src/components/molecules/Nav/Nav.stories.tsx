import type { Meta, StoryObj } from '@storybook/react-vite';
import { action } from 'storybook/actions';
import { within, userEvent, expect, fn } from 'storybook/test';
import Box from '@mui/material/Box';
import { Nav, type NavItem } from './Nav';

const meta = {
  title: 'Molecules/Nav',
  component: Nav,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  argTypes: {
    items: { control: 'object', description: 'Ítems de navegación.' },
    orientation: {
      control: 'inline-radio',
      options: ['horizontal', 'vertical'],
    },
    linkComponent: { control: false },
    onItemClick: { table: { category: 'Eventos' } },
  },
  args: {
    onItemClick: fn((item) => action('onItemClick')(item)),
  },
} satisfies Meta<typeof Nav>;

export default meta;
type Story = StoryObj<typeof meta>;

const ITEMS: NavItem[] = [
  { label: 'Inicio', href: '#', active: true },
  { label: 'Personajes', href: '#' },
  { label: 'Estadísticas', href: '#' },
  { label: 'Objetos', href: '#' },
];

export const Horizontal: Story = {
  args: {
    items: ITEMS,
    orientation: 'horizontal',
  },
  play: async ({ canvasElement, args, step }) => {
    const canvas = within(canvasElement);

    await step('El ítem activo marca aria-current', async () => {
      await expect(
        canvas.getByRole('link', { name: 'Inicio' }),
      ).toHaveAttribute('aria-current', 'page');
    });

    await step('Click en un ítem dispara onItemClick', async () => {
      await userEvent.click(canvas.getByRole('link', { name: 'Personajes' }));
      await expect(args.onItemClick).toHaveBeenCalledWith(
        expect.objectContaining({ label: 'Personajes' }),
      );
    });
  },
};

/** Vertical: pensado para un drawer en móvil. */
export const Vertical: Story = {
  args: {
    items: ITEMS,
    orientation: 'vertical',
  },
  decorators: [
    (Story) => (
      <Box sx={{ width: 240 }}>
        <Story />
      </Box>
    ),
  ],
};
