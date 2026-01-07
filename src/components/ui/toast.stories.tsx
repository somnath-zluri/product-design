import type { Meta, StoryObj } from '@storybook/react';
import {
  Toast,
  ToastAction,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from './toast';

const meta = {
  title: 'ShadCN Components/Toast',
  component: Toast,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Toast>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <ToastProvider>
      <Toast>
        <ToastTitle>Scheduled: Catch up</ToastTitle>
        <ToastDescription>Friday, February 10, 2023 at 5:57 PM</ToastDescription>
      </Toast>
      <ToastViewport />
    </ToastProvider>
  ),
};

export const WithAction: Story = {
  render: () => (
    <ToastProvider>
      <Toast>
        <ToastTitle>Scheduled: Catch up</ToastTitle>
        <ToastDescription>Friday, February 10, 2023 at 5:57 PM</ToastDescription>
        <ToastAction altText="Goto schedule to undo">Undo</ToastAction>
      </Toast>
      <ToastViewport />
    </ToastProvider>
  ),
};

export const Destructive: Story = {
  render: () => (
    <ToastProvider>
      <Toast variant="destructive">
        <ToastTitle>Error</ToastTitle>
        <ToastDescription>
          Your session has expired. Please log in again.
        </ToastDescription>
        <ToastClose />
      </Toast>
      <ToastViewport />
    </ToastProvider>
  ),
};

