import type { Meta, StoryObj } from '@storybook/react-vite';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { Main } from './Main';

const meta = {
  title: 'Organisms/Main',
  component: Main,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  argTypes: {
    maxWidth: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', false],
      description: 'Ancho máximo del contenido.',
    },
    disableGutters: { control: 'boolean' },
  },
} satisfies Meta<typeof Main>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    maxWidth: 'lg',
    children: (
      <Paper sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          Contenido principal
        </Typography>
        <Typography color="text.secondary">
          Aquí se renderiza el contenido de cada página. La región crece para
          empujar el footer al fondo.
        </Typography>
      </Paper>
    ),
  },
};
