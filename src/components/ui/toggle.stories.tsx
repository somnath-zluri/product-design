import type { Meta, StoryObj } from '@storybook/react';
import { Toggle } from './toggle';

const meta = {
  title: 'ShadCN Components/Toggle',
  component: Toggle,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'outline'],
    },
    size: {
      control: 'select',
      options: ['default', 'sm', 'lg'],
    },
  },
} satisfies Meta<typeof Toggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <Toggle aria-label="Toggle italic">Toggle</Toggle>,
};

export const Outline: Story = {
  render: () => (
    <Toggle variant="outline" aria-label="Toggle italic">
      Toggle
    </Toggle>
  ),
};

export const WithIcon: Story = {
  render: () => (
    <Toggle aria-label="Toggle italic">
      <span className="mr-2">B</span>
      Bold
    </Toggle>
  ),
};

