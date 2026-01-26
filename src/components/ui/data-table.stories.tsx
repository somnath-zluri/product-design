import type { Meta, StoryObj } from '@storybook/react';
import { DataTable } from './data-table';
import { ColumnDef } from '@tanstack/react-table';
import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './table';
import { Button } from './button';
import { Checkbox } from './checkbox';
import { Badge } from './badge';
import { InsightBadge, ALL_INSIGHTS } from './insight-badge';
import { SiJira, SiFigma, SiGithub, SiSlack, SiNotion } from 'react-icons/si';
import { Pencil, ChevronDown, ChevronRight } from 'lucide-react';

const meta = {
  title: 'ShadCN Components/DataTable',
  component: DataTable,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof DataTable>;

export default meta;
type Story = StoryObj<typeof meta>;

type Payment = {
  id: string;
  amount: number;
  status: 'pending' | 'processing' | 'success' | 'failed';
  email: string;
};

const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: 'status',
    header: 'Status',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'amount',
    header: 'Amount',
  },
];

const data: Payment[] = [
  {
    id: '1',
    amount: 100,
    status: 'pending',
    email: 'm@example.com',
  },
  {
    id: '2',
    amount: 200,
    status: 'processing',
    email: 'a@example.com',
  },
  {
    id: '3',
    amount: 300,
    status: 'success',
    email: 'b@example.com',
  },
];

export const Default: Story = {
  args: {} as any,
  render: () => <DataTable columns={columns} data={data} />,
};


type Membership = {
  id: string;
  appName: string;
  appIcon: React.ComponentType<{ className?: string }>;
  riskLevel: 'High' | 'Medium' | 'Low';
  records: number;
  actionLabel: string;
};

type Group = {
  id: string;
  name: string;
  count: number;
  memberships: Membership[];
};

const appIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  Jira: SiJira,
  Figma: SiFigma,
  Github: SiGithub,
  Slack: SiSlack,
  Notion: SiNotion,
};

const groupsData: Group[] = [
  {
    id: 'domain-users',
    name: 'Domain Users',
    count: 3,
    memberships: [
      {
        id: '1',
        appName: 'Jira',
        appIcon: SiJira,
        riskLevel: 'High',
        records: 125,
        actionLabel: 'Sign-off',
      },
      {
        id: '2',
        appName: 'Figma',
        appIcon: SiFigma,
        riskLevel: 'Medium',
        records: 89,
        actionLabel: 'Review',
      },
      {
        id: '3',
        appName: 'Github',
        appIcon: SiGithub,
        riskLevel: 'Low',
        records: 234,
        actionLabel: 'Review',
      },
    ],
  },
  {
    id: 'us-employees',
    name: 'US Employees',
    count: 2,
    memberships: [
      {
        id: '4',
        appName: 'Slack',
        appIcon: SiSlack,
        riskLevel: 'High',
        records: 456,
        actionLabel: 'Review',
      },
      {
        id: '5',
        appName: 'Notion',
        appIcon: SiNotion,
        riskLevel: 'Medium',
        records: 123,
        actionLabel: 'Review',
      },
    ],
  },
  {
    id: 'engineering',
    name: 'Engineering',
    count: 3,
    memberships: [
      {
        id: '6',
        appName: 'Github',
        appIcon: SiGithub,
        riskLevel: 'High',
        records: 789,
        actionLabel: 'Review',
      },
      {
        id: '7',
        appName: 'Jira',
        appIcon: SiJira,
        riskLevel: 'Medium',
        records: 345,
        actionLabel: 'Review',
      },
      {
        id: '8',
        appName: 'Slack',
        appIcon: SiSlack,
        riskLevel: 'Low',
        records: 567,
        actionLabel: 'Review',
      },
    ],
  },
  {
    id: 'exchange-users',
    name: 'Exchange Users',
    count: 2,
    memberships: [
      {
        id: '9',
        appName: 'Notion',
        appIcon: SiNotion,
        riskLevel: 'High',
        records: 234,
        actionLabel: 'Review',
      },
      {
        id: '10',
        appName: 'Figma',
        appIcon: SiFigma,
        riskLevel: 'Medium',
        records: 156,
        actionLabel: 'Review',
      },
    ],
  },
  {
    id: 'designers',
    name: 'Designers',
    count: 2,
    memberships: [
      {
        id: '11',
        appName: 'Figma',
        appIcon: SiFigma,
        riskLevel: 'High',
        records: 678,
        actionLabel: 'Review',
      },
      {
        id: '12',
        appName: 'Notion',
        appIcon: SiNotion,
        riskLevel: 'Low',
        records: 234,
        actionLabel: 'Review',
      },
    ],
  },
];

