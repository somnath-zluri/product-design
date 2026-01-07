import type { Meta, StoryObj } from '@storybook/react';
import { Field } from './field';
import { Input } from './input';

const meta = {
  title: 'Zluri Components/Field',
  component: Field,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Field>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Field label="Email">
      <Input type="email" placeholder="Enter your email" />
    </Field>
  ),
};

export const Required: Story = {
  render: () => (
    <Field label="Email" required>
      <Input type="email" placeholder="Enter your email" />
    </Field>
  ),
};

export const WithError: Story = {
  render: () => (
    <Field label="Email" error="Please enter a valid email address">
      <Input type="email" placeholder="Enter your email" />
    </Field>
  ),
};

