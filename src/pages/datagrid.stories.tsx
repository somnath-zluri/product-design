import type { Meta, StoryObj } from '@storybook/react';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import { DataGrid } from './DataGrid';

const meta = {
  title: 'Pages/DataGrid',
  component: DataGrid,
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
} satisfies Meta<typeof DataGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DataGridStory: Story = {
  name: 'Inovua React DataGrid',
  render: () => <DataGrid />,
};


