import type { Meta, StoryObj } from '@storybook/react';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import { UAREmployeeMode } from './UAREmployeeMode';
import { UAREmployeeModeV12 } from './UAREmployeeModeV12';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Sparkles, CheckCircle, XCircle, Pencil } from 'lucide-react';
import type { Insight } from '@/components/ui/insight-badge';
import { ALL_INSIGHTS } from '@/components/ui/insight-badge';

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
      hideViewByFilter={true}
      hideSortByFilter={true}
      hideButtonGroup={true}
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
      hideSortByFilter={true}
      hideViewByFilter={true}
      showReviewerLevelColumn={true}
      showTwoButtonGroup={true}
      firstButtonLabel="Review"
      secondButtonLabel="Reviewer Progress"
    />
  ),
};

// Sample user data for Record Overview - 50 unique users
const sampleUsers = [
  { firstName: 'Courtney', lastName: 'Henry', id: '1' },
  { firstName: 'John', lastName: 'Doe', id: '2' },
  { firstName: 'Jane', lastName: 'Smith', id: '3' },
  { firstName: 'Bob', lastName: 'Johnson', id: '4' },
  { firstName: 'Alice', lastName: 'Williams', id: '5' },
  { firstName: 'Michael', lastName: 'Brown', id: '6' },
  { firstName: 'Sarah', lastName: 'Davis', id: '7' },
  { firstName: 'David', lastName: 'Miller', id: '8' },
  { firstName: 'Emily', lastName: 'Wilson', id: '9' },
  { firstName: 'James', lastName: 'Moore', id: '10' },
  { firstName: 'Jessica', lastName: 'Taylor', id: '11' },
  { firstName: 'Christopher', lastName: 'Anderson', id: '12' },
  { firstName: 'Amanda', lastName: 'Thomas', id: '13' },
  { firstName: 'Daniel', lastName: 'Jackson', id: '14' },
  { firstName: 'Melissa', lastName: 'White', id: '15' },
  { firstName: 'Matthew', lastName: 'Harris', id: '16' },
  { firstName: 'Michelle', lastName: 'Martin', id: '17' },
  { firstName: 'Andrew', lastName: 'Thompson', id: '18' },
  { firstName: 'Ashley', lastName: 'Garcia', id: '19' },
  { firstName: 'Joshua', lastName: 'Martinez', id: '20' },
  { firstName: 'Stephanie', lastName: 'Robinson', id: '21' },
  { firstName: 'Ryan', lastName: 'Clark', id: '22' },
  { firstName: 'Nicole', lastName: 'Rodriguez', id: '23' },
  { firstName: 'Kevin', lastName: 'Lewis', id: '24' },
  { firstName: 'Lauren', lastName: 'Lee', id: '25' },
  { firstName: 'Brandon', lastName: 'Walker', id: '26' },
  { firstName: 'Rachel', lastName: 'Hall', id: '27' },
  { firstName: 'Justin', lastName: 'Allen', id: '28' },
  { firstName: 'Samantha', lastName: 'Young', id: '29' },
  { firstName: 'Tyler', lastName: 'King', id: '30' },
  { firstName: 'Brittany', lastName: 'Wright', id: '31' },
  { firstName: 'Jacob', lastName: 'Lopez', id: '32' },
  { firstName: 'Megan', lastName: 'Hill', id: '33' },
  { firstName: 'Nathan', lastName: 'Scott', id: '34' },
  { firstName: 'Kayla', lastName: 'Green', id: '35' },
  { firstName: 'Jonathan', lastName: 'Adams', id: '36' },
  { firstName: 'Amber', lastName: 'Baker', id: '37' },
  { firstName: 'Benjamin', lastName: 'Gonzalez', id: '38' },
  { firstName: 'Danielle', lastName: 'Nelson', id: '39' },
  { firstName: 'Samuel', lastName: 'Carter', id: '40' },
  { firstName: 'Rebecca', lastName: 'Mitchell', id: '41' },
  { firstName: 'Nicholas', lastName: 'Perez', id: '42' },
  { firstName: 'Heather', lastName: 'Roberts', id: '43' },
  { firstName: 'Eric', lastName: 'Turner', id: '44' },
  { firstName: 'Christina', lastName: 'Phillips', id: '45' },
  { firstName: 'Jordan', lastName: 'Campbell', id: '46' },
  { firstName: 'Katherine', lastName: 'Parker', id: '47' },
  { firstName: 'Austin', lastName: 'Evans', id: '48' },
  { firstName: 'Victoria', lastName: 'Edwards', id: '49' },
  { firstName: 'Adam', lastName: 'Collins', id: '50' },
];

