import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { action } from 'storybook/actions';
import { within, userEvent, expect, fn } from 'storybook/test';
import { Footer, type FooterLink } from './Footer';

const meta = {
  title: 'Organisms/Footer',
  component: Footer,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  argTypes: {
    copyright: { control: 'text' },
    links: { control: 'object' },
    onLinkClick: { table: { category: 'Eventos' } },
  },
  args: {
    onLinkClick: fn((link) => action('onLinkClick')(link)),
  },
} satisfies Meta<typeof Footer>;

export default meta;
type Story = StoryObj<typeof meta>;

const LINKS: FooterLink[] = [
  { label: 'Acerca de', href: '#' },
  { label: 'GitHub', href: '#' },
  { label: 'bg3.wiki', href: '#' },
];

export const Default: Story = {
  args: {
    copyright: '© 2026 BG3 Stats Metrics',
    links: LINKS,
  },
  play: async ({ canvasElement, args, step }) => {
    const canvas = within(canvasElement);

    await step('Click en un enlace dispara onLinkClick', async () => {
      await userEvent.click(canvas.getByRole('link', { name: 'GitHub' }));
      await expect(args.onLinkClick).toHaveBeenCalledWith(
        expect.objectContaining({ label: 'GitHub' }),
      );
    });
  },
};

/** Solo copyright, sin enlaces. */
export const CopyrightOnly: Story = {
  args: {
    copyright: '© 2026 BG3 Stats Metrics',
    links: [],
  },
};
