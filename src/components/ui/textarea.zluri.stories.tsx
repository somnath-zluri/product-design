import type { Meta, StoryObj } from '@storybook/react';
import { Textarea } from './textarea';
import { Label } from './label';

const meta = {
  title: 'Zluri Components/Textarea',
  component: Textarea,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    placeholder: {
      control: 'text',
    },
    disabled: {
      control: 'boolean',
    },
    rows: {
      control: 'number',
    },
  },
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Type your message here...',
  },
};

export const WithLabel: Story = {
  render: () => (
    <div className="space-y-2 w-[350px]">
      <Label htmlFor="message">Message</Label>
      <Textarea id="message" placeholder="Type your message here..." />
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    placeholder: 'Disabled textarea',
    disabled: true,
  },
};

export const WithValue: Story = {
  args: {
    value: 'This is a pre-filled textarea with some content.',
    readOnly: true,
  },
};

export const Large: Story = {
  args: {
    placeholder: 'Type your message here...',
    rows: 10,
    className: 'min-h-[200px]',
  },
};