const getInitials = (firstName: string, lastName: string) => {
  return `${firstName[0]?.toUpperCase() || ''}${lastName[0]?.toUpperCase() || ''}`;
};

// Helper function to generate user-specific description
const generateUserSpecificDescription = (insightName: string, index: number, userName?: string): string => {
  // Extract days from insight name if present
  const daysMatch = insightName.match(/(\d+)\s*days?/i);
  const days = daysMatch ? parseInt(daysMatch[1]) : null;
  
  // Generate a random number of days if not specified (between 30-120 days)
  const randomDays = days || (30 + (index % 91));
  
  // Convert insight name to user-specific description (without repeating user name)
  if (insightName.includes('Privileged Accounts Dormant for 90 days')) {
    return `Has been dormant for ${randomDays} days with privileged access`;
  } else if (insightName.includes('Privileged Accounts Dormant for 60 days')) {
    return `Has been dormant for ${randomDays} days with privileged access`;
  } else if (insightName.includes('External Accounts Dormant for 90 days')) {
    return `Has been dormant for ${randomDays} days as an external user`;
  } else if (insightName.includes('External Accounts Dormant for 60 days')) {
    return `Has been dormant for ${randomDays} days as an external user`;
  } else if (insightName.includes('Privileged Accounts Dormant')) {
    return `Has been dormant for ${days || randomDays} days with privileged access`;
  } else if (insightName.includes('External Accounts Dormant')) {
    return `Has been dormant for ${days || randomDays} days as an external user`;
  } else if (insightName.includes('Dormant Privileged Accounts')) {
    return `Has been dormant for ${randomDays} days with privileged access`;
  } else if (insightName.includes('Dormant External Accounts')) {
    return `Has been dormant for ${randomDays} days as an external user`;
  } else if (insightName.includes('Accounts Dormant for 90 days')) {
    return `Has been dormant for ${randomDays} days`;
  } else if (insightName.includes('Accounts Dormant for 60 days')) {
    return `Has been dormant for ${randomDays} days`;
  } else if (insightName.includes('Accounts Dormant for')) {
    return `Has been dormant for ${days || randomDays} days`;
  } else if (insightName.includes('All Dormant Accounts')) {
    return `Has been dormant for ${randomDays} days`;
  } else if (insightName.includes('Orphaned Privileged Accounts')) {
    return `Has orphaned privileged access - inactive in directory but active in application`;
  } else if (insightName.includes('Orphaned External Accounts')) {
    return `Has orphaned external access - inactive in directory but active in application`;
  } else if (insightName.includes('Orphaned Accounts')) {
    return `Has orphaned access - inactive in directory but active in application`;
  } else if (insightName.includes('Privileged Accounts')) {
    return `Has privileged access that requires review`;
  } else if (insightName.includes('External Accounts')) {
    return `Is classified as an external user`;
  } else if (insightName.includes('Inactive Licensed Accounts')) {
    return `Has an inactive account but holds an active license`;
  }
  
  // Default: convert to lowercase and make it user-specific
  return insightName.toLowerCase().replace(/accounts?/gi, 'account');
};

// Helper function to generate insights (same logic as UAR.tsx)
const generateInsightsForRow = (index: number, userCount: number, includeUserDescriptions: boolean = false): Insight[] => {
  const numInsights = Math.min(3 + (index % 13), 15);
  const insights: Insight[] = [];
  
  for (let i = 0; i < numInsights; i++) {
    const insightIndex = (index + i) % ALL_INSIGHTS.length;
    const userCountForInsight = Math.floor(userCount / numInsights) + (i === 0 ? userCount % numInsights : 0);
    const insight = ALL_INSIGHTS[insightIndex];
    
    insights.push({
      name: insight.name,
      description: insight.description,
      userCount: userCountForInsight,
      recommendedAction: insight.recommendedAction,
      ...(includeUserDescriptions && {
        userSpecificDescription: generateUserSpecificDescription(insight.name, index + i),
      }),
    });
  }
  
  return insights;
};

