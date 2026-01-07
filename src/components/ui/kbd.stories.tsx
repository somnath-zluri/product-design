import type { Meta, StoryObj } from '@storybook/react';
import { Kbd } from './kbd';

const meta = {
  title: 'ShadCN Components/Kbd',
  component: Kbd,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Kbd>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <span>Press</span>
      <Kbd>⌘</Kbd>
      <span>+</span>
      <Kbd>K</Kbd>
      <span>to open command menu</span>
    </div>
  ),
};

export const Multiple: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Kbd>⌘</Kbd>
      <Kbd>⌥</Kbd>
      <Kbd>⇧</Kbd>
      <Kbd>⌃</Kbd>
    </div>
  ),
};

