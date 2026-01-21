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
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import * as React from 'react';
import { ChevronLeft, Search, ChevronRight, AlignLeft, AlignCenter, AlignRight, SlidersHorizontal } from 'lucide-react';
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

const appNames = ['Jira', 'Figma', 'GitHub', 'Slack', 'Notion'];
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
const getDueInDays = (index: number) => ((index * 17) % 90) + 1;
const getInsightsPercent = (index: number) => (index * 9) % 101;
const getRiskLevel = (index: number) => {
  const roll = index % 3;
  if (roll === 0) return 'High';
  if (roll === 1) return 'Medium';
  return 'Low';
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
const frozenTableRows = Array.from({ length: 50 }, (_, index) => {
  const baseName = appNames[index % appNames.length];
  return {
    id: `row-${index + 1}`,
    col1: `UAR Access Review ${index + 1}`,
    appBaseName: baseName,
    col2: ownerNames[index % ownerNames.length],
    col3: `${formatCreatedOn(index)}  \u2192  ${formatCreatedOn(index + 9)}`,
    col5Days: getDueInDays(index),
    col5Date: formatCreatedOn(index + 9),
    col6: `${getAppIncludedCount(index)}`,
    col7: `${getUsersIncludedCount(index)}`,
    col8: `${getInsightsPercent(index)}% of users`,
    riskLevel: getRiskLevel(index),
    riskScore: getRiskScore(index),
    col9: index % 3 === 0 ? 'At risk' : 'On-track',
    actionLabel: index % 2 === 0 ? 'View' : 'Continue Review',
  };
})
  .sort((a, b) => a.col5Days - b.col5Days);

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
    { label: 'Pending', value: 128, radioLabel: 'Pending' },
    { label: 'Completed', value: 512, radioLabel: 'Completed' },
    { label: 'Overdue', value: 13, radioLabel: 'Overdue' },
    { label: 'Due in', radioLabel: 'Due in', type: 'dropdown' as const },
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
    { value: 'groups', label: 'Groups', count: tabCounts[1] ?? 0, widthClass: 'w-[130px]' },
    { value: 'users', label: 'Users', count: tabCounts[2] ?? 0, widthClass: 'w-[120px]' },
  ];
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
  const frozenPageCount = Math.ceil(frozenTableRows.length / frozenPageSize);
  const frozenPageStart = frozenPageIndex * frozenPageSize;
  const frozenPageEnd = Math.min(frozenPageStart + frozenPageSize, frozenTableRows.length);
  const frozenPageRows = frozenTableRows.slice(frozenPageStart, frozenPageEnd);
  const headerDescriptionBlock = showHeaderDescription ? (
    <div className="flex items-center gap-2 text-sm text-foreground max-w-[520px]">
      <p className="line-clamp-3">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor. Ut enim ad minim.
        Et
      </p>
      <button className="shrink-0 text-sm text-foreground underline underline-offset-2">Read more</button>
    </div>
  ) : null;
  const headerKeyValueBlock = (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <span className="text-[10px] font-medium tracking-[0.12em] text-muted-foreground">Status</span>
        <Badge variant="secondary" className="w-fit border-transparent text-xs font-semibold">
          On-track
        </Badge>
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-[10px] font-medium tracking-[0.12em] text-muted-foreground">Days remaining</span>
        <Badge variant="secondary" className="border-transparent text-xs font-semibold">
          9 days remaining
        </Badge>
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

  const table = useReactTable({
    data: tableData,
    columns,
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
                          <Tabs defaultValue="overview" className="w-full">
                            <TabsList className="grid w-full grid-cols-2">
                              <TabsTrigger value="overview" className="justify-center">
                                Info
                              </TabsTrigger>
                              <TabsTrigger value="details" className="justify-center">
                                Advance filters
                              </TabsTrigger>
                            </TabsList>
                            <TabsContent value="overview" className="mt-4 flex flex-col gap-6">
                              {moveHeaderDetailsToSidebar ? (
                                <div className="flex flex-col gap-2">
                                  <span className="text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
                                    Application Description
                                  </span>
                                  {headerDescriptionBlock}
                                </div>
                              ) : null}
                              {moveHeaderDetailsToSidebar ? headerKeyValueBlock : null}
                            </TabsContent>
                            <TabsContent value="details" className="mt-4 text-sm text-muted-foreground">
                              No additional details yet.
                            </TabsContent>
                          </Tabs>
                        ) : (
                          <>
                            {moveHeaderDetailsToSidebar ? (
                              <div className="flex flex-col gap-2">
                                <span className="text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
                                  Application Description
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
                                        placeholder="Search users"
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
                                        placeholder="Search users"
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

                    {showRadioCard ? (
                      <div className="flex flex-1 min-h-0 flex-col px-4 py-4">
                        <Tabs defaultValue="applications">
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
                                  className="flex cursor-pointer items-stretch rounded-lg border bg-background p-5 transition-colors hover:bg-muted/40 peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-muted/60"
                                >
                                  <div className="flex flex-1 items-start justify-between gap-6">
                                  <div className="grid gap-2">
                                    {item.type === 'dropdown' ? (
                                      <Select value={dueRange} onValueChange={setDueRange}>
                                        <SelectTrigger className="h-auto w-auto justify-start gap-1 border-0 bg-transparent px-0 text-xs font-medium uppercase tracking-wide text-muted-foreground shadow-none focus:ring-0">
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
                                  className="flex cursor-pointer items-stretch rounded-lg border bg-background p-5 transition-colors hover:bg-muted/40 peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-muted/60"
                                >
                                  <div className="flex flex-1 items-start justify-between gap-6">
                                  <div className="grid gap-2">
                                    {item.type === 'dropdown' ? (
                                      <Select value={dueRange} onValueChange={setDueRange}>
                                        <SelectTrigger className="h-auto w-auto justify-start gap-1 border-0 bg-transparent px-0 text-xs font-medium uppercase tracking-wide text-muted-foreground shadow-none focus:ring-0">
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
                                  className="flex cursor-pointer items-stretch rounded-lg border bg-background p-5 transition-colors hover:bg-muted/40 peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-muted/60"
                                >
                                  <div className="flex flex-1 items-start justify-between gap-6">
                                  <div className="grid gap-2">
                                    {item.type === 'dropdown' ? (
                                      <Select value={dueRange} onValueChange={setDueRange}>
                                        <SelectTrigger className="h-auto w-auto justify-start gap-1 border-0 bg-transparent px-0 text-xs font-medium uppercase tracking-wide text-muted-foreground shadow-none focus:ring-0">
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
                        {showRadioTabs ? (
                          <TabsList className="mt-6 w-full justify-start rounded-none border-b bg-transparent p-0">
                            {tabItems.map((tab) => (
                              <TabsTrigger
                                key={tab.value}
                                value={tab.value}
                                className={`rounded-none border-b-2 border-transparent px-4 py-2 -mb-px data-[state=active]:border-foreground data-[state=active]:shadow-none ${tab.widthClass}`}
                              >
                                <span>{tab.label}</span>
                                <Badge variant="secondary" className="ml-2 min-w-[28px] justify-center">
                                  {tab.count}
                                </Badge>
                              </TabsTrigger>
                            ))}
                          </TabsList>
                        ) : null}
                        </Tabs>
                        <div className="mt-6 flex min-h-0 flex-1 flex-col overflow-hidden rounded-lg border">
                          <div className="flex flex-wrap items-center justify-between gap-3 border-b bg-background px-4 py-3">
                            <div className="flex flex-wrap items-center gap-2">
                              <div className="relative">
                                <label
                                  className="absolute -top-2 left-2 bg-background px-1 text-[10px] text-muted-foreground"
                                  htmlFor="sort-by-select"
                                >
                                  Sort by
                                </label>
                                <Select defaultValue="due-asc">
                                  <SelectTrigger id="sort-by-select" className="h-9 w-[160px]">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="due-asc">Due: Soonest</SelectItem>
                                    <SelectItem value="due-desc">Due: Latest</SelectItem>
                                    <SelectItem value="cert-asc">Application: A-Z</SelectItem>
                                    <SelectItem value="cert-desc">Application: Z-A</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div className="relative">
                                <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                <Input
                                  placeholder="Search apps"
                                  className="h-9 w-[220px] pl-8"
                                />
                              </div>
                              <Button variant="outline" size="sm">
                                <SlidersHorizontal className="mr-2 h-4 w-4" />
                                Filters
                              </Button>
                            </div>
                            <div className="flex flex-wrap items-center gap-2">
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <span>
                                  {frozenPageStart + 1}-{frozenPageEnd} of {frozenTableRows.length}
                                </span>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => setFrozenPageIndex((prev) => Math.max(0, prev - 1))}
                                  disabled={frozenPageIndex === 0}
                                >
                                  Previous
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() =>
                                    setFrozenPageIndex((prev) => Math.min(frozenPageCount - 1, prev + 1))
                                  }
                                  disabled={frozenPageIndex >= frozenPageCount - 1}
                                >
                                  Next
                                </Button>
                              </div>
                            </div>
                          </div>
                        <div className="flex-1 overflow-auto">
                            <Table className="min-w-[900px]">
                            <TableHeader className="sticky top-0 z-20 bg-background">
                              <TableRow>
                                <TableHead className="py-2 text-xs">Application</TableHead>
                                <TableHead className="py-2 text-xs">Owner</TableHead>
                                {showRiskScoreColumn ? (
                                  <TableHead className="py-2 text-xs">Entity Risk Sensitivity</TableHead>
                                ) : null}
                                {!hideAppIncludedColumn ? (
                                  <TableHead className="py-2 text-xs">App included</TableHead>
                                ) : null}
                                {!hideUsersIncludedColumn ? (
                                  <TableHead className="py-2 text-xs">Users included</TableHead>
                                ) : null}
                                {!hideInsightsColumn ? (
                                  <TableHead className="py-2 text-xs">Insights available for</TableHead>
                                ) : null}
                                <TableHead className="py-2 text-xs">Action</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {frozenPageRows.map((row) => (
                                <TableRow key={row.id}>
                                  <TableCell className="py-2 text-sm">
                                    <div className="flex items-center gap-2">
                                      {(() => {
                                        const AppIcon = appIcons[row.appBaseName];
                                        return AppIcon ? <AppIcon className="h-4 w-4 text-muted-foreground" /> : null;
                                      })()}
                                      <span>{row.appBaseName}</span>
                                    </div>
                                  </TableCell>
                                  <TableCell className="py-2 text-sm">
                                    <div className="flex items-center gap-2">
                                      <Avatar className="h-6 w-6">
                                        <AvatarFallback className="text-[10px]">
                                          {getInitials(row.col2)}
                                        </AvatarFallback>
                                      </Avatar>
                                      <span className="border-b border-dashed border-current pb-[1px]">
                                        {row.col2}
                                      </span>
                                    </div>
                                  </TableCell>
                                  {showRiskScoreColumn ? (
                                    <TableCell className="py-2 text-sm">
                                      {renderRiskGauge(row.riskLevel, row.riskScore)}
                                    </TableCell>
                                  ) : null}
                                  {!hideAppIncludedColumn ? (
                                    <TableCell className="py-2 text-sm">{row.col6}</TableCell>
                                  ) : null}
                                  {!hideUsersIncludedColumn ? (
                                    <TableCell className="py-2 text-sm">{row.col7}</TableCell>
                                  ) : null}
                                  {!hideInsightsColumn ? (
                                    <TableCell className="py-2 text-sm">{row.col8}</TableCell>
                                  ) : null}
                                  <TableCell className="py-2">
                                    <Button size="sm" className="h-7 w-[140px] text-xs">
                                      {row.actionLabel}
                                    </Button>
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                            </Table>
                          </div>
                          <div className="flex items-center justify-between border-t bg-background px-4 py-2 text-sm text-muted-foreground">
                            <span>
                              {frozenPageStart + 1}-{frozenPageEnd} of {frozenTableRows.length}
                            </span>
                            <div className="flex items-center gap-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setFrozenPageIndex((prev) => Math.max(0, prev - 1))}
                                disabled={frozenPageIndex === 0}
                              >
                                Previous
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() =>
                                  setFrozenPageIndex((prev) => Math.min(frozenPageCount - 1, prev + 1))
                                }
                                disabled={frozenPageIndex >= frozenPageCount - 1}
                              >
                                Next
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : null}

                    {/* DataTable */}
                    {showTable ? (
                      <div className="flex-1 overflow-auto px-4">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>User</TableHead>
                              <TableHead>Email ID</TableHead>
                              <TableHead>Status</TableHead>
                            </TableRow>
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
                                <TableCell colSpan={columns.length} className="h-24 text-center">
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