// Helper function to determine recommended action based on insights and risk level
const getRecommendedAction = (insights: Insight[], riskLevel: string): 'Certify' | 'Modify' | 'Revoke' => {
  // Count actions by type
  const revokeCount = insights.filter(insight => insight.recommendedAction === 'Revoke').length;
  const modifyCount = insights.filter(insight => insight.recommendedAction === 'Modify').length;
  const certifyCount = insights.filter(insight => insight.recommendedAction === 'Certify').length;
  
  const hasRevoke = revokeCount > 0;
  const hasModify = modifyCount > 0;
  const hasCertify = certifyCount > 0;
  
  // Normalize risk level for comparison
  const normalizedRiskLevel = riskLevel?.toString().trim();
  
  // For Low Risk users: prioritize Modify over Revoke when there are mixed insights
  if (normalizedRiskLevel === 'Low') {
    // If there are Modify insights, prefer Modify (even if there are some Revoke)
    if (hasModify) {
      return 'Modify';
    }
    // If only Revoke insights exist for Low Risk, still recommend Revoke
    if (hasRevoke && !hasModify && !hasCertify) {
      return 'Revoke';
    }
    // If only Certify, recommend Certify
    if (hasCertify && !hasModify && !hasRevoke) {
      return 'Certify';
    }
    // Mixed Revoke and Certify (no Modify) - for Low Risk, prefer Certify
    if (hasRevoke && hasCertify && !hasModify) {
      return 'Certify';
    }
  }
  
  // For Medium/High Risk: prioritize Revoke if present
  if (hasRevoke) {
    return 'Revoke';
  }
  
  // If there are Modify recommendations, use Modify
  if (hasModify) {
    return 'Modify';
  }
  
  // Default to Certify
  return 'Certify';
};

export const RecordOverviewV11Story: Story = {
  name: 'Record Overview 1.1',
  render: () => (
    <UAREmployeeModeV12
      titleOverride="Slack"
      headerLayout="inline"
      deadlineCardPosition="header"
      sidebarHasTabs={false}
      showLeftPanel={false}
      showRadioTabs={true}
      showRiskScoreColumn={true}
      firstColumnHeader="User"
      hideUsersTab={true}
      hideTabBadges={true}
      hideOwnerColumn={true}
      hideProgressColumn={true}
      hideUsersIncludedColumn={true}
      riskColumnHeader="Risk"
      hideRiskGauge={false}
      insightsColumnHeader="Insights"
      showInsightsBadgeOnly={true}
      freezeFirstColumn={true}
      firstColumnWidth={200}
      hideViewByFilter={true}
      hideSortByFilter={true}
      initialSortColumn="col1"
      initialSortDirection="asc"
      customSortByUser={true}
      sampleUsersForSorting={sampleUsers}
      searchPlaceholder="Search users"
      showStatusColumn={false}
      groupsTabLabel="Insight Mode"
      showInsightsFilter={true}
      customFirstColumnCell={(row) => {
        const userIndex = parseInt(row.id.replace('row-', '')) - 1;
        const user = sampleUsers[userIndex % sampleUsers.length] || sampleUsers[0];
        return (
          <div className="flex items-center gap-3 min-w-0">
            <Avatar className="h-8 w-8 flex-shrink-0">
              <AvatarFallback className="text-xs">
                {getInitials(user.firstName, user.lastName)}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col min-w-0 flex-1">
              <span className="text-sm font-medium truncate" title={`${user.firstName} ${user.lastName}`}>
                {user.firstName} {user.lastName}
              </span>
            </div>
          </div>
        );
      }}
      customActionColumn={(row) => {
        // Generate insights for this row to determine recommended action
        const match = row.col8?.match(/(\d+)%/);
        const percent = match ? parseInt(match[1]) : 0;
        const userCount = parseInt((row.col7 || '0').replace(/,/g, '')) || 0;
        const records = Math.floor((percent / 100) * userCount);
        const rowIndex = parseInt(row.id.replace('row-', '')) - 1;
        
        // Generate insights using the same logic as UAR.tsx
        const insights = generateInsightsForRow(rowIndex >= 0 ? rowIndex : 0, records);
        
        // Get risk level from row data - normalize to ensure it matches
        const riskLevel = (row.riskLevel || 'Medium').toString();
        const recommendedAction = getRecommendedAction(insights, riskLevel);
        
        return (
          <div className="flex gap-2">
            <Button 
              size="sm" 
              variant="outline" 
              className="h-7 text-xs flex items-center justify-center min-w-[85px] bg-green-100 text-green-700 hover:bg-green-200 border-green-300"
            >
              {recommendedAction === 'Certify' && <Sparkles className="h-3 w-3 mr-1.5" />}
              Certify
            </Button>
            <Button 
              size="sm" 
              variant="outline" 
              className="h-7 text-xs flex items-center justify-center min-w-[85px] bg-red-100 text-red-700 hover:bg-red-200 border-red-300"
            >
              {recommendedAction === 'Revoke' && <Sparkles className="h-3 w-3 mr-1.5" />}
              Revoke
            </Button>
            <Button 
              size="sm" 
              variant="outline" 
              className="h-7 text-xs flex items-center justify-center min-w-[85px] bg-yellow-100 text-yellow-700 hover:bg-yellow-200 border-yellow-300"
            >
              {recommendedAction === 'Modify' && <Sparkles className="h-3 w-3 mr-1.5" />}
              Modify
            </Button>
          </div>
        );
      }}
    />
  ),
};

