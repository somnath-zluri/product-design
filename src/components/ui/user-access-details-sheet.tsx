import { Mail, Briefcase, Sparkles, CheckCircle, Pencil, ChevronDown } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';
import type { Insight } from '@/components/ui/insight-badge';

/** Single application access entry shown in Access Details */
export interface UserAccessDetailApp {
  name: string;
  userType: string;
  lastActivity: string;
}

/** Single review history entry */
export interface UserAccessDetailReviewEntry {
  level: string;
  reviewer: string;
  decision: 'Modify' | 'Certify' | 'Revoke';
  reason: string;
  date: string;
}

/** Data shape for the User Access Details sheet content */
export interface UserAccessDetailsSheetData {
  userName: string;
  role: string;
  email: string;
  department: string;
  accessDetails: UserAccessDetailApp[];
  insight: Insight | null | undefined;
  suggestedAction: 'Certify' | 'Modify' | 'Revoke';
  riskLevel: 'Low' | 'Medium' | 'High';
  reviewHistory: UserAccessDetailReviewEntry[];
}

export interface UserAccessDetailsSheetProps {
  /** Whether the sheet is open */
  open: boolean;
  /** Called when open state should change (e.g. user closes sheet) */
  onOpenChange: (open: boolean) => void;
  /** Row id for the selected record; when null, sheet content is not rendered */
  rowId: string | null;
  /** Fetches sheet data for the given row id. Called when rowId is set. */
  getSheetDataForRow: (rowId: string) => UserAccessDetailsSheetData;
  /** Optional: called when user clicks Certify (receives rowId for parent to open dialog) */
  onCertify?: (rowId: string) => void;
  /** Optional: called when user clicks Revoke (receives rowId for parent to open dialog) */
  onRevoke?: (rowId: string) => void;
  /** Optional: called when user clicks Modify (receives rowId for parent to open dialog) */
  onModify?: (rowId: string) => void;
}

/**
 * User Access Details sheet – a side sheet that shows deeper information for a
 * table row (user info, risk, recommendation, access details table, review history,
 * quick actions). Used when a reviewer needs to investigate a record in more detail.
 */
