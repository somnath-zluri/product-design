import type { Meta, StoryObj } from '@storybook/react';
import { NavigationSidebar } from './navigation-sidebar';
import { SidebarProvider, Sidebar, SidebarMain } from './sidebar';

const meta = {
  title: 'Zluri Components/Navigation Sidebar',
  component: NavigationSidebar,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <SidebarProvider>
        <Sidebar>
          <Story />
          <SidebarMain>
            <div className="p-6">
              <h1 className="text-2xl font-bold">Main Content</h1>
              <p className="mt-2">This is the main content area.</p>
            </div>
          </SidebarMain>
        </Sidebar>
      </SidebarProvider>
    ),
  ],
  tags: ['autodocs'],
} satisfies Meta<typeof NavigationSidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <NavigationSidebar />,
};

export const WithApplicationsSelected: Story = {
  render: () => <NavigationSidebar defaultSelected="Applications" />,
};

export const WithSettingsSelected: Story = {
  render: () => <NavigationSidebar defaultSelected="Settings" />,
};

