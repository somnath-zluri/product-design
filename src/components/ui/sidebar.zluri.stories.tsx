import type { Meta, StoryObj } from '@storybook/react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMain,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from './sidebar';

const meta = {
  title: 'Zluri Components/Sidebar',
  component: Sidebar,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Sidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <SidebarProvider>
      <Sidebar>
        <SidebarContent>
          <SidebarHeader>
            <h2 className="text-lg font-semibold">Sidebar</h2>
          </SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton isActive>Home</SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton>Settings</SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton>Profile</SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
          <SidebarFooter>
            <p className="text-sm text-muted-foreground">Footer</p>
          </SidebarFooter>
        </SidebarContent>
        <SidebarMain>
          <div className="p-6">
            <SidebarTrigger />
            <h1 className="text-2xl font-bold mt-4">Main Content</h1>
            <p className="mt-2">This is the main content area.</p>
          </div>
        </SidebarMain>
      </Sidebar>
    </SidebarProvider>
  ),
};

