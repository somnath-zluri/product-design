import type { Meta, StoryObj } from '@storybook/react';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import { SettingsAppCatalog } from './SettingsAppCatalog';

const meta = {
  title: 'Pages/SettingsAppCatalog',
  component: SettingsAppCatalog,
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
} satisfies Meta<typeof SettingsAppCatalog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SettingsAppCatalogStory: Story = {
  name: 'Settings App Catalog',
  render: () => <SettingsAppCatalog />,
};

export const ManageAppSpecificForms: Story = {
  name: 'Manage App Specific Forms',
  render: () => <SettingsAppCatalog variant="manageAppSpecificForms" />,
};

