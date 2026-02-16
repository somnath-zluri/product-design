import * as React from 'react';
import { Shield, Check } from 'lucide-react';
import { PieChart, Pie, Cell } from 'recharts';
import { ChartContainer, type ChartConfig } from '@/components/ui/chart';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
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
  /** Reviewer names for avatar stack (e.g. first 3–5). Not shown when signedOffCompleted/signedOffTotal are set (5-zone layout). */
  reviewerNames: string[];
  /** Optional image URLs for reviewers (same order as reviewerNames). When set, avatars show images with initials fallback. */
  reviewerImageUrls?: (string | undefined)[];
  /** Days remaining for the review. Not shown when signedOffCompleted/signedOffTotal are set (5-zone layout). */
  daysLeft: number;
  /** When set with signedOffTotal, use 5-zone layout: signed-off bar + Certified, Revoked, Modified, Not reviewed. Omits pie chart, reviewers, and days left. */
  signedOffCompleted?: number;
  /** Total for signed-off progress (e.g. 500). When set with signedOffCompleted, enables 5-zone layout. */
  signedOffTotal?: number;
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
  signedOffCompleted,
  signedOffTotal,
  className,
}: OverviewCardProps) {
  const notReviewedCount = Math.max(0, totalCount - certifiedCount - revokedCount - modifiedCount);
  const useFiveZone =
    signedOffTotal != null &&
    signedOffTotal > 0 &&
    signedOffCompleted != null;

  const items: { label: string; count: number; pct: number; color: string }[] = [
    { label: 'Certified', count: certifiedCount, pct: totalCount ? (certifiedCount / totalCount) * 100 : 0, color: CERTIFIED_COLOR },
    { label: 'Revoked', count: revokedCount, pct: totalCount ? (revokedCount / totalCount) * 100 : 0, color: REVOKED_COLOR },
    { label: 'Modified', count: modifiedCount, pct: totalCount ? (modifiedCount / totalCount) * 100 : 0, color: MODIFIED_COLOR },
    { label: 'Not Reviewed', count: notReviewedCount, pct: totalCount ? (notReviewedCount / totalCount) * 100 : 0, color: NOT_REVIEWED_COLOR },
  ];

  if (useFiveZone) {
    const completed = signedOffCompleted ?? 0;
    const total = signedOffTotal ?? 0;
    const pct = total > 0 ? Math.round((completed / total) * 100) : 0;
    return (
      <div
        className={cn(
          'rounded-lg border border-border bg-background p-4 flex flex-row flex-wrap items-stretch gap-0',
          className
        )}
      >
        {/* Zone 1: Certified */}
        <div className="flex min-w-0 flex-col justify-center border-r border-border pr-4">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 shrink-0 rounded-sm" style={{ backgroundColor: CERTIFIED_COLOR }} />
            <span className="text-base font-semibold text-foreground">Certified</span>
          </div>
          <p className="text-2xl font-bold tabular-nums text-foreground mt-0.5">{certifiedCount}</p>
        </div>

        {/* Zone 2: Revoked */}
        <div className="flex min-w-0 flex-col justify-center px-4">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 shrink-0 rounded-sm" style={{ backgroundColor: REVOKED_COLOR }} />
            <span className="text-base font-semibold text-foreground">Revoked</span>
          </div>
          <p className="text-2xl font-bold tabular-nums text-foreground mt-0.5">{revokedCount}</p>
        </div>

        <Separator orientation="vertical" className="self-stretch" />

        {/* Zone 3: Modified */}
        <div className="flex min-w-0 flex-col justify-center px-4">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 shrink-0 rounded-sm" style={{ backgroundColor: MODIFIED_COLOR }} />
            <span className="text-base font-semibold text-foreground">Modified</span>
          </div>
          <p className="text-2xl font-bold tabular-nums text-foreground mt-0.5">{modifiedCount}</p>
        </div>

        <Separator orientation="vertical" className="self-stretch" />

        {/* Zone 4: Not reviewed */}
        <div className="flex min-w-0 flex-col justify-center px-4">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 shrink-0 rounded-sm" style={{ backgroundColor: NOT_REVIEWED_COLOR }} />
            <span className="text-base font-semibold text-foreground">Not reviewed</span>
          </div>
          <p className="text-2xl font-bold tabular-nums text-foreground mt-0.5">{notReviewedCount}</p>
        </div>

        {/* Zone 5: Signed-off progress bar (right of card) */}
        <div className="flex min-w-0 flex-col justify-center gap-1 pl-4 ml-auto">
          <div className="flex items-center gap-2">
            <span className="relative inline-block h-4 w-4 shrink-0" aria-hidden>
              <Shield className="h-4 w-4 fill-blue-500 text-blue-500" />
              <Check className="absolute inset-0 m-auto h-2.5 w-2.5 text-white" strokeWidth={3} />
            </span>
            <span className="text-sm text-muted-foreground whitespace-nowrap">
              {completed} of {total} records signed-off
            </span>
          </div>
          <div className="flex h-4 items-center gap-2">
            <Progress
              value={pct}
              className="h-2 min-w-[300px] w-72 flex-1 max-w-[420px] rounded-full bg-muted [&>div]:bg-blue-500"
            />
            <span className="text-sm text-muted-foreground whitespace-nowrap tabular-nums">
              {pct}%
            </span>
          </div>
        </div>
      </div>
    );
  }

  const pieData = [
    { name: 'certified', value: certifiedCount, fill: CERTIFIED_COLOR },
    { name: 'revoked', value: revokedCount, fill: REVOKED_COLOR },
    { name: 'modified', value: modifiedCount, fill: MODIFIED_COLOR },
    { name: 'notReviewed', value: notReviewedCount, fill: NOT_REVIEWED_COLOR },
  ].filter((d) => d.value > 0);

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
