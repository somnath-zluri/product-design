import * as React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Sparkles,
  CheckCircle,
  Pencil,
  ChevronDown,
  UserCog,
  MessageSquarePlus,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export type RecommendationType = 'Revoke' | 'Modify' | 'Certify';

export interface RecommendedActionBannerProps {
  recommendation: RecommendationType;
  recordCount: number;
  onRevokeAll?: () => void;
  onModifyAll?: () => void;
  onCertifyAll?: () => void;
  onReassignAll?: () => void;
  onAddComment?: () => void;
  className?: string;
}

const GRADIENT_BORDER_STYLE: React.CSSProperties = {
  background:
    'conic-gradient(from 0deg, #4f46e5, #7c3aed, #d946ef, #ec4899, #f43f5e, #f97316, #fbbf24, #4f46e5)',
};

export function RecommendedActionBanner({
  recommendation,
  recordCount,
  onRevokeAll,
  onModifyAll,
  onCertifyAll,
  onReassignAll,
  onAddComment,
  className,
}: RecommendedActionBannerProps) {
  const title =
    recommendation === 'Revoke'
      ? 'Revoke Access'
      : recommendation === 'Modify'
        ? 'Modify Access'
        : 'Certify Access';
  const primaryLabel =
    recommendation === 'Revoke'
      ? `Revoke All (${recordCount})`
      : recommendation === 'Modify'
        ? `Modify All (${recordCount})`
        : `Certify All (${recordCount})`;

  const handlePrimaryClick = () => {
    if (recommendation === 'Revoke') onRevokeAll?.();
    else if (recommendation === 'Modify') onModifyAll?.();
    else onCertifyAll?.();
  };

  return (
    <div
      className={cn('relative rounded-lg p-[3px] mt-4 mx-0 mb-2 w-full', className)}
      style={GRADIENT_BORDER_STYLE}
    >
      <div className="flex flex-col gap-3 py-3 px-4 rounded-lg bg-background shadow-sm relative overflow-hidden">
          <div className="flex items-start gap-3 relative z-10">
            <Sparkles
              className="h-10 w-10 flex-shrink-0"
              style={{
                fill: 'url(#sparkle-gradient-banner)',
                color: 'transparent',
              }}
              aria-hidden
            />
            <svg width="0" height="0" className="absolute" aria-hidden>
              <defs>
                <linearGradient
                  id="sparkle-gradient-banner"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#a855f7" />
                  <stop offset="30%" stopColor="#ec4899" />
                  <stop offset="60%" stopColor="#f97316" />
                  <stop offset="100%" stopColor="#fb923c" />
                </linearGradient>
              </defs>
            </svg>
            <div className="flex flex-col flex-1 min-w-0">
              <span className="text-base font-semibold">
                Recommended Action: {title}
              </span>
              <span className="text-sm mt-0.5">
                {recordCount} Accounts lying{' '}
                <Badge variant="secondary" className="text-xs font-normal inline-flex bg-red-50 text-red-700">
                  dormant for 90+ days
                </Badge>{' '}
                and is{' '}
                <Badge variant="secondary" className="text-xs font-normal inline-flex bg-red-50 text-red-700">
                  overprivileged
                </Badge>
                ; the business risk is higher likelihood of misuse, insider threat, or audit findings from excess access.
              </span>
              <div className="flex items-center gap-2 mt-2">
                <Button
                  size="sm"
                  className={cn(
                    'h-8 text-xs font-medium flex items-center gap-1.5',
                    recommendation === 'Revoke' &&
                      'bg-red-600 text-white hover:bg-red-700',
                    recommendation === 'Modify' &&
                      'bg-yellow-600 text-white hover:bg-yellow-700',
                    recommendation === 'Certify' &&
                      'bg-green-600 text-white hover:bg-green-700'
                  )}
                  onClick={handlePrimaryClick}
                  aria-label={primaryLabel}
                >
                  {recommendation === 'Modify' && (
                    <Pencil className="h-3.5 w-3.5" />
                  )}
                  {recommendation === 'Certify' && (
                    <CheckCircle className="h-3.5 w-3.5" />
                  )}
                  {primaryLabel}
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      size="sm"
                      variant="secondary"
                      className="h-8 text-xs font-medium bg-[#616161]/10 text-[#616161] hover:bg-[#616161]/20 border-0"
                    >
                      More Actions
                      <ChevronDown className="h-3.5 w-3.5 ml-1.5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start">
                    <DropdownMenuItem
                      className="flex items-center gap-2"
                      onClick={() => onModifyAll?.()}
                    >
                      <Pencil className="h-3.5 w-3.5 text-yellow-600" />
                      Modify All
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="flex items-center gap-2"
                      onClick={() => onCertifyAll?.()}
                    >
                      <CheckCircle className="h-3.5 w-3.5 text-green-600" />
                      Certify All
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="flex items-center gap-2"
                      onClick={() => onReassignAll?.()}
                    >
                      <UserCog className="h-3.5 w-3.5 text-blue-600" />
                      Reassign all
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="flex items-center gap-2"
                      onClick={() => onAddComment?.()}
                    >
                      <MessageSquarePlus className="h-3.5 w-3.5 text-purple-600" />
                      Add comment
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
