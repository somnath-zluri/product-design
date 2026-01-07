import type { Meta, StoryObj } from '@storybook/react';
import { Toaster } from './sonner';
import { Button } from './button';
import { toast } from 'sonner';

const meta = {
  title: 'ShadCN Components/Sonner',
  component: Toaster,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Toaster>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <>
      <Button
        onClick={() =>
          toast('Event has been created', {
            description: 'Sunday, December 03, 2023 at 9:00 AM',
          })
        }
      >
        Show Toast
      </Button>
      <Toaster />
    </>
  ),
};

export const Success: Story = {
  render: () => (
    <>
      <Button
        onClick={() => toast.success('Event has been created')}
        variant="outline"
      >
        Success Toast
      </Button>
      <Toaster />
    </>
  ),
};

export const Error: Story = {
  render: () => (
    <>
      <Button
        onClick={() => toast.error('Event creation failed')}
        variant="destructive"
      >
        Error Toast
      </Button>
      <Toaster />
    </>
  ),
};