function GroupedDataTable() {
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set());
  const [selectedMemberships, setSelectedMemberships] = useState<Set<string>>(
    new Set()
  );

  const toggleGroup = (groupId: string) => {
    const newExpanded = new Set(expandedGroups);
    if (newExpanded.has(groupId)) {
      newExpanded.delete(groupId);
    } else {
      newExpanded.add(groupId);
    }
    setExpandedGroups(newExpanded);
  };

  const toggleMembership = (membershipId: string) => {
    const newSelected = new Set(selectedMemberships);
    if (newSelected.has(membershipId)) {
      newSelected.delete(membershipId);
    } else {
      newSelected.add(membershipId);
    }
    setSelectedMemberships(newSelected);
  };

  const selectAllInGroup = (group: Group) => {
    const newSelected = new Set(selectedMemberships);
    const allSelected = group.memberships.every((m) =>
      newSelected.has(m.id)
    );
    if (allSelected) {
      group.memberships.forEach((m) => newSelected.delete(m.id));
    } else {
      group.memberships.forEach((m) => newSelected.add(m.id));
    }
    setSelectedMemberships(newSelected);
  };

  const getRiskBadgeVariant = (risk: string) => {
    switch (risk) {
      case 'High':
        return 'destructive';
      case 'Medium':
        return 'default';
      case 'Low':
        return 'secondary';
      default:
        return 'default';
    }
  };

  return (
    <div className="w-full max-w-6xl space-y-2">
      {groupsData.map((group) => {
        const isExpanded = expandedGroups.has(group.id);
        const AppIcon = appIcons[group.memberships[0]?.appName] || SiJira;
        const appName = group.memberships[0]?.appName || 'App';

        return (
          <div key={group.id} className="rounded-md border bg-background">
            <div className="bg-muted/50 border-b">
              <div className="flex items-center justify-between px-4 py-3">
                <div 
                  className="flex items-center gap-3 cursor-pointer"
                  onClick={() => toggleGroup(group.id)}
                >
                  {isExpanded ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                  <AppIcon className="h-5 w-5" />
                  <span className="text-sm font-medium">
                    {appName} - {group.name} ({group.count})
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => selectAllInGroup(group)}
                  >
                    Approve all
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => selectAllInGroup(group)}
                  >
                    Reject all
                  </Button>
                  <Button variant="outline" size="sm">
                    <Pencil className="h-4 w-4 mr-2" />
                    Modify
                  </Button>
                </div>
              </div>
            </div>
            {isExpanded && (
              <div className="overflow-x-auto">
                <div className="relative w-full">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[50px] px-4 py-2">
                          <Checkbox
                            checked={group.memberships.every((m) =>
                              selectedMemberships.has(m.id)
                            )}
                            onCheckedChange={() => selectAllInGroup(group)}
                          />
                        </TableHead>
                        <TableHead className="px-4 py-2">App</TableHead>
                        <TableHead className="px-4 py-2">
                          App Risk Sensitivity
                        </TableHead>
                        <TableHead className="px-4 py-2">Records</TableHead>
                        <TableHead className="px-4 py-2">Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {group.memberships.map((membership) => {
                        const MembershipIcon = membership.appIcon;
                        return (
                          <TableRow key={membership.id}>
                            <TableCell className="px-4 py-2">
                              <Checkbox
                                checked={selectedMemberships.has(membership.id)}
                                onCheckedChange={() =>
                                  toggleMembership(membership.id)
                                }
                              />
                            </TableCell>
                            <TableCell className="px-4 py-2">
                              <div className="flex items-center gap-2">
                                <MembershipIcon className="h-4 w-4" />
                                <span>{membership.appName}</span>
                              </div>
                            </TableCell>
                            <TableCell className="px-4 py-2">
                              <Badge
                                variant={getRiskBadgeVariant(
                                  membership.riskLevel
                                )}
                              >
                                {membership.riskLevel}
                              </Badge>
                            </TableCell>
                            <TableCell className="px-4 py-2">
                              {(() => {
                                // Generate 3-15 insights (minimum 3, maximum 15)
                                const membershipIndex = parseInt(membership.id) || 0;
                                const numInsights = Math.min(3 + (membershipIndex % 13), 15);
                                const generatedInsights = Array.from({ length: numInsights }, (_, i) => {
                                  const insightIndex = (membershipIndex + i) % ALL_INSIGHTS.length;
                                  const insight = ALL_INSIGHTS[insightIndex];
                                  return {
                                    name: insight.name,
                                    description: insight.description,
                                    userCount: Math.floor(membership.records / numInsights) + (i === 0 ? membership.records % numInsights : 0),
                                    recommendedAction: insight.recommendedAction,
                                  };
                                });
                                
                                return (
                                  <InsightBadge
                                    count={generatedInsights.length}
                                    insights={generatedInsights}
                                  />
                                );
                              })()}
                            </TableCell>
                            <TableCell className="px-4 py-2">
                              <Button variant="outline" size="sm" className="w-fit">
                                {membership.actionLabel}
                              </Button>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export const GroupedRows: Story = {
  render: () => <GroupedDataTable />,
};
