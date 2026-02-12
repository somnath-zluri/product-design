import * as React from 'react';
import { Sparkles } from 'lucide-react';
import { SiSlack } from 'react-icons/si';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

function getInitials(name: string): string {
  if (!name) return '';
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) {
    return `${parts[0][0] ?? ''}${parts[parts.length - 1][0] ?? ''}`.toUpperCase();
  }
  return (parts[0]?.slice(0, 2) ?? '').toUpperCase();
}

export type ApplicationRecommendationsTab =
  | 'certify'
  | 'revoke'
  | 'modify'
  | 'manual-review';

export interface ApplicationRecommendationsCardProps {
  appName: string;
  appIconUrl?: string;
  reviewerName: string;
  /** Optional image URL for the reviewer avatar. When unset, avatar shows initials. */
  reviewerImageUrl?: string;
  recommendationsCount: number;
  certifyCount: number;
  revokeCount: number;
  modifyCount: number;
  manualReviewCount: number;
  activeTab?: ApplicationRecommendationsTab;
  onTabChange?: (tab: ApplicationRecommendationsTab) => void;
  children?: React.ReactNode;
  className?: string;
}

export function ApplicationRecommendationsCard({
  appName,
  appIconUrl,
  reviewerName,
  reviewerImageUrl,
  recommendationsCount,
  certifyCount,
  revokeCount,
  modifyCount,
  manualReviewCount,
  activeTab = 'certify',
  onTabChange,
  children,
  className,
}: ApplicationRecommendationsCardProps) {
  return (
    <div className={cn(className)}>
      <div className="p-0">
        <div className="flex flex-wrap items-center justify-between gap-4">
          {/* Left section: app + divider + reviewer */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2">
              {appIconUrl ? (
                <img
                  src={appIconUrl}
                  alt=""
                  className="h-9 w-9 rounded-md object-contain"
                />
              ) : appName.toLowerCase() === 'slack' ? (
                <div className="flex h-9 w-9 items-center justify-center rounded-md bg-muted text-muted-foreground">
                  <SiSlack className="h-5 w-5" aria-hidden />
                </div>
              ) : (
                <div className="flex h-9 w-9 items-center justify-center rounded-md bg-muted text-sm font-semibold text-muted-foreground">
                  {appName.slice(0, 1)}
                </div>
              )}
              <span className="font-semibold text-foreground">{appName}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm">Reviewer:</span>
              <Avatar className="h-6 w-6">
                {reviewerImageUrl ? (
                  <AvatarImage src={reviewerImageUrl} alt={reviewerName} />
                ) : null}
                <AvatarFallback className="text-[10px] bg-muted">
                  {getInitials(reviewerName)}
                </AvatarFallback>
              </Avatar>
              <span className="text-sm">{reviewerName}</span>
            </div>
          </div>

          {/* Right section: title + tabs */}
          <div className="flex flex-wrap items-center gap-3">
            <span className="flex items-center gap-1.5 text-sm font-medium text-foreground">
              <Sparkles className="h-4 w-4" />
              Recommendations
            </span>
            <Tabs
              value={activeTab}
              onValueChange={(v) =>
                onTabChange?.(v as ApplicationRecommendationsTab)
              }
            >
              <TabsList>
                <TabsTrigger value="certify" className="gap-1.5">
                  Certify
                  <Badge variant="secondary">{certifyCount}</Badge>
                </TabsTrigger>
                <TabsTrigger value="revoke" className="gap-1.5">
                  Revoke
                  <Badge variant="secondary">{revokeCount}</Badge>
                </TabsTrigger>
                <TabsTrigger value="modify" className="gap-1.5">
                  Modify
                  <Badge variant="secondary">{modifyCount}</Badge>
                </TabsTrigger>
                <TabsTrigger value="manual-review" className="gap-1.5">
                  Manual Review
                  <Badge variant="secondary">{manualReviewCount}</Badge>
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>

        {children ? (
          <div className="mt-4 rounded-md border bg-muted/30 p-4">
            {children}
          </div>
        ) : null}
      </div>
    </div>
  );
}
