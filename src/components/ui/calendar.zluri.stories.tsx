import type { Meta, StoryObj } from '@storybook/react';
import { Calendar } from './calendar';

const meta = {
  title: 'Zluri Components/Calendar',
  component: Calendar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Calendar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <Calendar />,
};

export const WithSelectedDate: Story = {
  render: () => <Calendar mode="single" selected={new Date()} />,
};

export const Range: Story = {
  render: () => (
    <Calendar
      mode="range"
      defaultMonth={new Date(2024, 0)}
      selected={{
        from: new Date(2024, 0, 10),
        to: new Date(2024, 0, 20),
      }}
    />
  ),
};

