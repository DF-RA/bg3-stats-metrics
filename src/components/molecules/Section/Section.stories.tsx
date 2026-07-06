import type { Meta, StoryObj } from '@storybook/react-vite';
import { within, expect } from 'storybook/test';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Section } from './Section';
import { Article } from '@/components/molecules/Article';

const meta = {
  title: 'Molecules/Section',
  component: Section,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  argTypes: {
    titleVariant: { control: 'inline-radio', options: ['h3', 'h4', 'h5'] },
    actions: { control: false },
    children: { control: false },
  },
  decorators: [
    (Story) => (
      <Box sx={{ maxWidth: 820 }}>
        <Story />
      </Box>
    ),
  ],
} satisfies Meta<typeof Section>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Una sección que agrupa varios Article en una grilla. */
export const Default: Story = {
  args: {
    title: 'Características',
    description: 'Las seis características y su escalado.',
    children: (
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
          gap: 2,
        }}
      >
        <Article title="Fuerza" variant="outlined">
          <Typography color="text.secondary">Modificador y usos.</Typography>
        </Article>
        <Article title="Destreza" variant="outlined">
          <Typography color="text.secondary">CA, iniciativa, sigilo.</Typography>
        </Article>
      </Box>
    ),
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('La <section> es un landmark region con nombre', async () => {
      await expect(
        canvas.getByRole('region', { name: 'Características' }),
      ).toBeInTheDocument();
    });
  },
};

/** Con acción en el encabezado. */
export const WithActions: Story = {
  args: {
    title: 'Objetos',
    description: 'Escalado por rareza.',
    actions: (
      <Button size="small" variant="text">
        Ver todos
      </Button>
    ),
    children: (
      <Article title="Legendarios" variant="outlined">
        <Typography color="text.secondary">
          Los objetos más poderosos del juego.
        </Typography>
      </Article>
    ),
  },
};
