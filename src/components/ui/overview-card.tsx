import * as React from 'react';
import { PieChart, Pie, Cell } from 'recharts';
import { ChartContainer, type ChartConfig } from '@/components/ui/chart';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

const CERTIFIED_COLOR = 'hsl(142, 76%, 36%)';   // green
const REVOKED_COLOR = 'hsl(0, 84%, 60%)';      // red
const MODIFIED_COLOR = 'hsl(38, 92%, 50%)';    // orange
const NOT_REVIEWED_COLOR = 'hsl(215, 16%, 47%)'; // grey

function getInitialsFromName(fullName: string): string {
  if (!fullName) return '';
  const parts = fullName.trim().split(/\s+/);
  if (parts.length >= 2) {
    return `${parts[0][0]?.toUpperCase() || ''}${parts[parts.length - 1][0]?.toUpperCase() || ''}`;
  }
  return parts[0]?.slice(0, 2).toUpperCase() || '';
}

export interface OverviewCardProps {
  /** Total number of users/records */
  totalCount: number;
  /** Count of certified/signed-off */
  certifiedCount: number;
  /** Count of revoked */
  revokedCount: number;
  /** Count of modified */
  modifiedCount: number;
  /** Reviewer names for avatar stack (e.g. first 3–5) */
  reviewerNames: string[];
  /** Optional image URLs for reviewers (same order as reviewerNames). When set, avatars show images with initials fallback. */
  reviewerImageUrls?: (string | undefined)[];
  /** Days remaining for the review */
  daysLeft: number;
  className?: string;
}

const chartConfig: ChartConfig = {
  certified: { label: 'Certified', color: CERTIFIED_COLOR },
  revoked: { label: 'Revoked', color: REVOKED_COLOR },
  modified: { label: 'Modified', color: MODIFIED_COLOR },
  notReviewed: { label: 'Not Reviewed', color: NOT_REVIEWED_COLOR },
};

export function OverviewCard({
  totalCount,
  certifiedCount,
  revokedCount,
  modifiedCount,
  reviewerNames,
  reviewerImageUrls,
  daysLeft,
  className,
}: OverviewCardProps) {
  const notReviewedCount = Math.max(0, totalCount - certifiedCount - revokedCount - modifiedCount);

  const pieData = [
    { name: 'certified', value: certifiedCount, fill: CERTIFIED_COLOR },
    { name: 'revoked', value: revokedCount, fill: REVOKED_COLOR },
    { name: 'modified', value: modifiedCount, fill: MODIFIED_COLOR },
    { name: 'notReviewed', value: notReviewedCount, fill: NOT_REVIEWED_COLOR },
  ].filter((d) => d.value > 0);

  const items: { label: string; count: number; pct: number; color: string }[] = [
    { label: 'Certified', count: certifiedCount, pct: totalCount ? (certifiedCount / totalCount) * 100 : 0, color: CERTIFIED_COLOR },
    { label: 'Revoked', count: revokedCount, pct: totalCount ? (revokedCount / totalCount) * 100 : 0, color: REVOKED_COLOR },
    { label: 'Modified', count: modifiedCount, pct: totalCount ? (modifiedCount / totalCount) * 100 : 0, color: MODIFIED_COLOR },
    { label: 'Not Reviewed', count: notReviewedCount, pct: totalCount ? (notReviewedCount / totalCount) * 100 : 0, color: NOT_REVIEWED_COLOR },
  ];

  return (
    <div
      className={cn(
        'rounded-lg border border-border bg-background p-4 flex flex-row gap-4 items-stretch',
        className
      )}
    >
      {/* Zone 1: Users – donut + total + legend */}
      <div className="flex flex-1 min-w-0 items-center gap-4 border-r border-border pr-4">
        <div className="relative shrink-0 h-[108px] w-[108px]">
          <ChartContainer config={chartConfig} className="aspect-square h-[108px] w-[108px]">
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                innerRadius={30}
                outerRadius={47}
                stroke="none"
                isAnimationActive={false}
              >
                {pieData.map((entry) => (
                  <Cell key={entry.name} fill={entry.fill} />
                ))}
              </Pie>
            </PieChart>
          </ChartContainer>
          <div
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            aria-hidden
          >
            <div className="flex flex-col items-center justify-center gap-0 leading-tight text-center">
              <span className="text-lg font-semibold tabular-nums text-foreground">{totalCount}</span>
              <span className="text-[10px] text-foreground -mt-1">USERS</span>
            </div>
          </div>
        </div>
        <div className="min-w-0 flex-1">
          <ul className="space-y-1 text-xs">
            {items.map((item) => (
              <li key={item.label} className="flex items-center justify-between gap-2">
                <span className="flex items-center gap-2 min-w-0">
                  <span
                    className="h-2 w-2 shrink-0 rounded-sm"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-foreground">{item.label}</span>
                </span>
                <span className="shrink-0 tabular-nums text-foreground">
                  {item.count} ({item.pct.toFixed(0)}%)
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Zone 2: Reviewers – avatar stack */}
      <div className="flex flex-1 min-w-0 flex-col justify-center items-start gap-1 border-r border-border px-4">
        <div className="flex -space-x-2 items-start gap-0">
          {reviewerNames.slice(0, 5).map((name, i) => {
            const imageUrl = reviewerImageUrls?.[i];
            return (
              <Avatar key={i} className="h-[42px] w-[42px] border-2 border-background shrink-0">
                {imageUrl ? (
                  <AvatarImage src={imageUrl} alt={name} />
                ) : null}
                <AvatarFallback className="text-sm bg-muted">
                  {getInitialsFromName(name)}
                </AvatarFallback>
              </Avatar>
            );
          })}
        </div>
        <span className="text-base font-semibold text-foreground">Reviewers</span>
      </div>

      {/* Zone 3: Days left */}
      <div className="flex flex-1 min-w-0 flex-col justify-center items-start px-4">
        <p className="text-3xl font-bold tabular-nums text-foreground">{daysLeft}</p>
        <p className="text-base font-semibold text-foreground">Days left</p>
      </div>
    </div>
  );
}
