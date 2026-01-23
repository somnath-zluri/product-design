import type { Meta, StoryObj } from '@storybook/react';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import { UAREmployeeMode } from './UAREmployeeMode';
import { UAREmployeeModeV12 } from './UAREmployeeModeV12';

const meta = {
  title: 'Pages/UAR - Employee Mode',
  component: UAREmployeeMode,
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
} satisfies Meta<typeof UAREmployeeMode>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DashboardV11Story: Story = {
  name: 'Dashboard 1.1',
  render: () => (
    <UAREmployeeMode
      titleOverride="Access Review"
      showDeadlineCard={false}
      showHeaderDescription={false}
    />
  ),
};

export const DashboardV12Story: Story = {
  name: 'Dashboard 1.2',
  render: () => (
    <UAREmployeeMode
      titleOverride="Access Review"
      showDeadlineCard
      showHeaderDescription={false}
      deadlineCardPosition="left"
      hideTimelineColumn
      hideInsightsColumn
      showRadioTabs={false}
      hideAppIncludedColumn
      hideUsersIncludedColumn
    />
  ),
};

export const CertificationOverviewStory: Story = {
  name: 'Certification Overview 1.1',
  render: () => (
    <UAREmployeeMode headerLayout="inline" deadlineCardPosition="header" headerBadgeLabel="Active" />
  ),
};

export const CertificationOverviewV12Story: Story = {
  name: 'Certification Overview 1.2',
  render: () => (
    <UAREmployeeModeV12
      headerLayout="inline"
      deadlineCardPosition="header"
      headerBadgeLabel="Active"
      sidebarHasTabs
      showRiskScoreColumn={true}
    />
  ),
};