export const RecordOverviewV12Story: Story = {
  name: 'Record Overview 1.2',
  render: () => (
    <UAREmployeeModeV12
      titleOverride="Slack"
      headerLayout="inline"
      deadlineCardPosition="header"
      sidebarHasTabs={false}
      showLeftPanel={false}
      showRadioTabs={true}
      showRiskScoreColumn={true}
      firstColumnHeader="User"
      hideUsersTab={true}
      hideTabBadges={true}
      hideOwnerColumn={true}
      hideProgressColumn={true}
      hideUsersIncludedColumn={true}
      riskColumnHeader="Risk"
      hideRiskGauge={false}
      insightsColumnHeader="Insights"
      showInsightsBadgeOnly={true}
      freezeFirstColumn={true}
      firstColumnWidth={200}
      hideViewByFilter={true}
      hideSortByFilter={true}
      initialSortColumn="col1"
      initialSortDirection="asc"
      customSortByUser={true}
      sampleUsersForSorting={sampleUsers}
      searchPlaceholder="Search users"
      showStatusColumn={false}
      groupsTabLabel="Insight Mode"
      showInsightsFilter={true}
      showSuggestedActionColumn={true}
      hideInsightPopoverRecommendedAction={true}
      showInsightPopoverDescriptionColumn={true}
      hideSuggestedActionBadgeOutline={true}
      filledSparkleIcon={false}
      customFirstColumnCell={(row) => {
        const userIndex = parseInt(row.id.replace('row-', '')) - 1;
        const user = sampleUsers[userIndex % sampleUsers.length] || sampleUsers[0];
        return (
          <div className="flex items-center gap-3 min-w-0">
            <Avatar className="h-8 w-8 flex-shrink-0">
              <AvatarFallback className="text-xs">
                {getInitials(user.firstName, user.lastName)}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col min-w-0 flex-1">
              <span className="text-sm font-medium truncate" title={`${user.firstName} ${user.lastName}`}>
                {user.firstName} {user.lastName}
              </span>
            </div>
          </div>
        );
      }}
      customActionColumn={(row) => {
        // Generate insights for this row to determine recommended action
        const match = row.col8?.match(/(\d+)%/);
        const percent = match ? parseInt(match[1]) : 0;
        const userCount = parseInt((row.col7 || '0').replace(/,/g, '')) || 0;
        const records = Math.floor((percent / 100) * userCount);
        const rowIndex = parseInt(row.id.replace('row-', '')) - 1;
        
        // Generate insights using the same logic as UAR.tsx
        const insights = generateInsightsForRow(rowIndex >= 0 ? rowIndex : 0, records);
        
        // Get risk level from row data - normalize to ensure it matches
        const riskLevel = (row.riskLevel || 'Medium').toString();
        const recommendedAction = getRecommendedAction(insights, riskLevel);
        
        return (
          <div className="flex gap-2">
            <Button 
              size="sm" 
              variant="outline" 
              className="h-7 w-7 p-0 flex items-center justify-center bg-green-100 hover:bg-green-200 border-green-300"
              title="Certify"
              aria-label="Certify"
            >
              <CheckCircle className={`h-4 w-4 text-green-600`} style={{ opacity: recommendedAction === 'Certify' ? 1 : 0.6 }} />
            </Button>
            <Button 
              size="sm" 
              variant="outline" 
              className="h-7 w-7 p-0 flex items-center justify-center bg-red-100 hover:bg-red-200 border-red-300"
              title="Revoke"
              aria-label="Revoke"
            >
              <XCircle className={`h-4 w-4 text-red-600`} style={{ opacity: recommendedAction === 'Revoke' ? 1 : 0.6 }} />
            </Button>
            <Button 
              size="sm" 
              variant="outline" 
              className="h-7 w-7 p-0 flex items-center justify-center bg-yellow-100 hover:bg-yellow-200 border-yellow-300"
              title="Modify"
              aria-label="Modify"
            >
              <Pencil className={`h-4 w-4 text-yellow-600`} style={{ opacity: recommendedAction === 'Modify' ? 1 : 0.6 }} />
            </Button>
          </div>
        );
      }}
    />
  ),
};
