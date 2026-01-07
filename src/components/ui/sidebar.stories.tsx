import type { Meta, StoryObj } from '@storybook/react';
import type { ComponentProps } from 'react';
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
  title: 'ShadCN Components/Sidebar',
  component: Sidebar,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    side: {
      control: { type: 'select' },
      options: ['left', 'right'],
      description: 'Controls which side the sidebar appears on',
      table: {
        type: { summary: "'left' | 'right'" },
        defaultValue: { summary: "'left'" },
      },
    },
    variant: {
      control: { type: 'select' },
      options: ['sidebar', 'floating', 'inset'],
      description: 'Controls the visual style variant',
      table: {
        type: { summary: "'sidebar' | 'floating' | 'inset'" },
        defaultValue: { summary: "'sidebar'" },
      },
    },
    collapsible: {
      control: { type: 'select' },
      options: ['offcanvas', 'icon', 'none'],
      description: 'Controls whether the sidebar can be collapsed',
      table: {
        type: { summary: "'offcanvas' | 'icon' | 'none'" },
      },
    },
    theme: {
      control: { type: 'select' },
      options: ['light', 'dark'],
      description: 'Controls the color theme (light or dark)',
      table: {
        type: { summary: "'light' | 'dark'" },
      },
    },
    children: {
      control: false,
      table: {
        disable: true,
      },
    },
    className: {
      control: false,
      table: {
        disable: true,
      },
    },
  },
} satisfies Meta<typeof Sidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    side: 'left',
    variant: 'sidebar',
    collapsible: 'none',
    theme: 'light',
  },
  render: (args) => {
    const { side, variant, collapsible, theme, ...rest } = args;
    return (
      <SidebarProvider>
        <Sidebar side={side} variant={variant} collapsible={collapsible} theme={theme} {...rest}>
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
    );
  },
};

