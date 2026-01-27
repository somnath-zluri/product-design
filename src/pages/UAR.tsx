import { cn } from '@/lib/utils';
import { GlobalHeader } from '@/components/ui/global-header';
import { NavigationSidebar } from '@/components/ui/navigation-sidebar';
import { SidebarProvider, Sidebar } from '@/components/ui/sidebar';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { VerticalStepper, HorizontalStepper } from '@/components/ui/stepper';
import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/button-group';
import { Input } from '@/components/ui/input';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { InsightBadge, type Insight, ALL_INSIGHTS } from '@/components/ui/insight-badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import * as React from 'react';
import type { ReactNode } from 'react';
import { ChevronLeft, Search, ChevronRight, AlignLeft, AlignCenter, AlignRight, SlidersHorizontal, ArrowUpDown, ArrowUp, ArrowDown, Star, Sparkles, CheckCircle, XCircle, Pencil } from 'lucide-react';
import { FaApple, FaWindows } from 'react-icons/fa';
import { SiJira, SiFigma, SiGithub, SiSlack, SiNotion } from 'react-icons/si';
import { ShieldCheck } from 'lucide-react';
import {
  ColumnDef,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
  flexRender,
} from '@tanstack/react-table';

interface UARProps {
  className?: string;
  controlsBelowTitle?: boolean;
  showVerticalStepper?: boolean;
  showBreadcrumb?: boolean;
  titleOverride?: string;
  showLeftPanel?: boolean;
  showTableControls?: boolean;
  showTable?: boolean;
  showHorizontalStepper?: boolean;
  showRadioCard?: boolean;
  showRadioTabs?: boolean;
  showDeadlineCard?: boolean;
  showHeaderSummary?: boolean;
  showHeaderDescription?: boolean;
  deadlineCardPosition?: 'left' | 'right' | 'header';
  headerLayout?: 'default' | 'inline';
  headerBadgeLabel?: string;
  hideTimelineColumn?: boolean;
  hideInsightsColumn?: boolean;
  hideAppIncludedColumn?: boolean;
  hideUsersIncludedColumn?: boolean;
  showRiskScoreColumn?: boolean;
  moveHeaderDetailsToSidebar?: boolean;
  sidebarHasTabs?: boolean;
  firstColumnHeader?: string;
  showTimeRemainingColumn?: boolean;
  customTableColumns?: ColumnDef<any>[];
  customTableData?: any[];
  hideUsersTab?: boolean;
  hideTabBadges?: boolean;
  hideOwnerColumn?: boolean;
  hideProgressColumn?: boolean;
  customActionColumn?: (row: any) => ReactNode;
  customFirstColumnCell?: (row: any) => ReactNode;
  riskColumnHeader?: string;
  hideRiskGauge?: boolean;
  insightsColumnHeader?: string;
  showInsightsBadgeOnly?: boolean;
  freezeFirstColumn?: boolean;
  firstColumnWidth?: string;
  hideViewByFilter?: boolean;
  hideSortByFilter?: boolean;
  initialSortColumn?: string;
  initialSortDirection?: 'asc' | 'desc';
  customSortByUser?: boolean;
  sampleUsersForSorting?: Array<{ firstName: string; lastName: string }>;
  searchPlaceholder?: string;
  showStatusColumn?: boolean;
  customStatusValues?: Array<'Pending' | 'Certified' | 'Modified' | 'Revoked'>;
  showReviewerLevelColumn?: boolean;
  showTwoButtonGroup?: boolean;
  firstButtonLabel?: string;
  secondButtonLabel?: string;
  groupsTabLabel?: string;
  hideButtonGroup?: boolean;
  showInsightsFilter?: boolean;
  showSignOffButton?: boolean;
  showSuggestedActionColumn?: boolean;
  hideInsightPopoverRecommendedAction?: boolean;
  showInsightPopoverDescriptionColumn?: boolean;
  hideSuggestedActionBadgeOutline?: boolean;
  filledSparkleIcon?: boolean;
}

interface TableData {
  id: string;
  user: string;
  email: string;
  status: string;
}

const columns: ColumnDef<TableData>[] = [
  {
    accessorKey: 'user',
    header: 'User',
  },
  {
    accessorKey: 'email',
    header: 'Email ID',
  },
  {
    accessorKey: 'status',
    header: 'Status',
  },
];

const tableData: TableData[] = [
  { id: '1', user: 'Courtney Henry', email: 'courtney.henry@example.com', status: 'Active' },
  { id: '2', user: 'John Doe', email: 'john.doe@example.com', status: 'Active' },
  { id: '3', user: 'Jane Smith', email: 'jane.smith@example.com', status: 'Active' },
  { id: '4', user: 'Bob Johnson', email: 'bob.johnson@example.com', status: 'Active' },
  { id: '5', user: 'Alice Williams', email: 'alice.williams@example.com', status: 'Active' },
  { id: '6', user: 'Charlie Brown', email: 'charlie.brown@example.com', status: 'Active' },
  { id: '7', user: 'Diana Prince', email: 'diana.prince@example.com', status: 'Active' },
  { id: '8', user: 'Edward Norton', email: 'edward.norton@example.com', status: 'Active' },
  { id: '9', user: 'Fiona Apple', email: 'fiona.apple@example.com', status: 'Active' },
  { id: '10', user: 'George Lucas', email: 'george.lucas@example.com', status: 'Active' },
  { id: '11', user: 'Helen Hunt', email: 'helen.hunt@example.com', status: 'Active' },
  { id: '12', user: 'Ian McKellen', email: 'ian.mckellen@example.com', status: 'Active' },
  { id: '13', user: 'Julia Roberts', email: 'julia.roberts@example.com', status: 'Active' },
  { id: '14', user: 'Kevin Spacey', email: 'kevin.spacey@example.com', status: 'Active' },
  { id: '15', user: 'Laura Dern', email: 'laura.dern@example.com', status: 'Active' },
  { id: '16', user: 'Mark Ruffalo', email: 'mark.ruffalo@example.com', status: 'Active' },
  { id: '17', user: 'Natalie Portman', email: 'natalie.portman@example.com', status: 'Active' },
  { id: '18', user: 'Oscar Isaac', email: 'oscar.isaac@example.com', status: 'Active' },
  { id: '19', user: 'Penelope Cruz', email: 'penelope.cruz@example.com', status: 'Active' },
  { id: '20', user: 'Quentin Tarantino', email: 'quentin.tarantino@example.com', status: 'Active' },
];

const verticalSteps = [
  { label: 'Application Details' },
  { label: 'Set up Application' },
  { label: 'Complete Setup' },
];

const horizontalSteps = [
  { label: 'Scope Applications' },
  { label: 'Scope Users' },
  { label: 'Set Defaults (Optional)' },
  { label: 'Configure Applications' },
];

const appNames = [
  'Salesforce',
  'Slack',
  'Microsoft 365',
  'Google Workspace',
  'Zoom',
  'HubSpot',
  'Dropbox',
  'Shopify',
  'Stripe',
  'Notion',
  'Asana',
  'Trello',
  'Monday.com',
  'Zendesk',
  'Intercom',
  'Mailchimp',
  'Canva',
  'Figma',
  'Adobe Creative Cloud',
  'GitHub',
  'GitLab',
  'Atlassian',
  'AWS',
  'Google Cloud Platform',
  'Microsoft Azure',
  'Twilio',
  'SendGrid',
  'QuickBooks Online',
  'Xero',
  'FreshBooks',
  'DocuSign',
  'Calendly',
  'Typeform',
  'SurveyMonkey',
  'Buffer',
  'Hootsuite',
  'Sprout Social',
  'Grammarly',
  'LastPass',
  '1Password',
  'Vimeo',
  'Wistia',
  'Loom',
  'Miro',
  'Airtable',
  'Zapier',
  'IFTTT',
  'Segment',
  'Mixpanel',
  'Amplitude',
];
const ownerNames = [
  'Alex Morgan',
  'Priya Shah',
  'Daniel Kim',
  'Maya Patel',
  'Jordan Lee',
];
const appIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  Jira: SiJira,
  Figma: SiFigma,
  GitHub: SiGithub,
  Slack: SiSlack,
  Notion: SiNotion,
};
const getAppIncludedCount = (index: number) => ((index * 137) % 999) + 1;
const getUsersIncludedCount = (index: number) => ((index * 521) % 4991) + 10;
const getDueInDays = (index: number) => {
  // Ensure we have examples of At-Risk (0-3 days) by explicitly including them
  // Generate values from -10 (10 days overdue) to 90 (90 days remaining)
  // Use modulo to cycle through different ranges, ensuring 0-3 appear
  const cycle = index % 20;
  if (cycle < 4) {
    // Explicitly return 0, 1, 2, 3 for At-Risk examples
    return cycle;
  }
  // Generate other values: -10 to -1 (overdue) and 4 to 90 (on-track)
  const value = ((index * 17) % 95);
  if (value < 10) {
    return -(value + 1); // -1 to -10 (overdue)
  }
  return value + 4; // 4 to 94 (on-track)
};
const getInsightsPercent = (index: number) => (index * 9) % 101;

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