export function UserAccessDetailsSheet({
  open,
  onOpenChange,
  rowId,
  getSheetDataForRow,
  onCertify,
  onRevoke,
  onModify,
}: UserAccessDetailsSheetProps) {
  const data = rowId ? getSheetDataForRow(rowId) : null;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-[512px] sm:max-w-[512px] max-w-[100vw]">
        {data && rowId && (
          <>
            <SheetHeader className="space-y-1 min-w-0">
              <SheetTitle className="text-xl break-words">
                Access details of {data.userName}
              </SheetTitle>
            </SheetHeader>
            <ScrollArea className="h-[calc(100vh-8rem)] mt-4 px-4 pb-6">
              <div className="space-y-6">
                <section>
                  <h3 className="text-sm font-semibold text-foreground mb-2">User Information</h3>
                  <div className="flex flex-col gap-2 text-sm text-foreground">
                    <div className="flex items-center gap-2 min-w-0">
                      <Mail className="h-4 w-4 shrink-0" />
                      <span className="break-all">{data.email}</span>
                    </div>
                    <div className="flex items-center gap-2 min-w-0">
                      <Briefcase className="h-4 w-4 shrink-0" />
                      <span className="break-words">{data.department}</span>
                    </div>
                  </div>
                </section>

                <section>
                  <h3 className="text-sm font-semibold text-foreground mb-2">Risk Assessment</h3>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant="secondary"
                      className={cn(
                        'text-xs',
                        data.riskLevel === 'High' && 'bg-red-100 text-red-800 border-transparent',
                        data.riskLevel === 'Medium' && 'bg-amber-100 text-amber-800 border-transparent',
                        data.riskLevel === 'Low' && 'bg-green-100 text-green-800 border-transparent'
                      )}
                    >
                      {data.riskLevel}
                    </Badge>
                  </div>
                </section>

                <section>
                  <h3 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-1.5">
                    <Sparkles className="h-4 w-4 text-primary" />
                    Recommendation
                  </h3>
                  {(data.insight != null) && (
                    <p className="mb-3 text-sm text-foreground leading-relaxed">
                      {data.insight.userSpecificDescription ?? data.insight.description}
                    </p>
                  )}
                  <div className="flex items-center gap-2 flex-wrap">
                    <Button
                      size="sm"
                      variant="outline"
                      className={cn(
                        data.suggestedAction === 'Certify' && 'bg-green-100 hover:bg-green-200 border-green-300 text-green-800',
                        data.suggestedAction === 'Revoke' && 'bg-red-100 hover:bg-red-200 border-red-300 text-red-800',
                        data.suggestedAction === 'Modify' && 'bg-yellow-100 hover:bg-yellow-200 border-yellow-300 text-yellow-800'
                      )}
                      onClick={() => {
                        if (data.suggestedAction === 'Certify') onCertify?.(rowId);
                        if (data.suggestedAction === 'Revoke') onRevoke?.(rowId);
                        if (data.suggestedAction === 'Modify') onModify?.(rowId);
                      }}
                    >
                      {data.suggestedAction === 'Revoke' && 'Revoke this access'}
                      {data.suggestedAction === 'Modify' && 'Modify this access'}
                      {data.suggestedAction === 'Certify' && 'Approve and certify this access'}
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button size="sm" variant="outline" className="shrink-0">
                          More Actions
                          <ChevronDown className="h-4 w-4 ml-1" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="start">
                        <DropdownMenuItem onClick={() => onCertify?.(rowId)}>
                          <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                          Certify
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onModify?.(rowId)}>
                          <Pencil className="h-4 w-4 mr-2 text-yellow-600" />
                          Modify
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </section>

                <section>
                  <h3 className="text-sm font-semibold text-foreground mb-2">Details</h3>
                  <Tabs defaultValue="access-details" className="w-full">
                    <TabsList className="w-full grid grid-cols-2">
                      <TabsTrigger value="access-details" className="text-xs">
                        Access details
                      </TabsTrigger>
                      <TabsTrigger value="reviewer-history" className="text-xs">
                        Reviewer history
                      </TabsTrigger>
                    </TabsList>
                    <TabsContent value="access-details" className="mt-3">
                      {data.accessDetails.length > 0 ? (
                        <Table className="text-xs">
                          <TableHeader>
                            <TableRow className="hover:bg-transparent">
                              <TableHead className="h-8 px-2 py-1.5 text-xs font-medium">Application</TableHead>
                              <TableHead className="h-8 px-2 py-1.5 text-xs font-medium">App role</TableHead>
                              <TableHead className="h-8 px-2 py-1.5 text-xs font-medium">Last active</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {data.accessDetails.map((app, i) => (
                              <TableRow key={i} className="border-b border-border/50">
                                <TableCell className="px-2 py-1.5 text-xs font-medium">{app.name}</TableCell>
                                <TableCell className="px-2 py-1.5 text-xs text-foreground">{app.userType}</TableCell>
                                <TableCell className="px-2 py-1.5 text-xs text-foreground">
                                  {app.lastActivity.includes(': ')
                                    ? app.lastActivity.split(': ')[1]
                                    : app.lastActivity}
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      ) : (
                        <p className="text-sm text-foreground">No access details</p>
                      )}
                    </TabsContent>
                    <TabsContent value="reviewer-history" className="mt-3">
                      {data.reviewHistory.length > 0 ? (
                        <div className="space-y-3">
                          {data.reviewHistory.map((entry, i) => (
                            <div
                              key={i}
                              className="rounded-lg border border-border bg-muted/30 p-3 space-y-2 text-sm"
                            >
                              <div className="flex items-center justify-between gap-2">
                                <span className="font-medium text-foreground">{entry.level}</span>
                                <span className="text-xs text-foreground">{entry.date}</span>
                              </div>
                              <p className="font-medium">{entry.reviewer}</p>
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className="text-xs text-foreground">Decision:</span>
                                <Badge
                                  variant="secondary"
                                  className={cn(
                                    'text-xs',
                                    entry.decision === 'Certify' && 'bg-green-100 text-green-800 border-transparent',
                                    entry.decision === 'Revoke' && 'bg-red-100 text-red-800 border-transparent',
                                    entry.decision === 'Modify' && 'bg-yellow-100 text-yellow-800 border-transparent'
                                  )}
                                >
                                  {entry.decision}
                                </Badge>
                              </div>
                              <p className="text-foreground text-xs leading-relaxed">{entry.reason}</p>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm text-foreground">No review history yet</p>
                      )}
                    </TabsContent>
                  </Tabs>
                </section>
              </div>
            </ScrollArea>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
