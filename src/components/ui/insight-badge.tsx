import * as React from 'react';
import { Badge } from './badge';
import { Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from './popover';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './tooltip';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './table';

/**
 * Insight data structure
 */
export interface Insight {
  name: string;
  description: string; // Tooltip content explaining what the insight does
  userCount: number; // Number of users this insight applies to
  recommendedAction: 'Certify' | 'Modify' | 'Revoke';
  userSpecificDescription?: string; // User-specific description in context of the user
}

/**
 * All available insights with their descriptions and recommended actions
 */
export const ALL_INSIGHTS: Omit<Insight, 'userCount'>[] = [
  {
    name: 'All Dormant Accounts',
    description: 'Accounts whose last detected usage of the app was more than 30 days ago',
    recommendedAction: 'Revoke',
  },
  {
    name: 'Orphaned Accounts',
    description: 'Users who are inactive in the directory but have an active account on the application',
    recommendedAction: 'Revoke',
  },
  {
    name: 'External Accounts',
    description: 'Users who are classified as external in the directory and have an active account on the application',
    recommendedAction: 'Certify',
  },
  {
    name: 'Inactive Licensed Accounts',
    description: 'Users who are inactive on the application but have a license assigned to them',
    recommendedAction: 'Revoke',
  },
  {
    name: 'Privileged Accounts',
    description: 'Users who have an application role that\'s classified as privileged',
    recommendedAction: 'Modify',
  },
  {
    name: 'Orphaned External Accounts',
    description: 'Users who are inactive in the directory and are classified as external but have an active account on the application',
    recommendedAction: 'Revoke',
  },
  {
    name: 'Orphaned Privileged Accounts',
    description: 'Users who are inactive in the directory and have an application role that\'s classified as privileged but have an active account on the application',
    recommendedAction: 'Revoke',
  },
  {
    name: 'Dormant Privileged Accounts',
    description: 'Users who have an application role that\'s classified as privileged but whose last detected usage of the app was more than 30 days ago',
    recommendedAction: 'Revoke',
  },
  {
    name: 'Dormant External Accounts',
    description: 'Users who are classified as external in the directory but whose last detected usage of the app was more than 30 days ago',
    recommendedAction: 'Revoke',
  },
  {
    name: 'Accounts Dormant for 60 days',
    description: 'Accounts whose last detected usage of the app was more than 60 days ago',
    recommendedAction: 'Revoke',
  },
  {
    name: 'Accounts Dormant for 90 days',
    description: 'Accounts whose last detected usage of the app was more than 90 days ago',
    recommendedAction: 'Revoke',
  },
  {
    name: 'Privileged Accounts Dormant for 60 days',
    description: 'Users who have an application role that\'s classified as privileged but whose last detected usage of the app was more than 60 days ago',
    recommendedAction: 'Revoke',
  },
  {
    name: 'Privileged Accounts Dormant for 90 days',
    description: 'Users who have an application role that\'s classified as privileged but whose last detected usage of the app was more than 90 days ago',
    recommendedAction: 'Revoke',
  },
  {
    name: 'External Accounts Dormant for 60 days',
    description: 'Users who are classified as external in the directory but whose last detected usage of the app was more than 60 days ago',
    recommendedAction: 'Revoke',
  },
  {
    name: 'External Accounts Dormant for 90 days',
    description: 'Users who are classified as external in the directory but whose last detected usage of the app was more than 90 days ago',
    recommendedAction: 'Revoke',
  },
];

/**
 * InsightBadge Component
 * 
 * An indicator badge that displays the number of insights for users eligible for bulk actions.
 * Shows a sparkle icon followed by a count of insights.
 * Clicking the badge opens a popover with detailed insight information in a table format.
 * 
 * @param count - The number of insights to display
 * @param insights - Array of insight data to display in the popover table (2-15 insights)
 * @param className - Additional CSS classes
 */
export interface InsightBadgeProps
  extends React.HTMLAttributes<HTMLDivElement> {
  count: number;
  insights?: Insight[];
  hideRecommendedAction?: boolean;
  userName?: string;
  showDescriptionColumn?: boolean;
  filledSparkleIcon?: boolean;
}

export function InsightBadge({ count, insights = [], className, hideRecommendedAction = false, userName, showDescriptionColumn = false, filledSparkleIcon = false, ...props }: InsightBadgeProps) {
  // Use actual insights count if available, otherwise use the provided count
  const displayCount = insights && insights.length > 0 ? insights.length : count;
  
  const badgeContent = (
    <Badge
      variant="secondary"
      className={cn(
        'w-[64px] border-transparent text-xs font-semibold justify-center gap-1.5 cursor-pointer bg-purple-100 text-purple-700 hover:bg-purple-200',
        className
      )}
      {...props}
    >
      <Sparkles className={cn("h-3.5 w-3.5", filledSparkleIcon && "fill-current")} />
      {displayCount}
    </Badge>
  );

  const tooltipContent = userName 
    ? `${displayCount} insights available on ${userName}`
    : `${displayCount} insights available on the user mentioned in the row`;

  // If no insights provided, just show the badge with tooltip
  if (!insights || insights.length === 0) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            {badgeContent}
          </TooltipTrigger>
          <TooltipContent className="bg-white text-gray-900 border-gray-200">
            {tooltipContent}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <Popover>
          <PopoverTrigger asChild>
            <TooltipTrigger asChild>
              <button
                type="button"
                className="inline-flex border-0 bg-transparent p-0 cursor-pointer"
              >
                {badgeContent}
              </button>
            </TooltipTrigger>
          </PopoverTrigger>
          <PopoverContent className="w-[600px] p-0" align="start">
        <div className="max-h-[400px] overflow-y-auto">
          <Table>
            <TableHeader className="sticky top-0 bg-background z-10">
              <TableRow>
                <TableHead className="px-4 py-3">Insight</TableHead>
                <TableHead className="px-4 py-3">{showDescriptionColumn ? 'Description' : 'Users'}</TableHead>
                {!hideRecommendedAction && (
                  <TableHead className="px-4 py-3">Recommended Action</TableHead>
                )}
              </TableRow>
            </TableHeader>
            <TableBody>
              {insights.map((insight, index) => (
                <TableRow key={index}>
                  <TableCell className="px-4 py-3">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <span className="text-sm cursor-help border-b border-dashed border-current">{insight.name}</span>
                        </TooltipTrigger>
                        <TooltipContent className="max-w-xs">
                          <p>{insight.description}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </TableCell>
                  <TableCell className="px-4 py-3">
                    {showDescriptionColumn ? (
                      <span className="text-sm text-left leading-relaxed block max-w-md">{insight.userSpecificDescription || insight.description}</span>
                    ) : (
                      <span className="text-sm">{insight.userCount}</span>
                    )}
                  </TableCell>
                  {!hideRecommendedAction && (
                    <TableCell className="px-4 py-3">
                      <Badge
                        variant="secondary"
                        className={cn(
                          'text-xs border-transparent',
                          insight.recommendedAction === 'Certify' 
                            ? 'bg-green-100 text-green-700 hover:bg-green-200' 
                            : insight.recommendedAction === 'Revoke'
                            ? 'bg-red-100 text-red-700 hover:bg-red-200'
                            : 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                        )}
                      >
                        {insight.recommendedAction}
                      </Badge>
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </PopoverContent>
        </Popover>
        <TooltipContent className="bg-white text-gray-900 border-gray-200">
          {tooltipContent}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
