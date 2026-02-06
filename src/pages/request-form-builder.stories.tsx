import type { Meta, StoryObj } from '@storybook/react';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import { RequestFormBuilder } from './RequestFormBuilder';
import { Toaster } from '@/components/ui/sonner';

const meta = {
  title: 'Pages/Request Form Builder',
  component: RequestFormBuilder,
  parameters: {
    layout: 'fullscreen',
    viewport: {
      viewports: INITIAL_VIEWPORTS,
    },
  },
  decorators: [
    (Story) => (
      <div style={{ height: '100vh', width: '100%' }}>
        <Story />
        <Toaster />
      </div>
    ),
  ],
  tags: ['autodocs'],
  argTypes: {
    showBannerWhenFieldEdited: {
      description: 'When true, show an information banner when any form field is edited.',
      control: 'boolean',
    },
    bannerContent: {
      description: 'Content of the banner (non-dismissible).',
      control: 'text',
    },
    formFieldDescription: {
      description: 'Form field description is configured in the right panel when a field is selected (General → Description).',
      control: 'text',
    },
  },
} satisfies Meta<typeof RequestFormBuilder>;

export default meta;
type Story = StoryObj<typeof meta>;

export const RequestFormBuilderStory: Story = {
  name: 'Request Form Builder',
  render: () => <RequestFormBuilder showBannerWhenFieldEdited bannerContent="Hello World!" />,
};
