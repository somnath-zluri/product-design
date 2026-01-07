import type { Meta, StoryObj } from '@storybook/react';
import { GlobalHeader } from './global-header';

const meta = {
  title: 'Zluri Components/Global Header',
  component: GlobalHeader,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof GlobalHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <GlobalHeader />,
};



