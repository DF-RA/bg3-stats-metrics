import type { Meta, StoryObj } from '@storybook/react-vite';
import { within, expect } from 'storybook/test';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Article } from './Article';

const meta = {
  title: 'Molecules/Article',
  component: Article,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  argTypes: {
    variant: {
      control: 'inline-radio',
      options: ['elevated', 'outlined', 'plain'],
    },
    titleVariant: { control: 'inline-radio', options: ['h4', 'h5', 'h6'] },
    actions: { control: false },
    children: { control: false },
  },
  decorators: [
    (Story) => (
      <Box sx={{ maxWidth: 640 }}>
        <Story />
      </Box>
    ),
  ],
} satisfies Meta<typeof Article>;

export default meta;
type Story = StoryObj<typeof meta>;

const BODY = (
  <Typography color="text.secondary">
    Cuerpo del artículo. Aquí va el contenido: texto, gráficas, tablas de stats…
    lo que la sección necesite.
  </Typography>
);

export const Default: Story = {
  args: {
    title: 'Clase de Armadura',
    subtitle: 'Cómo se calcula y escala la CA en BG3',
    children: BODY,
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('El <article> toma su nombre accesible del título', async () => {
      await expect(
        canvas.getByRole('article', { name: 'Clase de Armadura' }),
      ).toBeInTheDocument();
    });
  },
};

/** Con acciones en el encabezado. */
export const WithActions: Story = {
  args: {
    title: 'Objetos legendarios',
    subtitle: 'Escalado por rareza',
    actions: (
      <Button size="small" variant="text">
        Ver todos
      </Button>
    ),
    children: BODY,
  },
};

/** Variante con borde en vez de elevación. */
export const Outlined: Story = {
  args: {
    title: 'Competencia',
    variant: 'outlined',
    children: BODY,
  },
};

/** Sin contenedor (para componer dentro de otro bloque). */
export const Plain: Story = {
  args: {
    title: 'Sección',
    variant: 'plain',
    children: BODY,
  },
};