// Helper function to generate sample insights data
const generateInsights = (index: number, userCount: number, includeUserDescriptions: boolean = false, userName?: string): Insight[] => {
  // Generate 3-15 insights per row (minimum 3, maximum 15)
  // Use modulo to cycle through different counts: 3, 4, 5, ..., 15
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
        userSpecificDescription: generateUserSpecificDescription(insight.name, index + i, userName),
      }),
    });
  }
  
  return insights;
};
const getRiskLevel = (index: number) => {
  const roll = index % 3;
  if (roll === 0) return 'High';
  if (roll === 1) return 'Medium';
  return 'Low';
};
// Helper function to determine recommended action based on insights and risk level
const getSuggestedAction = (insights: Insight[], riskLevel: string): 'Certify' | 'Modify' | 'Revoke' => {
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
const getRiskScore = (index: number) => ((index * 13) % 91) + 5;
const formatCreatedOn = (index: number) => {
  const day = ((index * 7) % 28) + 1;
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const month = months[(index * 3) % months.length];
  const dayPadded = String(day).padStart(2, '0');
  return `${dayPadded} ${month} 2026`;
};
const getInitials = (name: string) =>
  name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('');
const formatNumber = (num: number | string): string => {
  const numValue = typeof num === 'string' ? parseInt(num, 10) : num;
  return numValue.toLocaleString('en-US');
};
// Generate realistic IGA certification names with IT admin short codes
const generateCertificationNames = (count: number): string[] => {
  const regions = ['IN', 'US', 'UK', 'APAC', 'EMEA', 'LATAM', 'CA', 'AU', 'DE', 'FR'];
  const teams = ['Product Team', 'Engineering Team', 'Operations Team', 'Finance Team', 'Sales Team', 'Marketing Team', 'HR Team', 'Legal Team', 'Security Team', 'Data Team'];
  const teamsShort = ['prod_team', 'eng_team', 'ops_team', 'finance_team', 'sales_team', 'mktg_team', 'hr_team', 'legal_team', 'sec_team', 'data_team'];
  const reviewFrequencies = ['Quarterly UAR', 'Annual UAR', 'Bi-annual UAR', 'Ad hoc UAR', 'Monthly UAR', 'Semi-annual UAR'];
  const reviewTypes = ['UAR', 'QAR', 'AAR', 'CAR', 'SAR'];
  const timePeriods = ['Q1 2026', 'Q2 2026', 'Q3 2026', 'Q4 2026', 'FY2026', 'H1 2026', 'H2 2026', '2026'];
  
  const names: string[] = [];
  const usedCombinations = new Set<string>();
  
  for (let i = 0; i < count; i++) {
    let name = '';
    let attempts = 0;
    
    // Generate unique combinations with variety
    while (attempts < 200) {
      const region = regions[i % regions.length];
      const useShortTeam = i % 3 !== 0; // Mix of short and full team names
      const team = useShortTeam ? teamsShort[Math.floor(i / regions.length) % teamsShort.length] : teams[Math.floor(i / regions.length) % teams.length];
      const useFrequency = i % 3 === 0; // Some use frequency-based naming
      const reviewFrequency = reviewFrequencies[Math.floor(i / (regions.length * teams.length)) % reviewFrequencies.length];
      const reviewType = reviewTypes[Math.floor(i / (regions.length * teams.length)) % reviewTypes.length];
      const timePeriod = timePeriods[Math.floor(i / (regions.length * teams.length * reviewFrequencies.length)) % timePeriods.length];
      
      // Create different patterns for variety
      const pattern = i % 6;
      if (pattern === 0) {
        name = useFrequency ? `${region}_${team} ${reviewFrequency} ${timePeriod}` : `${region}_${team} ${reviewType} ${timePeriod}`;
      } else if (pattern === 1) {
        name = useFrequency ? `${region} ${team} ${reviewFrequency}` : `${region} ${team} ${reviewType} ${timePeriod}`;
      } else if (pattern === 2) {
        name = useFrequency ? `${region}_${team} ${reviewFrequency}` : `${region}_${team} ${reviewType}`;
      } else if (pattern === 3) {
        name = useFrequency ? `${region} ${team} ${reviewFrequency} ${timePeriod}` : `${region} ${team} ${reviewType}`;
      } else if (pattern === 4) {
        name = useFrequency ? `${region}_${team} ${reviewFrequency}` : `${region}_${team} ${reviewType} ${timePeriod}`;
      } else {
        name = useFrequency ? `${region} ${team} ${reviewFrequency}` : `${region} ${team} ${reviewType} ${timePeriod}`;
      }
      
      // Clean up any double spaces
      name = name.replace(/\s+/g, ' ').trim();
      
      if (!usedCombinations.has(name)) {
        usedCombinations.add(name);
        break;
      }
      attempts++;
    }
    
    names.push(name);
  }
  
  return names;
};

const certificationNames = generateCertificationNames(50);

const frozenTableRows = Array.from({ length: 50 }, (_, index) => {
  const baseName = appNames[index % appNames.length];
  return {
    id: `row-${index + 1}`,
    col1: certificationNames[index],
    appBaseName: baseName,
    col2: ownerNames[index % ownerNames.length],
    col3: `${formatCreatedOn(index)}  \u2192  ${formatCreatedOn(index + 9)}`,
    col5Days: getDueInDays(index),
    col5Date: formatCreatedOn(index + 9),
    col6: `${getAppIncludedCount(index)}`,
    col7: `${getUsersIncludedCount(index)}`,
    col8: `${getInsightsPercent(index)}% users`,
    riskLevel: getRiskLevel(index),
    riskScore: getRiskScore(index),
    col9: (() => {
      const daysRemaining = getDueInDays(index);
      // All overdue items = Overdue
      if (daysRemaining < 0) {
        return 'Overdue';
      }
      // 0-3 days remaining = At-risk
      if (daysRemaining <= 3) {
        return 'At-risk';
      }
      // More than 3 days remaining = On-track
      return 'On-track';
    })(),
    progress: Math.min(100, Math.max(0, (index % 10) * 10 + (index % 3) * 5)),
    actionLabel: 'Review',
    reviewerLevel: Math.floor(Math.random() * 5) + 1, // Random reviewer level from 1 to 5
  };
})
  .sort((a, b) => a.col5Days - b.col5Days);

// Reviewer Progress data structure - different set of applications (only Application column)
const reviewerProgressRows = Array.from({ length: 30 }, (_, index) => {
  // Use different applications for reviewer progress view
  const reviewerProgressApps = [
    'Jira',
    'Confluence',
    'Bitbucket',
    'ServiceNow',
    'Okta',
    'Azure AD',
    'AWS IAM',
    'GitHub Enterprise',
    'GitLab',
    'Jenkins',
    'Docker Hub',
    'Kubernetes',
    'Terraform Cloud',
    'Ansible Tower',
    'Puppet',
    'Chef',
    'Splunk',
    'Datadog',
    'New Relic',
    'PagerDuty',
    'Opsgenie',
    'Vault',
    'CyberArk',
    'SailPoint',
    'BeyondTrust',
    'Qualys',
    'Nessus',
    'Rapid7',
    'Tenable',
    'Checkmarx',
  ];
  
  return {
    id: `reviewer-progress-row-${index + 1}`,
    application: reviewerProgressApps[index % reviewerProgressApps.length],
    reviewerLevel: Math.floor(Math.random() * 5) + 1, // Random reviewer level from 1 to 5
    totalLevels: Math.floor(Math.random() * 3) + 3, // Random total levels from 3 to 5
    activeLevel: Math.floor(Math.random() * 5) + 1, // Random active level from 1 to 5
    lastReviewedOn: formatCreatedOn(index), // Last reviewed date
    records: getUsersIncludedCount(index), // Records count
  };
})
  .sort((a, b) => a.application.localeCompare(b.application));

export function UAR({
  className,
  controlsBelowTitle = false,
  showVerticalStepper = true,
  showBreadcrumb = true,
  titleOverride,
  showLeftPanel = true,
  showTableControls = true,
  showTable = true,
  showHorizontalStepper = true,
  showRadioCard = false,
  showRadioTabs = true,
  showDeadlineCard = false,
  showHeaderSummary = true,
  showHeaderDescription = true,
  deadlineCardPosition = 'right',
  headerLayout = 'default',
  headerBadgeLabel,
  hideTimelineColumn = false,
  hideInsightsColumn = false,
  hideAppIncludedColumn = false,
  hideUsersIncludedColumn = false,
  showRiskScoreColumn = false,
  moveHeaderDetailsToSidebar = false,
  sidebarHasTabs = false,
  firstColumnHeader,
  showTimeRemainingColumn = false,
  customTableColumns,
  customTableData,
  hideUsersTab = false,
  hideTabBadges = false,
  hideOwnerColumn = false,
  hideProgressColumn = false,
  customActionColumn,
  customFirstColumnCell,
  riskColumnHeader,
  hideRiskGauge = false,
  insightsColumnHeader,
  showInsightsBadgeOnly = false,
  freezeFirstColumn = false,
  firstColumnWidth,
  hideViewByFilter = false,
  hideSortByFilter = false,
  initialSortColumn,
  initialSortDirection = 'asc',
  customSortByUser = false,
  sampleUsersForSorting,
  searchPlaceholder,
  showStatusColumn = false,
  customStatusValues,
  showReviewerLevelColumn = false,
  showTwoButtonGroup = false,
  firstButtonLabel = 'All',
  secondButtonLabel = 'Pending',
  groupsTabLabel = 'Groups',
  hideButtonGroup = false,
  showInsightsFilter = false,
  showSignOffButton = false,
  showSuggestedActionColumn = false,
  hideInsightPopoverRecommendedAction = false,
  showInsightPopoverDescriptionColumn = false,
  hideSuggestedActionBadgeOutline = false,
  filledSparkleIcon = false,
}: UARProps) {
  const deadlineCard = showDeadlineCard ? (
    <div className="relative flex flex-col items-start">
      <div className="mt-0 h-[88px] w-[112px] rounded-2xl border border-muted-foreground/40 px-4 py-3 text-center">
        <span className="absolute left-1/2 -top-1.5 -translate-x-1/2 bg-background px-1.5 text-[10px] font-medium tracking-[0.2em] text-muted-foreground">
          DEADLINE
        </span>
        <div className="text-[14px] font-semibold leading-[1.2]">Sunday</div>
        <div className="text-[24px] font-semibold leading-[1.2]">08</div>
        <div className="text-[14px] font-semibold leading-[1.2]">Mar, 2021</div>
      </div>
    </div>
  ) : null;
  const radioCardItems = [
    { label: 'Open', value: 128, radioLabel: 'Open' },
    { label: 'Overdue', value: 13, radioLabel: 'Overdue' },
    { label: 'Due in', value: 64, radioLabel: 'Due in', type: 'dropdown' as const },
    { label: 'Completed', value: 512, radioLabel: 'Completed' },
  ];
  const dueRangeOptions = [
    { value: 'today', label: 'Due today' },
    { value: 'tomorrow', label: 'Due tomorrow' },
    { value: '3-days', label: 'Due in 3 days' },
    { value: '5-days', label: 'Due in 5 days' },
    { value: '7-days', label: 'Due in 7 days' },
  ];
  const [selectedCardIndex, setSelectedCardIndex] = React.useState(0);
  const [dueRange, setDueRange] = React.useState('7-days');
  const selectedCardValue = radioCardItems[selectedCardIndex]?.value ?? 0;
  const tabCounts = React.useMemo(() => {
    const ratios = [0.5, 0.3, 0.2];
    const baseCounts = ratios.map((ratio) => Math.floor(selectedCardValue * ratio));
    const remainder = selectedCardValue - baseCounts.reduce((sum, count) => sum + count, 0);
    baseCounts[baseCounts.length - 1] += remainder;
    return baseCounts;
  }, [selectedCardValue]);
  const tabItems = [
    { value: 'applications', label: 'Applications', count: tabCounts[0] ?? 0, widthClass: 'w-[190px]' },
    { value: 'groups', label: groupsTabLabel, count: tabCounts[1] ?? 0, widthClass: 'w-[130px]' },
    { value: 'users', label: 'Users', count: tabCounts[2] ?? 0, widthClass: 'w-[120px]' },
  ].filter((tab) => !(hideUsersTab && tab.value === 'users'));
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 20,
  });
  const [frozenPageIndex, setFrozenPageIndex] = React.useState(0);
  const frozenPageSize = 20;
  const [searchOpen, setSearchOpen] = React.useState(false);
  const [currentHorizontalStep, setCurrentHorizontalStep] = React.useState(1);
  const [currentVerticalStep, setCurrentVerticalStep] = React.useState(1);
  const [dropdownAlign, setDropdownAlign] = React.useState<'start' | 'center' | 'end'>('center');
  const [sortColumn, setSortColumn] = React.useState<string | null>(initialSortColumn || 'col1');
  const [sortDirection, setSortDirection] = React.useState<'asc' | 'desc'>(initialSortDirection || 'asc');
  const [statusFilter, setStatusFilter] = React.useState<'all' | 'pending' | 'reviewed'>('all');
  const [viewMode, setViewMode] = React.useState<'review' | 'reviewer-progress'>('review');
  const [selectedInsightFilters, setSelectedInsightFilters] = React.useState<Set<string>>(new Set());
  const insightsScrollRef = React.useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = React.useState(false);
  const [canScrollRight, setCanScrollRight] = React.useState(true);

  // Check scroll position and update button states
  const checkScrollPosition = React.useCallback(() => {
    if (insightsScrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = insightsScrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    }
  }, []);

  // Scroll handlers
  const scrollInsights = (direction: 'left' | 'right') => {
    if (insightsScrollRef.current) {
      const scrollAmount = 200; // pixels to scroll
      const newScrollLeft = insightsScrollRef.current.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount);
      insightsScrollRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth',
      });
    }
  };

  // Handle horizontal scroll on wheel
  const handleWheel = React.useCallback((e: React.WheelEvent<HTMLDivElement>) => {
    if (insightsScrollRef.current) {
      e.preventDefault();
      insightsScrollRef.current.scrollLeft += e.deltaY;
    }
  }, []);

  // Check scroll position on mount and resize
  React.useEffect(() => {
    // Delay to ensure content is rendered
    const timer = setTimeout(() => {
      checkScrollPosition();
    }, 100);
    
    const scrollContainer = insightsScrollRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', checkScrollPosition);
      window.addEventListener('resize', checkScrollPosition);
      return () => {
        clearTimeout(timer);
        scrollContainer.removeEventListener('scroll', checkScrollPosition);
        window.removeEventListener('resize', checkScrollPosition);
      };
    }
    return () => clearTimeout(timer);
  }, [checkScrollPosition, showInsightsFilter]);
  
  // Reset pagination when switching views
  React.useEffect(() => {
    setFrozenPageIndex(0);
  }, [viewMode]);

  // Sort the data based on current sort column and direction
  const sortedTableRows = React.useMemo(() => {
    if (!sortColumn) return frozenTableRows;
    
    const sorted = [...frozenTableRows].sort((a, b) => {
      let aValue: any = a[sortColumn as keyof typeof a];
      let bValue: any = b[sortColumn as keyof typeof b];
      
      // Handle custom user sorting when customFirstColumnCell is used
      if (customSortByUser && sortColumn === 'col1' && customFirstColumnCell && sampleUsersForSorting) {
        // Extract row index from id to determine which user is displayed
        const aIndex = parseInt(a.id.replace('row-', '')) - 1;
        const bIndex = parseInt(b.id.replace('row-', '')) - 1;
        // Get the user for each row (use modulo to cycle through users)
        const aUserIndex = aIndex % sampleUsersForSorting.length;
        const bUserIndex = bIndex % sampleUsersForSorting.length;
        const aUser = sampleUsersForSorting[aUserIndex] || sampleUsersForSorting[0];
        const bUser = sampleUsersForSorting[bUserIndex] || sampleUsersForSorting[0];
        // Sort by full name (lastName firstName for proper alphabetical sorting)
        const aFullName = `${aUser.lastName} ${aUser.firstName}`.toLowerCase();
        const bFullName = `${bUser.lastName} ${bUser.firstName}`.toLowerCase();
        // Compare names alphabetically
        if (aFullName < bFullName) return sortDirection === 'asc' ? -1 : 1;
        if (aFullName > bFullName) return sortDirection === 'asc' ? 1 : -1;
        // If names are equal, maintain original order by row index
        return aIndex - bIndex;
      }
      // Skip the default comparison if we already handled custom user sorting
      if (!(customSortByUser && sortColumn === 'col1' && customFirstColumnCell && sampleUsersForSorting)) {
        // Handle numeric values
        if (sortColumn === 'col5Days' || sortColumn === 'progress' || sortColumn === 'riskScore') {
          aValue = Number(aValue) || 0;
          bValue = Number(bValue) || 0;
        }
        // Handle string values
        else if (typeof aValue === 'string' && typeof bValue === 'string') {
          aValue = aValue.toLowerCase();
          bValue = bValue.toLowerCase();
        }
        
        if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
        return 0;
      }
      
      return 0; // Fallback (shouldn't reach here for custom user sorting)
    });
    
    return sorted;
  }, [sortColumn, sortDirection, customSortByUser, customFirstColumnCell, sampleUsersForSorting]);

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      // Toggle direction if clicking the same column
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      // Set new column with ascending as default
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const handleSortByChange = (value: string) => {
    // Map select values to sortColumn and sortDirection
    const sortMap: Record<string, { column: string; direction: 'asc' | 'desc' }> = {
      'due-asc': { column: 'col5Days', direction: 'asc' },
      'due-desc': { column: 'col5Days', direction: 'desc' },
      'cert-asc': { column: 'col1', direction: 'asc' },
      'cert-desc': { column: 'col1', direction: 'desc' },
      'user-asc': { column: 'col1', direction: 'asc' },
      'user-desc': { column: 'col1', direction: 'desc' },
    };
    
    const sortConfig = sortMap[value];
    if (sortConfig) {
      setSortColumn(sortConfig.column);
      setSortDirection(sortConfig.direction);
    }
  };

  // Get current sort by value from sortColumn and sortDirection
  const getCurrentSortByValue = () => {
    if (sortColumn === 'col5Days') {
      return sortDirection === 'asc' ? 'due-asc' : 'due-desc';
    } else if (sortColumn === 'col1') {
      // Default to user sorting if customSortByUser is enabled, otherwise application
      if (customSortByUser) {
        return sortDirection === 'asc' ? 'user-asc' : 'user-desc';
      }
      return sortDirection === 'asc' ? 'cert-asc' : 'cert-desc';
    }
    return 'user-asc'; // Default to user-asc
  };

  // Determine which data set to use based on view mode
  const currentDataRows = viewMode === 'reviewer-progress' ? reviewerProgressRows : sortedTableRows;
  
  const frozenPageCount = Math.ceil(currentDataRows.length / frozenPageSize);
  const frozenPageStart = frozenPageIndex * frozenPageSize;
  const frozenPageEnd = Math.min(frozenPageStart + frozenPageSize, currentDataRows.length);
  const frozenPageRows = currentDataRows.slice(frozenPageStart, frozenPageEnd);
  const headerDescriptionBlock = showHeaderDescription ? (
    <div className="text-sm text-foreground max-w-[520px]">
      <p className="line-clamp-3">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor. Ut enim ad minim.
        Et... <button className="text-sm text-foreground underline underline-offset-2">Read more</button>
      </p>
    </div>
  ) : null;
  const headerKeyValueBlock = (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <span className="text-[10px] font-medium tracking-[0.12em] text-muted-foreground">Status</span>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="w-fit border-transparent text-xs font-semibold">
            On-track
          </Badge>
          <Separator orientation="vertical" className="h-4" />
          <span className="text-xs text-muted-foreground">9 days remaining</span>
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-[10px] font-medium tracking-[0.12em] text-muted-foreground">Owner</span>
        <span className="w-fit text-sm font-semibold text-foreground border-b border-dashed border-current pb-[1px]">
          Alex Morgan
        </span>
      </div>
    </div>
  );
  const renderRiskGauge = (level: 'High' | 'Medium' | 'Low', score: number) => {
    const config = {
      High: { textClass: 'text-rose-500', bgClass: 'bg-rose-100', progress: 1 },
      Medium: { textClass: 'text-amber-500', bgClass: 'bg-amber-100', progress: 0.66 },
      Low: { textClass: 'text-emerald-500', bgClass: 'bg-emerald-100', progress: 0.33 },
    }[level];
    const radius = 12;
    const arcLength = Math.PI * radius;
    const dash = arcLength * config.progress;
    const needleAngle = -90 + config.progress * 180;

    return (
      <div className="flex items-center gap-0.5">
        <svg width="32" height="18" viewBox="0 0 32 18" aria-hidden="true">
          <path
            d="M 4 16 A 12 12 0 0 1 28 16"
            fill="none"
            stroke="hsl(var(--muted-foreground) / 0.35)"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="M 4 16 A 12 12 0 0 1 28 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray={`${dash} ${arcLength}`}
            className={config.textClass}
          />
          <line
            x1="16"
            y1="16"
            x2="16"
            y2="11"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            transform={`rotate(${needleAngle} 16 16)`}
            className={config.textClass}
          />
          <circle cx="16" cy="16" r="1.5" fill="currentColor" className={config.textClass} />
        </svg>
        <div className="flex flex-col">
          <span
            className={`inline-flex w-fit items-center rounded-full border border-transparent px-2 py-0.5 text-[10px] font-semibold ${config.textClass} ${config.bgClass}`}
          >
            {level}
          </span>
        </div>
      </div>
    );
  };

  const finalColumns = customTableColumns || columns;
  const finalTableData = customTableData || tableData;

  const table = useReactTable({
    data: finalTableData,
    columns: finalColumns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    state: {
      pagination,
    },
    initialState: {
      pagination: {
        pageSize: 20,
      },
    },
  });

  return (
    <div className={cn('mx-auto flex h-screen w-full flex-col bg-background overflow-x-hidden', className)}>
      {/* Top Navigation Bar */}
      <GlobalHeader />

      {/* Main Content Area with Navigation Sidebar */}
      <SidebarProvider>
        <Sidebar className="flex flex-1 overflow-hidden">
          {/* Navigation Sidebar */}
          <NavigationSidebar defaultSelected="Access Requests" />

          {/* Main Body */}
          <main className="flex flex-1 flex-col overflow-hidden bg-background min-w-0">
            {/* Breadcrumb */}
            {showBreadcrumb ? (
              <div className="border-b bg-background px-6 py-4">
                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <ChevronLeft className="h-4 w-4" />
                        <span className="sr-only">Back</span>
                      </Button>
                    </BreadcrumbItem>
                    <BreadcrumbItem>
                      <BreadcrumbLink href="#">Create Application</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbPage>Untitled Application</BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              </div>
            ) : null}

            {/* Two Column Layout */}
            <div className="flex flex-1 overflow-hidden">
              {/* Left Column - Vertical Stepper */}
              {showVerticalStepper ? (
                <div className="w-[200px] border-r bg-background p-3">
                  <VerticalStepper steps={verticalSteps} currentStep={currentVerticalStep} />
                </div>
              ) : null}

              {/* Right Column - Main Content */}
              <div className="flex flex-1 flex-col overflow-hidden">
                {/* Header - Title and Horizontal Stepper */}
                <header
                  className={cn(
                    'border-b bg-background px-6 py-4',
                    headerLayout === 'inline' && 'flex items-start gap-4'
                  )}
                >
                  {headerLayout === 'inline' ? (
                    <>
                      <div className="flex flex-col gap-2">
                        <h1 className="text-2xl font-bold">
                          {titleOverride ?? verticalSteps[currentVerticalStep]?.label ?? 'Setup Application'}
                        </h1>
                        {!moveHeaderDetailsToSidebar ? headerDescriptionBlock : null}
                        {!moveHeaderDetailsToSidebar ? headerKeyValueBlock : null}
                        {showHeaderSummary ? (
                          <div className="flex flex-wrap items-center gap-3">
                            <div className="flex flex-col gap-1 border-r border-muted-foreground/40 pr-4">
                              <span className="text-[10px] font-medium tracking-[0.12em] text-muted-foreground">
                                Days remaining
                              </span>
                              <div className="flex items-center text-xs font-semibold text-foreground">
                                <Badge variant="secondary" className="border-transparent">
                                  9 days remaining
                                </Badge>
                              </div>
                            </div>
                            <div className="flex flex-col gap-1">
                              <span className="text-[10px] font-medium tracking-[0.12em] text-muted-foreground">Status</span>
                              <div className="flex items-center text-xs font-semibold text-foreground">
                                <Badge variant="secondary" className="border-transparent">
                                  On-track
                                </Badge>
                              </div>
                            </div>
                            <div className="flex flex-col gap-1 border-r border-muted-foreground/40 pr-4">
                              <span className="text-[10px] font-medium tracking-[0.12em] text-muted-foreground">Owner</span>
                              <div className="flex items-center text-xs font-semibold text-foreground">
                                <span className="border-b border-dashed border-current pb-[1px]">Alex Morgan</span>
                              </div>
                            </div>
                          </div>
                        ) : null}
                      </div>
                      {showHorizontalStepper ? (
                        <div className="flex items-center gap-4">
                          <HorizontalStepper steps={horizontalSteps} currentStep={currentHorizontalStep} />
                        </div>
                      ) : null}
                    </>
                  ) : (
                    <div className="flex items-start justify-between gap-6">
                      <div className="flex flex-col gap-2">
                        {headerBadgeLabel ? (
                          <div className="flex items-center gap-2">
                            <h1 className="text-2xl font-bold">
                              {titleOverride ?? verticalSteps[currentVerticalStep]?.label ?? 'Setup Application'}
                            </h1>
                            <Badge variant="secondary" className="border-transparent text-xs font-medium">
                              {headerBadgeLabel}
                            </Badge>
                          </div>
                        ) : (
                          <h1 className="text-2xl font-bold">
                            {titleOverride ?? verticalSteps[currentVerticalStep]?.label ?? 'Setup Application'}
                          </h1>
                        )}
                        {!moveHeaderDetailsToSidebar ? headerDescriptionBlock : null}
                        {showHeaderSummary ? (
                          <div className="flex flex-wrap items-center gap-3">
                            <div className="flex flex-col gap-1 border-r border-muted-foreground/40 pr-4">
                              <span className="text-[10px] font-medium tracking-[0.12em] text-muted-foreground">
                                Days remaining
                              </span>
                              <div className="flex items-center text-xs font-semibold text-foreground">
                                <Badge variant="secondary" className="border-transparent">
                                  9 days remaining
                                </Badge>
                              </div>
                            </div>
                            <div className="flex flex-col gap-1">
                              <span className="text-[10px] font-medium tracking-[0.12em] text-muted-foreground">Status</span>
                              <div className="flex items-center text-xs font-semibold text-foreground">
                                <Badge variant="secondary" className="border-transparent">
                                  On-track
                                </Badge>
                              </div>
                            </div>
                            <div className="flex flex-col gap-1 border-r border-muted-foreground/40 pr-4">
                              <span className="text-[10px] font-medium tracking-[0.12em] text-muted-foreground">Owner</span>
                              <div className="flex items-center text-xs font-semibold text-foreground">
                                <span className="border-b border-dashed border-current pb-[1px]">Alex Morgan</span>
                              </div>
                            </div>
                          </div>
                        ) : null}
                      </div>
                      <div className="flex items-center gap-4">
                        {showHorizontalStepper ? (
                          <HorizontalStepper steps={horizontalSteps} currentStep={currentHorizontalStep} />
                        ) : null}
                      </div>
                    </div>
                  )}
                </header>

                {/* Content Area - Two Columns */}
                <div className="flex flex-1 overflow-hidden">
                  {/* Left Column - Title and Footer */}
                  {showLeftPanel ? (
                    <div className="w-[320px] border-r bg-background flex flex-col">
                      <div className="p-4 flex flex-col gap-6">
                        {sidebarHasTabs ? (
                          <>
                            <h2 className="text-lg font-semibold">Certification Details</h2>
                            <div className="flex flex-col gap-6">
                              {moveHeaderDetailsToSidebar ? (
                                <div className="flex flex-col gap-2">
                                  <span className="text-[10px] font-medium tracking-wide text-muted-foreground">
                                    Description
                                  </span>
                                  {headerDescriptionBlock}
                                </div>
                              ) : null}
                              {moveHeaderDetailsToSidebar ? headerKeyValueBlock : null}
                            </div>
                          </>
                        ) : (
                          <>
                            {moveHeaderDetailsToSidebar ? (
                              <div className="flex flex-col gap-2">
                                <span className="text-[10px] font-medium tracking-wide text-muted-foreground">
                                  Description
                                </span>
                                {headerDescriptionBlock}
                              </div>
                            ) : null}
                            {moveHeaderDetailsToSidebar ? headerKeyValueBlock : null}
                          </>
                        )}
                      </div>
                    </div>
                  ) : null}

                  {/* Right Column - DataTable with Controls */}
                  <div className="flex flex-1 flex-col overflow-hidden bg-background">
                    {/* Controls */}
                    {showTableControls ? (
                      controlsBelowTitle ? (
                        <div className="border-b bg-background px-4 py-4">
                          <div className="flex items-center gap-4 mb-4">
                            <div className="relative">
                              <label className="absolute bg-background px-1 text-[10px] text-muted-foreground z-10" style={{ left: '10px', top: '-5px' }}>
                                Preview Users From
                              </label>
                              <Select defaultValue="Figma">
                                <SelectTrigger className="w-[144px]">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="Figma">Figma</SelectItem>
                                  <SelectItem value="Sketch">Sketch</SelectItem>
                                  <SelectItem value="Adobe XD">Adobe XD</SelectItem>
                                  <SelectItem value="Framer">Framer</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <Popover open={searchOpen} onOpenChange={setSearchOpen}>
                              <PopoverTrigger asChild>
                                <Button variant="outline" size="icon" className="h-10 w-10">
                                  <Search className="h-4 w-4" />
                                  <span className="sr-only">Search</span>
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent className="w-[300px] p-0" align={dropdownAlign}>
                                <div className="p-3 border-b">
                                  <div className="flex flex-col items-start justify-start gap-2">
                                    <div className="w-full relative">
                                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                      <Input
                                        placeholder={searchPlaceholder || "Search users"}
                                        className="pl-9 pr-3 w-full"
                                        onKeyDown={(e) => {
                                          if (e.key === 'Enter') {
                                            // Handle search
                                          }
                                        }}
                                      />
                                    </div>
                                    <div className="text-xs text-muted-foreground shrink-0 whitespace-nowrap flex items-center gap-1.5">
                                      Press{' '}
                                      <span className="inline-flex items-center gap-1 rounded px-1.5 py-0.5 bg-muted text-muted-foreground text-xs font-medium">
                                        Return
                                        <FaApple className="h-3 w-3" />
                                      </span>
                                      {' '}/{' '}
                                      <span className="inline-flex items-center gap-1 rounded px-1.5 py-0.5 bg-muted text-muted-foreground text-xs font-medium">
                                        Enter
                                        <FaWindows className="h-3 w-3" />
                                      </span>
                                      {' '}to search
                                    </div>
                                  </div>
                                </div>
                              </PopoverContent>
                            </Popover>
                            <Separator orientation="vertical" className="h-6" />
                            <div className="flex items-center gap-2">
                              <span className="text-sm text-muted-foreground">
                                {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1}-
                                {Math.min(
                                  (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
                                  table.getRowModel().rows.length
                                )}{' '}
                                of {table.getRowModel().rows.length} Users
                              </span>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => table.previousPage()}
                                disabled={!table.getCanPreviousPage()}
                                className="h-6 w-6"
                              >
                                <ChevronLeft className="h-4 w-4" />
                                <span className="sr-only">Previous</span>
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => table.nextPage()}
                                disabled={!table.getCanNextPage()}
                                className="h-6 w-6"
                              >
                                <ChevronRight className="h-4 w-4" />
                                <span className="sr-only">Next</span>
                              </Button>
                            </div>
                            <Separator orientation="vertical" className="h-6" />
                          </div>
                        </div>
                      ) : (
                        <div className="border-b bg-background px-4 py-4 flex items-center justify-between gap-4">
                          <div className="relative">
                            <label className="absolute bg-background px-1 text-[10px] text-muted-foreground z-10" style={{ left: '10px', top: '-5px' }}>
                              Preview Users From
                            </label>
                            <Select defaultValue="Figma">
                              <SelectTrigger className="w-[144px]">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Figma">Figma</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="flex items-center gap-4">
                            <Popover open={searchOpen} onOpenChange={setSearchOpen}>
                              <PopoverTrigger asChild>
                                <Button variant="outline" size="icon" className="h-10 w-10">
                                  <Search className="h-4 w-4" />
                                  <span className="sr-only">Search</span>
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent className="w-[300px] p-0" align={dropdownAlign}>
                                <div className="p-3 border-b">
                                  <div className="flex flex-col items-start justify-start gap-2">
                                    <div className="w-full relative">
                                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                      <Input
                                        placeholder={searchPlaceholder || "Search users"}
                                        className="pl-9 pr-3 w-full"
                                        onKeyDown={(e) => {
                                          if (e.key === 'Enter') {
                                            // Handle search
                                          }
                                        }}
                                      />
                                    </div>
                                    <div className="text-xs text-muted-foreground shrink-0 whitespace-nowrap flex items-center gap-1.5">
                                      Press{' '}
                                      <span className="inline-flex items-center gap-1 rounded px-1.5 py-0.5 bg-muted text-muted-foreground text-xs font-medium">
                                        Return
                                        <FaApple className="h-3 w-3" />
                                      </span>
                                      {' '}/{' '}
                                      <span className="inline-flex items-center gap-1 rounded px-1.5 py-0.5 bg-muted text-muted-foreground text-xs font-medium">
                                        Enter
                                        <FaWindows className="h-3 w-3" />
                                      </span>
                                      {' '}to search
                                    </div>
                                  </div>
                                </div>
                              </PopoverContent>
                            </Popover>
                            <Separator orientation="vertical" className="h-6" />
                            <div className="flex items-center gap-2">
                              <span className="text-sm text-muted-foreground">
                                {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1}-
                                {Math.min(
                                  (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
                                  table.getRowModel().rows.length
                                )}{' '}
                                of {table.getRowModel().rows.length} Users
                              </span>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => table.previousPage()}
                                disabled={!table.getCanPreviousPage()}
                                className="h-6 w-6"
                              >
                                <ChevronLeft className="h-4 w-4" />
                                <span className="sr-only">Previous</span>
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => table.nextPage()}
                                disabled={!table.getCanNextPage()}
                                className="h-6 w-6"
                              >
                                <ChevronRight className="h-4 w-4" />
                                <span className="sr-only">Next</span>
                              </Button>
                            </div>
                          </div>
                        </div>
                      )
                    ) : null}

                    <div className="flex flex-1 min-h-0 flex-col px-4 py-4">
                      <Tabs defaultValue="applications">
                        {showRadioCard ? (
                          <TabsContent value="applications">
                            <RadioGroup
                              value={`applications-${selectedCardIndex}`}
                              onValueChange={(value) => {
                                const match = value.match(/-(\d+)$/);
                                if (match) {
                                  setSelectedCardIndex(Number(match[1]));
                                }
                              }}
                              className="grid grid-cols-4 gap-4"
                            >
                              {radioCardItems.map((item, index) => (
                                <Label
                                  key={index}
                                  htmlFor={`applications-radio-${index}`}
                                  className={`flex cursor-pointer items-stretch rounded-lg border bg-background transition-colors hover:bg-muted/40 peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-muted/60 ${item.type === 'dropdown' ? 'p-0' : 'p-5'}`}
                                >
                                  <div className={`flex flex-1 items-start justify-between gap-6 ${item.type === 'dropdown' ? 'p-5' : ''}`}>
                                  <div className="grid gap-2">
                                    {item.type === 'dropdown' ? (
                                      <>
                                        <Select value={dueRange} onValueChange={setDueRange}>
                                          <SelectTrigger className="h-auto w-auto items-start justify-start gap-1 border-0 bg-transparent px-0 py-0 text-xs font-medium uppercase tracking-wide text-muted-foreground shadow-none focus:ring-0 [&>svg]:h-3 [&>svg]:w-3 [&>svg]:mt-0.5">
                                            <SelectValue />
                                          </SelectTrigger>
                                          <SelectContent>
                                            {dueRangeOptions.map((option) => (
                                              <SelectItem key={option.value} value={option.value}>
                                                {option.label}
                                              </SelectItem>
                                            ))}
                                          </SelectContent>
                                        </Select>
                                        <div className="text-3xl font-semibold">{item.value}</div>
                                      </>
                                    ) : (
                                      <>
                                        <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                                          {item.label}
                                        </span>
                                        <div className="text-3xl font-semibold">{item.value}</div>
                                      </>
                                    )}
                                  </div>
                                  <RadioGroupItem
                                    value={`applications-${index}`}
                                    id={`applications-radio-${index}`}
                                    aria-label={item.radioLabel}
                                    className="peer"
                                  />
                                  </div>
                                </Label>
                              ))}
                            </RadioGroup>
                          </TabsContent>
                        ) : null}
                        {showRadioCard ? (
                          <TabsContent value="groups">
                            <RadioGroup
                              value={`groups-${selectedCardIndex}`}
                              onValueChange={(value) => {
                                const match = value.match(/-(\d+)$/);
                                if (match) {
                                  setSelectedCardIndex(Number(match[1]));
                                }
                              }}
                              className="grid grid-cols-4 gap-4"
                            >
                              {radioCardItems.map((item, index) => (
                                <Label
                                  key={index}
                                  htmlFor={`groups-radio-${index}`}
                                  className={`flex cursor-pointer items-stretch rounded-lg border bg-background transition-colors hover:bg-muted/40 peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-muted/60 ${item.type === 'dropdown' ? 'p-0' : 'p-5'}`}
                                >
                                  <div className={`flex flex-1 items-start justify-between gap-6 ${item.type === 'dropdown' ? 'p-5' : ''}`}>
                                  <div className="grid gap-2">
                                    {item.type === 'dropdown' ? (
                                      <>
                                        <Select value={dueRange} onValueChange={setDueRange}>
                                          <SelectTrigger className="h-auto w-auto items-start justify-start gap-1 border-0 bg-transparent px-0 py-0 text-xs font-medium uppercase tracking-wide text-muted-foreground shadow-none focus:ring-0 [&>svg]:h-3 [&>svg]:w-3 [&>svg]:mt-0.5">
                                            <SelectValue />
                                          </SelectTrigger>
                                          <SelectContent>
                                            {dueRangeOptions.map((option) => (
                                              <SelectItem key={option.value} value={option.value}>
                                                {option.label}
                                              </SelectItem>
                                            ))}
                                          </SelectContent>
                                        </Select>
                                        <div className="text-3xl font-semibold">{item.value}</div>
                                      </>
                                    ) : (
                                      <>
                                        <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                                          {item.label}
                                        </span>
                                        <div className="text-3xl font-semibold">{item.value}</div>
                                      </>
                                    )}
                                  </div>
                                  <RadioGroupItem
                                    value={`groups-${index}`}
                                    id={`groups-radio-${index}`}
                                    aria-label={item.radioLabel}
                                    className="peer"
                                  />
                                  </div>
                                </Label>
                              ))}
                            </RadioGroup>
                          </TabsContent>
                        ) : null}
                        {showRadioCard ? (
                          <TabsContent value="users">
                            <RadioGroup
                              value={`users-${selectedCardIndex}`}
                              onValueChange={(value) => {
                                const match = value.match(/-(\d+)$/);
                                if (match) {
                                  setSelectedCardIndex(Number(match[1]));
                                }
                              }}
                              className="grid grid-cols-4 gap-4"
                            >
                              {radioCardItems.map((item, index) => (
                                <Label
                                  key={index}
                                  htmlFor={`users-radio-${index}`}
                                  className={`flex cursor-pointer items-stretch rounded-lg border bg-background transition-colors hover:bg-muted/40 peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-muted/60 ${item.type === 'dropdown' ? 'p-0' : 'p-5'}`}
                                >
                                  <div className={`flex flex-1 items-start justify-between gap-6 ${item.type === 'dropdown' ? 'p-5' : ''}`}>
                                  <div className="grid gap-2">
                                    {item.type === 'dropdown' ? (
                                      <>
                                        <Select value={dueRange} onValueChange={setDueRange}>
                                          <SelectTrigger className="h-auto w-auto items-start justify-start gap-1 border-0 bg-transparent px-0 py-0 text-xs font-medium uppercase tracking-wide text-muted-foreground shadow-none focus:ring-0 [&>svg]:h-3 [&>svg]:w-3 [&>svg]:mt-0.5">
                                            <SelectValue />
                                          </SelectTrigger>
                                          <SelectContent>
                                            {dueRangeOptions.map((option) => (
                                              <SelectItem key={option.value} value={option.value}>
                                                {option.label}
                                              </SelectItem>
                                            ))}
                                          </SelectContent>
                                        </Select>
                                        <div className="text-3xl font-semibold">{item.value}</div>
                                      </>
                                    ) : (
                                      <>
                                        <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                                          {item.label}
                                        </span>
                                        <div className="text-3xl font-semibold">{item.value}</div>
                                      </>
                                    )}
                                  </div>
                                  <RadioGroupItem
                                    value={`users-${index}`}
                                    id={`users-radio-${index}`}
                                    aria-label={item.radioLabel}
                                    className="peer"
                                  />
                                  </div>
                                </Label>
                              ))}
                            </RadioGroup>
                          </TabsContent>
                        ) : null}
                        {showRadioTabs ? (
                          <TabsList className="w-full justify-start rounded-none border-b bg-transparent p-0">
                            {tabItems.map((tab) => (
                              <TabsTrigger
                                key={tab.value}
                                value={tab.value}
                                className={`rounded-none border-b-2 border-transparent px-4 py-2 -mb-px data-[state=active]:border-foreground data-[state=active]:shadow-none ${tab.widthClass}`}
                              >
                                <span>{tab.label}</span>
                                {!hideTabBadges && (
                                  <Badge variant="secondary" className="ml-2 min-w-[28px] justify-center">
                                    {tab.count}
                                  </Badge>
                                )}
                              </TabsTrigger>
                            ))}
                          </TabsList>
                        ) : null}
                        </Tabs>
                        {showInsightsFilter && (
                          <div className="mt-4 flex h-fit items-center gap-3 px-4 py-0">
                            <span className="text-sm font-medium shrink-0 flex items-center gap-1.5">
                              <Sparkles className="h-4 w-4" />
                              Insights
                            </span>
                            <div className="flex items-center gap-2 flex-1 min-w-0">
                              <button
                                onClick={() => scrollInsights('left')}
                                disabled={!canScrollLeft}
                                className={cn(
                                  "shrink-0 h-8 w-8 flex items-center justify-center rounded-full border transition-colors",
                                  canScrollLeft
                                    ? "bg-background hover:bg-muted cursor-pointer border-border"
                                    : "bg-muted cursor-not-allowed border-muted opacity-50"
                                )}
                                aria-label="Scroll left"
                              >
                                <ChevronLeft className={cn("h-4 w-4", !canScrollLeft && "text-muted-foreground")} />
                              </button>
                              <div
                                ref={insightsScrollRef}
                                onWheel={handleWheel}
                                className="flex items-center gap-2 overflow-x-auto flex-1 min-w-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
                              >
                                {ALL_INSIGHTS.map((insight, index) => {
                                  const insightId = insight.name.toLowerCase().replace(/\s+/g, '-');
                                  const isSelected = selectedInsightFilters.has(insightId);
                                  // Placeholder count - can be calculated from actual data later
                                  // Using index-based calculation for stable counts
                                  const count = ((index * 7) % 50) + 1;
                                  
                                  return (
                                    <button
                                      key={insightId}
                                      onClick={() => {
                                        const newSelected = new Set(selectedInsightFilters);
                                        if (isSelected) {
                                          newSelected.delete(insightId);
                                        } else {
                                          newSelected.add(insightId);
                                        }
                                        setSelectedInsightFilters(newSelected);
                                      }}
                                      className={cn(
                                        "rounded-full border px-3 py-1 text-xs font-medium transition-colors cursor-pointer shrink-0 whitespace-nowrap",
                                        isSelected
                                          ? "bg-primary text-primary-foreground border-primary"
                                          : "bg-muted text-muted-foreground border-border hover:bg-muted/80"
                                      )}
                                    >
                                      {count} {insight.name}
                                    </button>
                                  );
                                })}
                              </div>
                              <button
                                onClick={() => scrollInsights('right')}
                                disabled={!canScrollRight}
                                className={cn(
                                  "shrink-0 h-8 w-8 flex items-center justify-center rounded-full border transition-colors",
                                  canScrollRight
                                    ? "bg-background hover:bg-muted cursor-pointer border-border"
                                    : "bg-muted cursor-not-allowed border-muted opacity-50"
                                )}
                                aria-label="Scroll right"
                              >
                                <ChevronRight className={cn("h-4 w-4", !canScrollRight && "text-muted-foreground")} />
                              </button>
                            </div>
                          </div>
                        )}
                        <div className="mt-4 flex min-h-0 flex-1 flex-col overflow-hidden rounded-lg border">
                          <div className="mt-0 flex flex-wrap items-center justify-between gap-3 border-b bg-background px-4 h-fit pt-3 pb-3">
                            <div className="flex flex-wrap items-center gap-2">
                              {!hideButtonGroup && (
                                <>
                                  {showTwoButtonGroup ? (
                                    <ButtonGroup>
                                      <Button
                                        variant={viewMode === 'review' ? 'default' : 'outline'}
                                        size="sm"
                                        onClick={() => setViewMode('review')}
                                      >
                                        {firstButtonLabel}
                                      </Button>
                                      <Button
                                        variant={viewMode === 'reviewer-progress' ? 'default' : 'outline'}
                                        size="sm"
                                        onClick={() => setViewMode('reviewer-progress')}
                                      >
                                        {secondButtonLabel}
                                      </Button>
                                    </ButtonGroup>
                                  ) : (
                                    <ButtonGroup>
                                      <Button
                                        variant={statusFilter === 'all' ? 'default' : 'outline'}
                                        size="sm"
                                        onClick={() => setStatusFilter('all')}
                                      >
                                        {firstButtonLabel}
                                      </Button>
                                      <Button
                                        variant={statusFilter === 'pending' ? 'default' : 'outline'}
                                        size="sm"
                                        onClick={() => setStatusFilter('pending')}
                                      >
                                        {secondButtonLabel}
                                      </Button>
                                      <Button
                                        variant={statusFilter === 'reviewed' ? 'default' : 'outline'}
                                        size="sm"
                                        onClick={() => setStatusFilter('reviewed')}
                                      >
                                        Reviewed
                                      </Button>
                                    </ButtonGroup>
                                  )}
                                </>
                              )}
                              {!hideViewByFilter && (
                                <div className="relative">
                                  <label
                                    className="absolute -top-2 left-2 bg-background px-1 text-[10px] text-muted-foreground"
                                    htmlFor="view-by-select"
                                  >
                                    View by
                                  </label>
                                  <Select defaultValue="all">
                                    <SelectTrigger id="view-by-select" className="h-9 w-[160px]">
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="all">All</SelectItem>
                                      <SelectItem value="applications">Applications</SelectItem>
                                      <SelectItem value="groups">{groupsTabLabel}</SelectItem>
                                      <SelectItem value="users">Users</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                              )}
                              {!hideSortByFilter && (
                                <div className="relative">
                                  <label
                                    className="absolute -top-2 left-2 bg-background px-1 text-[10px] text-muted-foreground"
                                    htmlFor="sort-by-select"
                                  >
                                    Sort by
                                  </label>
                                  <Select value={getCurrentSortByValue()} onValueChange={handleSortByChange}>
                                    <SelectTrigger id="sort-by-select" className="h-9 w-[160px]">
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="user-asc">User: A-Z</SelectItem>
                                      <SelectItem value="user-desc">User: Z-A</SelectItem>
                                      <SelectItem value="due-asc">Due: Soonest</SelectItem>
                                      <SelectItem value="due-desc">Due: Latest</SelectItem>
                                      <SelectItem value="cert-asc">Application: A-Z</SelectItem>
                                      <SelectItem value="cert-desc">Application: Z-A</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                              )}
                              <div className="relative">
                                <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                <Input
                                  placeholder={searchPlaceholder || "Search apps"}
                                  className="h-9 w-[220px] pl-8"
                                />
                              </div>
                              <Button variant="outline" size="sm">
                                <SlidersHorizontal className="mr-2 h-4 w-4" />
                                Filters
                              </Button>
                            </div>
                            <div className="flex flex-wrap items-center gap-3">
                              {showSignOffButton && (
                                <>
                                  <Button variant="default" size="sm">
                                    Sign-off
                                  </Button>
                                  <Separator orientation="vertical" className="h-6" />
                                </>
                              )}
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <span>
                                  {frozenPageStart + 1}-{frozenPageEnd} of {currentDataRows.length}
                                </span>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => setFrozenPageIndex((prev) => Math.max(0, prev - 1))}
                                  disabled={frozenPageIndex === 0}
                                  className="h-9 w-9 p-0"
                                >
                                  <ChevronLeft className="h-4 w-4" />
                                  <span className="sr-only">Previous</span>
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() =>
                                    setFrozenPageIndex((prev) => Math.min(frozenPageCount - 1, prev + 1))
                                  }
                                  disabled={frozenPageIndex >= frozenPageCount - 1}
                                  className="h-9 w-9 p-0"
                                >
                                  <ChevronRight className="h-4 w-4" />
                                  <span className="sr-only">Next</span>
                                </Button>
                              </div>
                            </div>
                          </div>
                        <div className="flex-1 overflow-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-muted [&::-webkit-scrollbar-thumb]:bg-muted-foreground/20 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-muted-foreground/30">
                            <Table className="min-w-[900px]">
                            <TableHeader className="sticky top-0 z-20 bg-muted border-b [&_tr]:border-b">
                              <TableRow>
                                {viewMode === 'reviewer-progress' ? (
                                  <>
                                    <TableHead 
                                      className="py-2 text-xs bg-muted cursor-pointer select-none transition-colors hover:bg-muted/80 group"
                                    >
                                      <div className="flex items-center gap-2">
                                        <span>Application</span>
                                        <ArrowUpDown className="h-3 w-3 opacity-0 group-hover:opacity-50 transition-opacity" />
                                      </div>
                                    </TableHead>
                                    <TableHead className="py-2 text-xs bg-muted">Records</TableHead>
                                    <TableHead className="py-2 text-xs bg-muted">Level Status (Progress)</TableHead>
                                    <TableHead className="py-2 text-xs bg-muted">Last Reviewed</TableHead>
                                    <TableHead className="py-2 text-xs bg-muted">Action</TableHead>
                                  </>
                                ) : (
                                  <>
                                    <TableHead 
                                      className={`py-2 text-xs bg-muted ${firstColumnWidth ? '' : 'w-[360px]'} cursor-pointer select-none transition-colors hover:bg-muted/80 group ${freezeFirstColumn ? 'sticky left-0 z-20' : ''}`}
                                      onClick={() => handleSort('col1')}
                                      style={firstColumnWidth ? { width: `${firstColumnWidth}px` } : undefined}
                                    >
                                      <div className="flex items-center gap-2">
                                        <span>{firstColumnHeader ?? 'Certification'}</span>
                                        {sortColumn === 'col1' ? (
                                          sortDirection === 'asc' ? (
                                            <ArrowUp className="h-3 w-3 text-primary" />
                                          ) : (
                                            <ArrowDown className="h-3 w-3 text-primary" />
                                          )
                                        ) : (
                                          <ArrowUpDown className="h-3 w-3 opacity-0 group-hover:opacity-50 transition-opacity" />
                                        )}
                                      </div>
                                    </TableHead>
                                    {!hideOwnerColumn ? (
                                  <TableHead 
                                    className="py-2 text-xs bg-muted cursor-pointer select-none transition-colors hover:bg-muted/80 group"
                                    onClick={() => handleSort('col2')}
                                  >
                                    <div className="flex items-center gap-2">
                                      <span>Owner</span>
                                      {sortColumn === 'col2' ? (
                                        sortDirection === 'asc' ? (
                                          <ArrowUp className="h-3 w-3 text-primary" />
                                        ) : (
                                          <ArrowDown className="h-3 w-3 text-primary" />
                                        )
                                      ) : (
                                        <ArrowUpDown className="h-3 w-3 opacity-0 group-hover:opacity-50 transition-opacity" />
                                      )}
                                    </div>
                                  </TableHead>
                                    ) : null}
                                    {showTimeRemainingColumn ? (
                                      <TableHead 
                                        className="py-2 text-xs bg-muted cursor-pointer select-none transition-colors hover:bg-muted/80 group"
                                        onClick={() => handleSort('col5Days')}
                                      >
                                        <div className="flex items-center gap-2">
                                          <span>Time remaining</span>
                                          {sortColumn === 'col5Days' ? (
                                            sortDirection === 'asc' ? (
                                              <ArrowUp className="h-3 w-3 text-primary" />
                                            ) : (
                                              <ArrowDown className="h-3 w-3 text-primary" />
                                            )
                                          ) : (
                                            <ArrowUpDown className="h-3 w-3 opacity-0 group-hover:opacity-50 transition-opacity" />
                                          )}
                                        </div>
                                      </TableHead>
                                    ) : null}
                                    {!hideProgressColumn ? (
                                      <TableHead 
                                        className="py-2 text-xs bg-muted cursor-pointer select-none transition-colors hover:bg-muted/80 group"
                                        onClick={() => handleSort('progress')}
                                      >
                                        <div className="flex items-center gap-2">
                                          <span>Progress</span>
                                          {sortColumn === 'progress' ? (
                                            sortDirection === 'asc' ? (
                                              <ArrowUp className="h-3 w-3 text-primary" />
                                            ) : (
                                              <ArrowDown className="h-3 w-3 text-primary" />
                                            )
                                          ) : (
                                            <ArrowUpDown className="h-3 w-3 opacity-0 group-hover:opacity-50 transition-opacity" />
                                          )}
                                        </div>
                                      </TableHead>
                                    ) : null}
                                    {showRiskScoreColumn ? (
                                      <TableHead className="py-2 text-xs bg-muted">{riskColumnHeader ?? 'App Risk Sensitivity'}</TableHead>
                                    ) : null}
                                    {showStatusColumn ? (
                                      <TableHead className="py-2 text-xs bg-muted">Status</TableHead>
                                    ) : null}
                                    {!hideUsersIncludedColumn ? (
                                      <TableHead className="py-2 text-xs bg-muted">Records</TableHead>
                                    ) : null}
                                    {!hideInsightsColumn && !showSuggestedActionColumn ? (
                                      <TableHead className="py-2 text-xs bg-muted">{insightsColumnHeader ?? 'Bulk action eligible'}</TableHead>
                                    ) : null}
                                    {showReviewerLevelColumn ? (
                                      <TableHead className="py-2 text-xs bg-muted">Your Review Level</TableHead>
                                    ) : null}
                                    {showSuggestedActionColumn ? (
                                      <TableHead className="py-2 text-xs bg-muted">Suggested Action</TableHead>
                                    ) : null}
                                    <TableHead className="py-2 text-xs bg-muted">Action</TableHead>
                                  </>
                                )}
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {frozenPageRows.map((row) => {
                                // Helper function to extract user name from row
                                const getUserName = (row: any): string | undefined => {
                                  if (customSortByUser && sampleUsersForSorting && sampleUsersForSorting.length > 0) {
                                    const rowIndex = parseInt(row.id.replace('row-', '')) - 1;
                                    const user = sampleUsersForSorting[rowIndex % sampleUsersForSorting.length];
                                    if (user) {
                                      return `${user.firstName} ${user.lastName}`;
                                    }
                                  }
                                  if (firstColumnHeader === 'User' && row.col1) {
                                    return row.col1;
                                  }
                                  return undefined;
                                };
                                
                                const userName = getUserName(row);
                                
                                return (
                                <TableRow key={row.id}>
                                  {viewMode === 'reviewer-progress' ? (
                                    <>
                                      <TableCell className="py-2 text-sm">
                                        <span className="truncate max-w-[340px] block" title={(row as any).application}>
                                          {(row as any).application}
                                        </span>
                                      </TableCell>
                                      <TableCell className="py-2 text-sm">
                                        {formatNumber((row as any).records)}
                                      </TableCell>
                                      {/* Progress Indicator Style with Stripe Background */}
                                      <TableCell className="py-2 text-sm">
                                        <div className="flex items-center gap-1.5">
                                          {Array.from({ length: (row as any).totalLevels }, (_, i) => {
                                            const levelNum = i + 1;
                                            const activeLevel = (row as any).activeLevel;
                                            const reviewerLevel = (row as any).reviewerLevel;
                                            
                                            // Hierarchical logic: levels are sequential
                                            // - Completed: levelNum < activeLevel (primary fill)
                                            // - Work in progress: levelNum === activeLevel (solid outline)
                                            // - Pending: levelNum > activeLevel (dashed outline)
                                            
                                            const isCompleted = levelNum < activeLevel;
                                            const isWorkInProgress = levelNum === activeLevel;
                                            const isPending = levelNum > activeLevel;
                                            
                                            // Check if this is the reviewer's review level
                                            const isReviewerLevel = levelNum === reviewerLevel;
                                            
                                            // Determine stripe pattern for reviewer's review level
                                            // Stripe can be applied to green, yellow, or grey badges
                                            const getStripePattern = () => {
                                              if (!isReviewerLevel) return undefined;
                                              
                                              // Stripe pattern for green badge (completed)
                                              if (isCompleted) {
                                                return {
                                                  background: `repeating-linear-gradient(
                                                    45deg,
                                                    rgb(220 252 231),
                                                    rgb(220 252 231) 5px,
                                                    rgb(187 247 208) 5px,
                                                    rgb(187 247 208) 7px
                                                  )`,
                                                };
                                              }
                                              
                                              // Stripe pattern for yellow badge (work in progress)
                                              if (isWorkInProgress) {
                                                return {
                                                  background: `repeating-linear-gradient(
                                                    45deg,
                                                    rgb(254 249 195),
                                                    rgb(254 249 195) 5px,
                                                    rgb(254 240 138) 5px,
                                                    rgb(254 240 138) 7px
                                                  )`,
                                                };
                                              }
                                              
                                              // Stripe pattern for grey badge (pending)
                                              if (isPending) {
                                                return {
                                                  background: `repeating-linear-gradient(
                                                    45deg,
                                                    rgb(249 250 251),
                                                    rgb(249 250 251) 5px,
                                                    rgb(229 231 235) 5px,
                                                    rgb(229 231 235) 7px
                                                  )`,
                                                };
                                              }
                                              
                                              return undefined;
                                            };
                                            
                                            return (
                                              <div
                                                key={levelNum}
                                                className={cn(
                                                  "relative flex items-center justify-center min-w-[28px] h-6 px-1.5 rounded-md text-xs font-medium transition-colors",
                                                  // Completed levels - Subtle green fill (job is done, no outline)
                                                  // If reviewer level, remove background to show stripe pattern
                                                  isCompleted && !isReviewerLevel && "bg-green-100 text-green-800",
                                                  isCompleted && isReviewerLevel && "text-green-800 border border-green-500/70",
                                                  // Work in progress (active level) - Yellow with stripe pattern if reviewer level
                                                  isWorkInProgress && !isReviewerLevel && "bg-yellow-100 border border-yellow-500/70 text-yellow-800",
                                                  isWorkInProgress && isReviewerLevel && "border border-yellow-500/70 text-yellow-800",
                                                  // Pending levels - Subtle gray dashed outline with muted text
                                                  // If reviewer level, remove background to show stripe pattern
                                                  isPending && !isReviewerLevel && "bg-gray-100/50 border border-dashed border-gray-400/60 text-muted-foreground",
                                                  isPending && isReviewerLevel && "border border-dashed border-gray-400/60 text-muted-foreground"
                                                )}
                                                style={getStripePattern()}
                                              >
                                                <span>L{levelNum}</span>
                                              </div>
                                            );
                                          })}
                                        </div>
                                      </TableCell>
                                      <TableCell className="py-2 text-sm">
                                        {(row as any).lastReviewedOn}
                                      </TableCell>
                                      <TableCell className="py-2">
                                        <Button variant="secondary" size="sm" className="h-7 text-xs">
                                          Reminder
                                        </Button>
                                      </TableCell>
                                    </>
                                  ) : (
                                    <>
                                      <TableCell 
                                        className={`py-2 text-sm ${firstColumnWidth ? '' : 'w-[360px]'} ${freezeFirstColumn ? 'sticky left-0 z-10 bg-background' : ''}`}
                                        style={firstColumnWidth ? { width: `${firstColumnWidth}px` } : undefined}
                                      >
                                        {customFirstColumnCell ? (
                                          customFirstColumnCell(row)
                                        ) : (
                                          <span className="truncate max-w-[340px] block" title={firstColumnHeader === 'Application' ? (row as any).appBaseName : (row as any).col1}>
                                            {firstColumnHeader === 'Application' ? (row as any).appBaseName : (row as any).col1}
                                          </span>
                                        )}
                                      </TableCell>
                                      {!hideOwnerColumn ? (
                                        <TableCell className="py-2 text-sm">
                                          <div className="flex items-center gap-2">
                                            <Avatar className="h-6 w-6">
                                              <AvatarFallback className="text-[10px]">
                                                {getInitials((row as any).col2)}
                                              </AvatarFallback>
                                            </Avatar>
                                            <span className="border-b border-dashed border-current pb-[1px]">
                                              {(row as any).col2}
                                            </span>
                                          </div>
                                        </TableCell>
                                      ) : null}
                                      {showTimeRemainingColumn ? (
                                        <TableCell className="py-2 text-sm">
                                          <div className="flex items-center gap-2">
                                            <span>
                                              {(row as any).col5Days < 0
                                                ? `${Math.abs((row as any).col5Days)} days ago`
                                                : `${(row as any).col5Days} days left`}
                                            </span>
                                            <Badge
                                              variant="secondary"
                                              className={`inline-block w-[64px] border-transparent text-xs font-semibold overflow-hidden text-ellipsis whitespace-nowrap [&>*]:truncate ${
                                                (row as any).col9 === 'Overdue'
                                                  ? 'bg-red-100 text-red-700'
                                                  : (row as any).col9 === 'At-risk'
                                                  ? 'bg-orange-100 text-orange-700'
                                                  : 'bg-green-100 text-green-700'
                                              }`}
                                            >
                                              {(row as any).col9 === 'Overdue'
                                                ? 'Overdue'
                                                : (row as any).col9 === 'At-risk'
                                                ? 'At-Risk'
                                                : 'On-Track'}
                                            </Badge>
                                          </div>
                                        </TableCell>
                                      ) : null}
                                      {!hideProgressColumn ? (
                                        <TableCell className="py-2 text-sm">
                                          <div className="flex items-center gap-2 w-[120px]">
                                            <div className="relative h-1.5 flex-1 rounded-full bg-secondary overflow-hidden">
                                              <div
                                                className="h-full transition-all rounded-full"
                                                style={{
                                                  width: `${(row as any).progress}%`,
                                                  backgroundColor: 'hsl(142, 71%, 45%)',
                                                }}
                                              />
                                            </div>
                                            <span className="text-xs whitespace-nowrap">{(row as any).progress}%</span>
                                          </div>
                                        </TableCell>
                                      ) : null}
                                      {showRiskScoreColumn ? (
                                        <TableCell className="py-2 text-sm">
                                          {hideRiskGauge ? (
                                            <span className="text-sm">{(row as any).riskLevel}</span>
                                          ) : (
                                            renderRiskGauge((row as any).riskLevel as 'High' | 'Medium' | 'Low', (row as any).riskScore)
                                          )}
                                        </TableCell>
                                      ) : null}
                                      {showStatusColumn ? (
                                        <TableCell className="py-2 text-sm">
                                          {(() => {
                                            // Use custom status values if provided, otherwise use default col9 values
                                            let status: string;
                                            let statusClass: string;
                                            
                                            if (customStatusValues && customStatusValues.length > 0) {
                                              const rowIndex = parseInt((row as any).id.replace('row-', '')) - 1;
                                              const statusIndex = rowIndex % customStatusValues.length;
                                              status = customStatusValues[statusIndex];
                                              
                                              // Color coding for custom statuses
                                              if (status === 'Pending') {
                                                statusClass = 'bg-yellow-100 text-yellow-700';
                                              } else if (status === 'Certified') {
                                                statusClass = 'bg-green-100 text-green-700';
                                              } else if (status === 'Modified') {
                                                statusClass = 'bg-blue-100 text-blue-700';
                                              } else { // Revoked
                                                statusClass = 'bg-red-100 text-red-700';
                                              }
                                            } else {
                                              // Default status values (Overdue, At-risk, On-track)
                                              status = (row as any).col9 === 'Overdue'
                                                ? 'Overdue'
                                                : (row as any).col9 === 'At-risk'
                                                ? 'At-Risk'
                                                : 'On-Track';
                                              statusClass = (row as any).col9 === 'Overdue'
                                                ? 'bg-red-100 text-red-700'
                                                : (row as any).col9 === 'At-risk'
                                                ? 'bg-orange-100 text-orange-700'
                                                : 'bg-green-100 text-green-700';
                                            }
                                            
                                            return (
                                              <Badge
                                                variant="secondary"
                                                className={`inline-block w-[64px] border-transparent text-xs font-semibold overflow-hidden text-ellipsis whitespace-nowrap [&>*]:truncate ${statusClass}`}
                                              >
                                                {status}
                                              </Badge>
                                            );
                                          })()}
                                        </TableCell>
                                      ) : null}
                                      {!hideAppIncludedColumn ? (
                                        <TableCell className="py-2 text-sm">{(row as any).col6}</TableCell>
                                      ) : null}
                                      {!hideUsersIncludedColumn ? (
                                        <TableCell className="py-2 text-sm">{formatNumber((row as any).col7)}</TableCell>
                                      ) : null}
                                      {!hideInsightsColumn && !showSuggestedActionColumn ? (
                                        <TableCell className="py-2 text-sm">
                                          {showInsightsBadgeOnly ? (
                                            (() => {
                                              const match = (row as any).col8?.match(/(\d+)%/);
                                              const percent = match ? parseInt(match[1]) : 0;
                                              const userCount = parseInt((row as any).col7?.replace(/,/g, '') || '0') || 0;
                                              const records = Math.floor((percent / 100) * userCount);
                                              const rowIndex = parseInt((row as any).id.replace('row-', '')) - 1;
                                              const generatedInsights = generateInsights(rowIndex >= 0 ? rowIndex : 0, records, showInsightPopoverDescriptionColumn, showInsightPopoverDescriptionColumn ? userName : undefined);
                                              return (
                                                <InsightBadge
                                                  count={generatedInsights.length}
                                                  insights={generatedInsights}
                                                  hideRecommendedAction={hideInsightPopoverRecommendedAction}
                                                  userName={userName}
                                                  showDescriptionColumn={showInsightPopoverDescriptionColumn}
                                                  filledSparkleIcon={filledSparkleIcon}
                                                />
                                              );
                                            })()
                                          ) : (
                                            <div className="flex items-center gap-2">
                                              <span className="text-sm">{(row as any).col8}</span>
                                              <Separator orientation="vertical" className="h-4" />
                                              {(() => {
                                                const match = (row as any).col8?.match(/(\d+)%/);
                                                const percent = match ? parseInt(match[1]) : 0;
                                                const userCount = parseInt((row as any).col7?.replace(/,/g, '') || '0') || 0;
                                                const records = Math.floor((percent / 100) * userCount);
                                                const rowIndex = parseInt((row as any).id.replace('row-', '')) - 1;
                                                const generatedInsights = generateInsights(rowIndex >= 0 ? rowIndex : 0, records, showInsightPopoverDescriptionColumn, showInsightPopoverDescriptionColumn ? userName : undefined);
                                                return (
                                                  <InsightBadge
                                                    count={generatedInsights.length}
                                                    insights={generatedInsights}
                                                    hideRecommendedAction={hideInsightPopoverRecommendedAction}
                                                    userName={userName}
                                                    filledSparkleIcon={filledSparkleIcon}
                                                  />
                                                );
                                              })()}
                                            </div>
                                          )}
                                        </TableCell>
                                      ) : null}
                                      {showReviewerLevelColumn ? (
                                        <TableCell className="py-2 text-sm">
                                          <a
                                            href="#"
                                            className="text-xs font-normal text-foreground border-b border-dashed border-foreground hover:opacity-80"
                                          >
                                            L{(row as any).reviewerLevel}
                                          </a>
                                        </TableCell>
                                      ) : null}
                                      {showSuggestedActionColumn ? (
                                        <TableCell className="py-2 text-sm">
                                          <div className="flex items-center gap-2">
                                            {(() => {
                                              // Generate insights for this row to determine suggested action
                                              const match = (row as any).col8?.match(/(\d+)%/);
                                              const percent = match ? parseInt(match[1]) : 0;
                                              const userCount = parseInt((row as any).col7?.replace(/,/g, '') || '0') || 0;
                                              const records = Math.floor((percent / 100) * userCount);
                                              const rowIndex = parseInt((row as any).id.replace('row-', '')) - 1;
                                              
                                              // Generate insights using the same logic
                                              const insights = generateInsights(rowIndex >= 0 ? rowIndex : 0, records, showInsightPopoverDescriptionColumn, showInsightPopoverDescriptionColumn ? userName : undefined);
                                              
                                              // Get risk level from row data
                                              const riskLevel = (row as any).riskLevel || getRiskLevel(rowIndex >= 0 ? rowIndex : 0);
                                              const suggestedAction = getSuggestedAction(insights, riskLevel);
                                              
                                              // Color coding for suggested actions
                                              let bgClass: string;
                                              let borderClass: string;
                                              let textClass: string;
                                              let Icon: React.ComponentType<{ className?: string }>;
                                              if (suggestedAction === 'Certify') {
                                                bgClass = 'bg-green-100';
                                                borderClass = hideSuggestedActionBadgeOutline ? 'border-transparent' : 'border-green-300';
                                                textClass = 'text-green-700';
                                                Icon = CheckCircle;
                                              } else if (suggestedAction === 'Revoke') {
                                                bgClass = 'bg-red-100';
                                                borderClass = hideSuggestedActionBadgeOutline ? 'border-transparent' : 'border-red-300';
                                                textClass = 'text-red-700';
                                                Icon = XCircle;
                                              } else {
                                                bgClass = 'bg-yellow-100';
                                                borderClass = hideSuggestedActionBadgeOutline ? 'border-transparent' : 'border-yellow-300';
                                                textClass = 'text-yellow-700';
                                                Icon = Pencil;
                                              }
                                              
                                              return (
                                                <Badge
                                                  variant="outline"
                                                  className={`inline-flex items-center gap-1.5 ${bgClass} ${borderClass} ${textClass} text-xs font-semibold`}
                                                >
                                                  <Icon className={`h-3 w-3 ${textClass}`} />
                                                  {suggestedAction}
                                                </Badge>
                                              );
                                            })()}
                                            {!hideInsightsColumn && (
                                              <>
                                                <Separator orientation="vertical" className="h-4" />
                                                {showInsightsBadgeOnly ? (
                                                  (() => {
                                                    const match = (row as any).col8?.match(/(\d+)%/);
                                                    const percent = match ? parseInt(match[1]) : 0;
                                                    const userCount = parseInt((row as any).col7?.replace(/,/g, '') || '0') || 0;
                                                    const records = Math.floor((percent / 100) * userCount);
                                                    const rowIndex = parseInt((row as any).id.replace('row-', '')) - 1;
                                                    const generatedInsights = generateInsights(rowIndex >= 0 ? rowIndex : 0, records, showInsightPopoverDescriptionColumn, showInsightPopoverDescriptionColumn ? userName : undefined);
                                                    return (
                                                      <InsightBadge
                                                        count={generatedInsights.length}
                                                        insights={generatedInsights}
                                                        hideRecommendedAction={hideInsightPopoverRecommendedAction}
                                                        userName={userName}
                                                        showDescriptionColumn={showInsightPopoverDescriptionColumn}
                                                        filledSparkleIcon={filledSparkleIcon}
                                                      />
                                                    );
                                                  })()
                                                ) : (
                                                  <>
                                                    <span className="text-sm">{(row as any).col8}</span>
                                                    <Separator orientation="vertical" className="h-4" />
                                                    {(() => {
                                                      const match = (row as any).col8?.match(/(\d+)%/);
                                                      const percent = match ? parseInt(match[1]) : 0;
                                                      const userCount = parseInt((row as any).col7?.replace(/,/g, '') || '0') || 0;
                                                      const records = Math.floor((percent / 100) * userCount);
                                                      const rowIndex = parseInt((row as any).id.replace('row-', '')) - 1;
                                                      const generatedInsights = generateInsights(rowIndex >= 0 ? rowIndex : 0, records, showInsightPopoverDescriptionColumn, showInsightPopoverDescriptionColumn ? userName : undefined);
                                                      return (
                                                        <InsightBadge
                                                          count={generatedInsights.length}
                                                          insights={generatedInsights}
                                                          hideRecommendedAction={hideInsightPopoverRecommendedAction}
                                                          userName={userName}
                                                          showDescriptionColumn={showInsightPopoverDescriptionColumn}
                                                          filledSparkleIcon={filledSparkleIcon}
                                                        />
                                                      );
                                                    })()}
                                                  </>
                                                )}
                                              </>
                                            )}
                                          </div>
                                        </TableCell>
                                      ) : null}
                                      <TableCell className="py-2">
                                        {customActionColumn ? (
                                          customActionColumn(row)
                                        ) : (
                                          <Button size="sm" className="h-7 text-xs">
                                            {(row as any).actionLabel}
                                          </Button>
                                        )}
                                      </TableCell>
                                    </>
                                  )}
                                </TableRow>
                                );
                              })}
                            </TableBody>
                            </Table>
                          </div>
                          <div className="flex items-center justify-between border-t bg-background px-4 py-2 text-sm text-muted-foreground">
                                <span>
                                  {frozenPageStart + 1}-{frozenPageEnd} of {currentDataRows.length}
                                </span>
                            <div className="flex items-center gap-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setFrozenPageIndex((prev) => Math.max(0, prev - 1))}
                                disabled={frozenPageIndex === 0}
                                className="h-9 w-9 p-0"
                              >
                                <ChevronLeft className="h-4 w-4" />
                                <span className="sr-only">Previous</span>
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() =>
                                  setFrozenPageIndex((prev) => Math.min(frozenPageCount - 1, prev + 1))
                                }
                                disabled={frozenPageIndex >= frozenPageCount - 1}
                                className="h-9 w-9 p-0"
                              >
                                <ChevronRight className="h-4 w-4" />
                                <span className="sr-only">Next</span>
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>

                    {/* DataTable */}
                    {showTable ? (
                      <div className="flex-1 overflow-auto px-4 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-muted [&::-webkit-scrollbar-thumb]:bg-muted-foreground/20 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-muted-foreground/30">
                        <Table className="min-w-full">
                          <TableHeader>
                            {table.getHeaderGroups().map((headerGroup) => (
                              <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                  <TableHead key={header.id}>
                                    {header.isPlaceholder
                                      ? null
                                      : flexRender(header.column.columnDef.header, header.getContext())}
                                  </TableHead>
                                ))}
                              </TableRow>
                            ))}
                          </TableHeader>
                          <TableBody>
                            {table.getRowModel().rows?.length ? (
                              table.getRowModel().rows.map((row) => (
                                <TableRow key={row.id}>
                                  {row.getVisibleCells().map((cell) => (
                                    <TableCell key={cell.id}>
                                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </TableCell>
                                  ))}
                                </TableRow>
                              ))
                            ) : (
                              <TableRow>
                                <TableCell colSpan={finalColumns.length} className="h-24 text-center">
                                  No results.
                                </TableCell>
                              </TableRow>
                            )}
                          </TableBody>
                        </Table>
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          </main>
        </Sidebar>
      </SidebarProvider>
    </div>
  );
}

