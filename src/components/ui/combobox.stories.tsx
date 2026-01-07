import type { Meta, StoryObj } from '@storybook/react';
import { Combobox } from './combobox';

const meta = {
  title: 'ShadCN Components/Combobox',
  component: Combobox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Combobox>;

export default meta;
type Story = StoryObj<typeof meta>;

const frameworks = [
  { value: 'next.js', label: 'Next.js' },
  { value: 'sveltekit', label: 'SvelteKit' },
  { value: 'nuxt', label: 'Nuxt.js' },
  { value: 'remix', label: 'Remix' },
  { value: 'astro', label: 'Astro' },
];

export const Default: Story = {
  args: {} as any,
  render: () => <Combobox options={frameworks} />,
};

export const WithValue: Story = {
  args: {} as any,
  render: () => (
    <Combobox options={frameworks} value="next.js" />
  ),
};

