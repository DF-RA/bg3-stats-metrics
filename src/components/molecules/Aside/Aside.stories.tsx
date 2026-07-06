import type { Meta, StoryObj } from '@storybook/react-vite';
import { within, expect } from 'storybook/test';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Aside } from './Aside';
import { Nav } from '@/components/molecules/Nav';
import { Article } from '@/components/molecules/Article';

const meta = {
  title: 'Molecules/Aside',
  component: Aside,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  argTypes: {
    variant: {
      control: 'inline-radio',
      options: ['elevated', 'outlined', 'plain'],
    },
    sticky: { control: 'boolean' },
    children: { control: false },
  },
} satisfies Meta<typeof Aside>;

export default meta;
type Story = StoryObj<typeof meta>;

const SIDE_NAV = [
  { label: 'Características', href: '#', active: true },
  { label: 'Clase de Armadura', href: '#' },
  { label: 'Competencia', href: '#' },
  { label: 'Salvaciones', href: '#' },
];

export const Default: Story = {
  args: {
    title: 'Secciones',
    children: <Nav items={SIDE_NAV} orientation="vertical" ariaLabel="Secciones" />,
  },
  decorators: [
    (Story) => (
      <Box sx={{ maxWidth: 260 }}>
        <Story />
      </Box>
    ),
  ],
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('El <aside> es complementary con nombre accesible', async () => {
      await expect(
        canvas.getByRole('complementary', { name: 'Secciones' }),
      ).toBeInTheDocument();
    });
  },
};

/**
 * Uso real: dos columnas — contenido principal (`Article`) + barra lateral
 * (`Aside`). El aside puede quedar `sticky` al hacer scroll.
 */
export const TwoColumn: Story = {
  render: () => (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', md: '1fr 260px' },
        gap: 3,
        alignItems: 'start',
      }}
    >
      <Article title="Clase de Armadura" subtitle="Cálculo y escalado">
        <Typography color="text.secondary">
          10 + mod. DES + bono de armadura + escudo + otros. El contenido
          principal vive aquí; la barra lateral acompaña con navegación o datos
          secundarios.
        </Typography>
      </Article>

      <Aside title="Secciones" sticky>
        <Nav items={SIDE_NAV} orientation="vertical" ariaLabel="Secciones" />
      </Aside>
    </Box>
  ),
};
