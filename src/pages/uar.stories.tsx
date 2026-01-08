import type { Meta, StoryObj } from '@storybook/react';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import { UAR } from './UAR';

const meta = {
  title: 'Pages/UAR',
  component: UAR,
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
      </div>
    ),
  ],
  tags: ['autodocs'],
} satisfies Meta<typeof UAR>;

export default meta;
type Story = StoryObj<typeof meta>;

export const UARStory: Story = {
  name: 'UAR',
  render: () => <UAR />,
};

export const UARWithControlsBelowTitle: Story = {
  name: 'UAR - Controls Below Title',
  render: () => <UAR controlsBelowTitle={true} />,
};

