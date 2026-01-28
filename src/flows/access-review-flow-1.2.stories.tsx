import type { Meta, StoryObj } from '@storybook/react';
import { useState, useRef } from 'react';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import { UAR } from '@/pages/UAR';
import { UAREmployeeModeV12 } from '@/pages/UAREmployeeModeV12';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Checkbox } from '@/components/ui/checkbox';
import { CheckCircle, XCircle, Pencil, MoreVertical, Copy, Shield, Check, MessageSquare } from 'lucide-react';
import type { Insight } from '@/components/ui/insight-badge';
import { ALL_INSIGHTS } from '@/components/ui/insight-badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { SearchableSelect } from '@/components/ui/searchable-select';
import { UserCog, ChevronDown } from 'lucide-react';
import { toast } from 'sonner';
import { Toaster } from '@/components/ui/sonner';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';

type ReviewHistoryEntry = {
  level: string;
  reviewer: string;
  decision: 'Modify' | 'Certify' | 'Revoke';
  reason: string;
  date: string;
};

function getReviewHistoryForRow(rowId: string): ReviewHistoryEntry[] {
  const levels = ['L1', 'L2', 'L3'];
  const reviewers = ['Somnath Nabajja', 'Anjali Arora', 'Mithilesh Hari'];
  const decisions: Array<'Modify' | 'Certify' | 'Revoke'> = ['Certify', 'Certify', 'Modify'];
  const reasons = [
    'Access verified and appropriate for current role. No changes required.',
    'Business justification confirmed. User has demonstrated need for continued access.',
    'Access reviewed with additional scrutiny. Minor modifications recommended and applied.',
  ];
  const dates = ['Jan 15, 2026', 'Jan 20, 2026', 'Jan 25, 2026'];
  const idx = Math.abs(parseInt(rowId.replace('row-', '') || '0', 10)) % 3;
  return levels.slice(0, idx + 1).map((level, i) => ({
    level,
    reviewer: reviewers[i % reviewers.length],
    decision: decisions[i],
    reason: reasons[i % reasons.length],
    date: dates[i % dates.length],
  }));
}

const meta = {
  title: 'Flows/Access Review Flow 1.2',
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
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

// Sample reviewers for reassignment - all org reviewers
const allReviewers = [
  'Somnath Nabajja',
  'Mithilesh Hari',
  'Anjali Arora',
  'Rajesh Kumar',
  'Priya Sharma',
  'Amit Patel',
  'Neha Singh',
  'Vikram Mehta',
  'Sneha Reddy',
  'Arjun Desai',
  'Kavita Nair',
  'Rohit Joshi',
  'Divya Iyer',
  'Suresh Menon',
  'Anita Rao',
].map(name => ({ value: name, label: name }));

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

const getInitialsFromName = (fullName: string) => {
  if (!fullName) return '';
  const parts = fullName.trim().split(' ');
  if (parts.length >= 2) {
    return `${parts[0][0]?.toUpperCase() || ''}${parts[parts.length - 1][0]?.toUpperCase() || ''}`;
  }
  return parts[0][0]?.toUpperCase() || '';
};

// Helper function to generate user-specific description
const generateUserSpecificDescription = (insightName: string, index: number, _userName?: string): string => {
  const daysMatch = insightName.match(/(\d+)\s*days?/i);
  const days = daysMatch ? parseInt(daysMatch[1]) : null;
  const randomDays = days || (30 + (index % 91));
  
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
  
  return insightName.toLowerCase().replace(/accounts?/gi, 'account');
};

// Helper function to generate insights
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

// Helper function to determine recommended action
const getRecommendedAction = (insights: Insight[], riskLevel: string): 'Certify' | 'Modify' | 'Revoke' => {
  const revokeCount = insights.filter(insight => insight.recommendedAction === 'Revoke').length;
  const modifyCount = insights.filter(insight => insight.recommendedAction === 'Modify').length;
  const certifyCount = insights.filter(insight => insight.recommendedAction === 'Certify').length;
  
  const hasRevoke = revokeCount > 0;
  const hasModify = modifyCount > 0;
  const hasCertify = certifyCount > 0;
  
  const normalizedRiskLevel = riskLevel?.toString().trim();
  
  if (normalizedRiskLevel === 'Low') {
    if (hasModify) {
      return 'Modify';
    }
    if (hasRevoke && !hasModify && !hasCertify) {
      return 'Revoke';
    }
    if (hasCertify && !hasModify && !hasRevoke) {
      return 'Certify';
    }
    if (hasRevoke && hasCertify && !hasModify) {
      return 'Certify';
    }
  }
  
  if (hasRevoke) {
    return 'Revoke';
  }
  
  if (hasModify) {
    return 'Modify';
  }
  
  return 'Certify';
};

type FlowScreen = 'dashboard' | 'certification' | 'record';

export const AccessReviewFlow12: Story = {
  name: 'Access Review Flow 1.2',
  render: () => {
    const [currentScreen, setCurrentScreen] = useState<FlowScreen>('dashboard');
    
    // Record Overview state
    const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
    // Pre-populate ~70% of rows (35 out of 50) with actions for demonstration
    // This represents rows that have been actioned upon
    const [certifiedRows, setCertifiedRows] = useState<Set<string>>(new Set([
      'row-1', 'row-3', 'row-5', 'row-8', 'row-12', 'row-15', 'row-17', 'row-21', 'row-24', 'row-27', 'row-30', 'row-33'
    ]));
    const [revokedRows, setRevokedRows] = useState<Set<string>>(new Set([
      'row-2', 'row-7', 'row-10', 'row-14', 'row-18', 'row-20', 'row-22', 'row-25', 'row-28', 'row-31', 'row-34', 'row-36'
    ]));
    const [modifiedRows, setModifiedRows] = useState<Set<string>>(new Set([
      'row-4', 'row-9', 'row-11', 'row-16', 'row-19', 'row-23', 'row-26', 'row-29', 'row-32', 'row-35', 'row-37'
    ]));
    const [certifyDialogOpen, setCertifyDialogOpen] = useState(false);
    const [revokeDialogOpen, setRevokeDialogOpen] = useState(false);
    const [modifyDialogOpen, setModifyDialogOpen] = useState(false);
    const [certifyReason, setCertifyReason] = useState('');
    const [revokeReason, setRevokeReason] = useState('');
    const [modifyReason, setModifyReason] = useState('');
    const [certifyingRow, setCertifyingRow] = useState<{ id: string; userName: string; rowData?: any } | null>(null);
    const [revokingRow, setRevokingRow] = useState<{ id: string; userName: string; rowData?: any } | null>(null);
    const [modifyingRow, setModifyingRow] = useState<{ id: string; userName: string; rowData?: any } | null>(null);
    const [showReasonError, setShowReasonError] = useState(false);
    const [showRevokeReasonError, setShowRevokeReasonError] = useState(false);
    const [showModifyReasonError, setShowModifyReasonError] = useState(false);
    const [reassignDialogOpen, setReassignDialogOpen] = useState(false);
    const [selectedNewReviewer, setSelectedNewReviewer] = useState<string>('');
    const [reviewerReassignments, setReviewerReassignments] = useState<Map<string, string>>(new Map());
    const [selectedCountWhenDialogOpened, setSelectedCountWhenDialogOpened] = useState(0);
    const [showReviewerError, setShowReviewerError] = useState(false);
    const [reviewHistoryPanelOpen, setReviewHistoryPanelOpen] = useState(false);
    const [reviewHistoryPanelRowId, setReviewHistoryPanelRowId] = useState<string | null>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const revokeTextareaRef = useRef<HTMLTextAreaElement>(null);
    const modifyTextareaRef = useRef<HTMLTextAreaElement>(null);


    // Generate context-aware quick comments for certification
    const generateQuickComments = (rowData: any): string[] => {
      const comments: string[] = [];
      const riskLevel = (rowData?.riskLevel || 'Medium').toString();
      const userIndex = parseInt(rowData?.id?.replace('row-', '') || '1') - 1;
      const user = sampleUsers[userIndex % sampleUsers.length] || sampleUsers[0];
      
      if (riskLevel === 'Low') {
        comments.push(
          'User has valid business need and access aligns with current role',
          'Regular access review completed - no changes required',
          'Access verified and appropriate for job responsibilities'
        );
      } else if (riskLevel === 'Medium') {
        comments.push(
          'Access reviewed and verified - user requires this for current role',
          'Business justification confirmed - access is appropriate',
          'User has demonstrated need for continued access'
        );
      } else {
        comments.push(
          'Access reviewed with additional scrutiny - verified as necessary',
          'High-risk access justified by business requirements',
          'Access approved after thorough review of business need'
        );
      }
      
      comments.push(
        `Access aligns with ${user.firstName}'s current job responsibilities`,
        'Access review completed - no security concerns identified'
      );
      
      return comments.slice(0, 5);
    };

    // Generate context-aware quick comments for revocation
    const generateRevokeQuickComments = (rowData: any): string[] => {
      const comments: string[] = [];
      const riskLevel = (rowData?.riskLevel || 'Medium').toString();
      const userIndex = parseInt(rowData?.id?.replace('row-', '') || '1') - 1;
      const user = sampleUsers[userIndex % sampleUsers.length] || sampleUsers[0];
      
      if (riskLevel === 'Low') {
        comments.push(
          'User no longer requires this access for current role',
          'Access removed due to role change',
          'User has been reassigned and no longer needs this access'
        );
      } else if (riskLevel === 'Medium') {
        comments.push(
          'Access revoked due to security concerns',
          'User no longer has business justification for this access',
          'Access removed following security review'
        );
      } else {
        comments.push(
          'High-risk access revoked due to security policy violation',
          'Access removed following security audit findings',
          'Revoked due to compliance requirements'
        );
      }
      
      comments.push(
        `Access no longer aligns with ${user.firstName}'s current job responsibilities`,
        'Access revoked - user no longer requires this level of access'
      );
      
      return comments.slice(0, 5);
    };

    // Generate context-aware quick comments for modification
    const generateModifyQuickComments = (rowData: any): string[] => {
      const comments: string[] = [];
      const riskLevel = (rowData?.riskLevel || 'Medium').toString();
      const userIndex = parseInt(rowData?.id?.replace('row-', '') || '1') - 1;
      const user = sampleUsers[userIndex % sampleUsers.length] || sampleUsers[0];
      
      if (riskLevel === 'Low') {
        comments.push(
          'Access needs to be adjusted to match current role requirements',
          'Modify access permissions to align with updated job responsibilities',
          'Update access level based on role changes'
        );
      } else if (riskLevel === 'Medium') {
        comments.push(
          'Access requires modification due to security policy updates',
          'Adjust permissions to meet current security standards',
          'Modify access to comply with updated compliance requirements'
        );
      } else {
        comments.push(
          'High-risk access requires modification for security compliance',
          'Adjust permissions following security audit recommendations',
          'Modify access to meet enhanced security protocols'
        );
      }
      
      comments.push(
        `Access permissions need adjustment for ${user.firstName}'s current role`,
        'Modify access to better align with current business needs'
      );
      
      return comments.slice(0, 5);
    };

    const handleSelectAll = (checked: boolean) => {
      if (checked) {
        const allRowIds = new Set<string>();
        for (let i = 0; i < 50; i++) {
          allRowIds.add(`row-${i + 1}`);
        }
        setSelectedRows(allRowIds);
      } else {
        setSelectedRows(new Set());
      }
    };

    const handleRowSelect = (rowId: string, checked: boolean) => {
      const newSelected = new Set(selectedRows);
      if (checked) {
        newSelected.add(rowId);
      } else {
        newSelected.delete(rowId);
      }
      setSelectedRows(newSelected);
    };

    const handleCertifyClick = (row: any) => {
      const userIndex = parseInt(row.id.replace('row-', '')) - 1;
      const user = sampleUsers[userIndex % sampleUsers.length] || sampleUsers[0];
      const userName = `${user.firstName} ${user.lastName}`;
      setCertifyingRow({ id: row.id, userName, rowData: row });
      setCertifyDialogOpen(true);
      setCertifyReason('');
      setShowReasonError(false);
    };

    const handleQuickCommentClick = (comment: string) => {
      setCertifyReason(comment);
      if (showReasonError) {
        setShowReasonError(false);
      }
      setTimeout(() => {
        textareaRef.current?.focus();
        if (textareaRef.current) {
          textareaRef.current.setSelectionRange(comment.length, comment.length);
        }
      }, 0);
    };

    const handleCopyComment = async (comment: string) => {
      try {
        await navigator.clipboard.writeText(comment);
      } catch (err) {
        console.error('Failed to copy:', err);
      }
    };

    const handleCertifyConfirm = () => {
      if (!certifyReason.trim()) {
        setShowReasonError(true);
        return;
      }
      
      if (certifyingRow?.id) {
        setCertifiedRows((prev) => new Set(prev).add(certifyingRow.id));
        setRevokedRows((prev) => {
          const newSet = new Set(prev);
          newSet.delete(certifyingRow.id);
          return newSet;
        });
        setModifiedRows((prev) => {
          const newSet = new Set(prev);
          newSet.delete(certifyingRow.id);
          return newSet;
        });
      }
      
      setCertifyDialogOpen(false);
      setCertifyReason('');
      setCertifyingRow(null);
      setShowReasonError(false);
    };

    const handleCertifyCancel = () => {
      setCertifyDialogOpen(false);
      setCertifyReason('');
      setCertifyingRow(null);
    };

    const handleRevokeClick = (row: any) => {
      const userIndex = parseInt(row.id.replace('row-', '')) - 1;
      const user = sampleUsers[userIndex % sampleUsers.length] || sampleUsers[0];
      const userName = `${user.firstName} ${user.lastName}`;
      setRevokingRow({ id: row.id, userName, rowData: row });
      setRevokeDialogOpen(true);
      setRevokeReason('');
      setShowRevokeReasonError(false);
    };

    const handleRevokeQuickCommentClick = (comment: string) => {
      setRevokeReason(comment);
      if (showRevokeReasonError) {
        setShowRevokeReasonError(false);
      }
      setTimeout(() => {
        revokeTextareaRef.current?.focus();
        if (revokeTextareaRef.current) {
          revokeTextareaRef.current.setSelectionRange(comment.length, comment.length);
        }
      }, 0);
    };

    const handleRevokeConfirm = () => {
      if (!revokeReason.trim()) {
        setShowRevokeReasonError(true);
        return;
      }
      
      if (revokingRow?.id) {
        setRevokedRows((prev) => new Set(prev).add(revokingRow.id));
        setCertifiedRows((prev) => {
          const newSet = new Set(prev);
          newSet.delete(revokingRow.id);
          return newSet;
        });
        setModifiedRows((prev) => {
          const newSet = new Set(prev);
          newSet.delete(revokingRow.id);
          return newSet;
        });
      }
      
      setRevokeDialogOpen(false);
      setRevokeReason('');
      setRevokingRow(null);
      setShowRevokeReasonError(false);
    };

    const handleRevokeCancel = () => {
      setRevokeDialogOpen(false);
      setRevokeReason('');
      setRevokingRow(null);
    };

    const handleModifyClick = (row: any) => {
      const userIndex = parseInt(row.id.replace('row-', '')) - 1;
      const user = sampleUsers[userIndex % sampleUsers.length] || sampleUsers[0];
      const userName = `${user.firstName} ${user.lastName}`;
      setModifyingRow({ id: row.id, userName, rowData: row });
      setModifyDialogOpen(true);
      setModifyReason('');
      setShowModifyReasonError(false);
    };

    const handleModifyQuickCommentClick = (comment: string) => {
      setModifyReason(comment);
      if (showModifyReasonError) {
        setShowModifyReasonError(false);
      }
      setTimeout(() => {
        modifyTextareaRef.current?.focus();
        if (modifyTextareaRef.current) {
          modifyTextareaRef.current.setSelectionRange(comment.length, comment.length);
        }
      }, 0);
    };

    const handleModifyConfirm = () => {
      if (!modifyReason.trim()) {
        setShowModifyReasonError(true);
        return;
      }
      
      if (modifyingRow?.id) {
        setModifiedRows((prev) => new Set(prev).add(modifyingRow.id));
        setCertifiedRows((prev) => {
          const newSet = new Set(prev);
          newSet.delete(modifyingRow.id);
          return newSet;
        });
        setRevokedRows((prev) => {
          const newSet = new Set(prev);
          newSet.delete(modifyingRow.id);
          return newSet;
        });
      }
      
      setModifyDialogOpen(false);
      setModifyReason('');
      setModifyingRow(null);
      setShowModifyReasonError(false);
    };

    const handleModifyCancel = () => {
      setModifyDialogOpen(false);
      setModifyReason('');
      setModifyingRow(null);
    };

    const handleReassignClick = () => {
      setSelectedCountWhenDialogOpened(selectedRows.size);
      const commonReviewer = getCommonCurrentReviewer();
      setReassignDialogOpen(true);
      setSelectedNewReviewer(commonReviewer || '');
      setShowReviewerError(false);
    };

    // Helper to get reviewer for a row ID (needs row data access)
    const getCurrentReviewerForRowId = (rowId: string): string => {
      if (reviewerReassignments.has(rowId)) {
        return reviewerReassignments.get(rowId)!;
      }
      // Get default reviewer from row data - need to find the row
      // For now, we'll use a pattern based on row ID to get default reviewer
      const rowIndex = parseInt(rowId.replace('row-', '')) - 1;
      const defaultReviewers = ['Somnath Nabajja', 'Mithilesh Hari', 'Anjali Arora'];
      return defaultReviewers[rowIndex % defaultReviewers.length] || '';
    };

    const handleReassignConfirm = () => {
      if (!selectedNewReviewer) {
        setShowReviewerError(true);
        return;
      }
      
      // Check if reassigning to same reviewer
      const allSameReviewer = Array.from(selectedRows).every(rowId => {
        const currentReviewer = getCurrentReviewerForRowId(rowId);
        return currentReviewer === selectedNewReviewer;
      });
      
      if (allSameReviewer) {
        toast.info('Selected records already have this reviewer assigned');
        setReassignDialogOpen(false);
        setSelectedNewReviewer('');
        setShowReviewerError(false);
        return;
      }
      
      // Confirm for large number of records
      if (selectedRows.size >= 20) {
        const confirmed = window.confirm(`Are you sure you want to reassign ${selectedRows.size} records to ${selectedNewReviewer}?`);
        if (!confirmed) return;
      }
      
      const newReassignments = new Map(reviewerReassignments);
      selectedRows.forEach((rowId) => {
        newReassignments.set(rowId, selectedNewReviewer);
      });
      setReviewerReassignments(newReassignments);
      setReassignDialogOpen(false);
      setSelectedNewReviewer('');
      setShowReviewerError(false);
      
      // Show success toast
      toast.success(`Successfully reassigned ${selectedRows.size} ${selectedRows.size === 1 ? 'record' : 'records'} to ${selectedNewReviewer}`);
      
      // Don't clear selection - allow user to perform more actions
    };

    const handleReassignCancel = () => {
      setReassignDialogOpen(false);
      setSelectedNewReviewer('');
      setShowReviewerError(false);
    };

    // Get current reviewer for a row (reassigned or default)
    const getCurrentReviewer = (row: any): string => {
      if (reviewerReassignments.has(row.id)) {
        return reviewerReassignments.get(row.id)!;
      }
      // Get default reviewer from row data
      const reviewer = (row as any).currentReviewer;
      if (reviewer && reviewer.trim()) {
        return reviewer;
      }
      // Fallback to pattern-based default
      const rowIndex = parseInt(row.id.replace('row-', '')) - 1;
      const defaultReviewers = ['Somnath Nabajja', 'Mithilesh Hari', 'Anjali Arora'];
      return defaultReviewers[rowIndex % defaultReviewers.length] || '';
    };

    // Get common current reviewer for selected rows (if all have the same)
    const getCommonCurrentReviewer = (): string | null => {
      if (selectedRows.size === 0) return null;
      const reviewers = Array.from(selectedRows).map(rowId => {
        return getCurrentReviewerForRowId(rowId);
      }).filter(Boolean);
      if (reviewers.length === 0) return null;
      const uniqueReviewers = new Set(reviewers);
      return uniqueReviewers.size === 1 ? Array.from(uniqueReviewers)[0] : null;
    };

    // Render based on current screen
    if (currentScreen === 'dashboard') {
      // Use UAR directly to access customActionColumn for the main certifications table
      // Keep showTable={false} to prevent the second users table from appearing
      return (
        <UAR
          controlsBelowTitle
          showVerticalStepper={false}
          showBreadcrumb={false}
          titleOverride="Access Review"
          showLeftPanel={false}
          showTableControls={false}
          showTable={false}
          showHorizontalStepper={false}
          showRadioCard
          showDeadlineCard
          showHeaderSummary={false}
          showHeaderDescription={false}
          deadlineCardPosition="left"
          hideTimelineColumn
          hideInsightsColumn
          showRadioTabs={false}
          hideAppIncludedColumn
          hideUsersIncludedColumn
          showRiskScoreColumn={false}
          showTimeRemainingColumn={true}
          hideViewByFilter={true}
          hideSortByFilter={true}
          hideButtonGroup={true}
          customActionColumn={(row) => (
            <Button 
              size="sm" 
              className="h-7 text-xs"
              onClick={() => setCurrentScreen('certification')}
            >
              {(row as any).actionLabel || 'Review'}
            </Button>
          )}
        />
      );
    }

    if (currentScreen === 'certification') {
      return (
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
          firstButtonLabel="View by app"
          secondButtonLabel="Reviewer Progress"
          showReviewerProgressButton={false}
          thirdButtonLabel="View by insight"
          customActionColumn={() => (
            <Button 
              size="sm" 
              className="h-7 text-xs"
              onClick={() => setCurrentScreen('record')}
            >
              Review
            </Button>
          )}
        />
      );
    }

    // No background or opacity on data rows – only table header has background
    const getRowClassName = (_row: any): string | undefined => undefined;

    // Record Overview screen
    return (
      <>
        <UAREmployeeModeV12
          titleOverride="Slack"
          headerLayout="inline"
          deadlineCardPosition="header"
          sidebarHasTabs={false}
          showLeftPanel={false}
          showRadioTabs={false}
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
          firstColumnWidth={280}
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
          showSignOffButton={true}
          getRowReviewStatus={(row) => {
            if (certifiedRows.has(row.id)) return 'signed-off';
            if (revokedRows.has(row.id) || modifiedRows.has(row.id)) return 'reviewed';
            return 'pending';
          }}
          showCurrentReviewerColumn={true}
          selectedRows={selectedRows}
          onSelectAll={handleSelectAll}
          onRowSelect={handleRowSelect}
          customCurrentReviewerCell={(row) => {
            const reviewer = getCurrentReviewer(row);
            return (
              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarFallback className="text-[10px] text-foreground">
                    {getInitialsFromName(reviewer || '')}
                  </AvatarFallback>
                </Avatar>
                <span className="text-foreground text-sm border-b border-dashed border-current pb-[1px]">
                  {reviewer || '–'}
                </span>
              </div>
            );
          }}
          customFirstColumnCell={(row) => {
            const userIndex = parseInt(row.id.replace('row-', '')) - 1;
            const user = sampleUsers[userIndex % sampleUsers.length] || sampleUsers[0];
            const userEmail = (row as any).userEmail || `${user.firstName.toLowerCase()}.${user.lastName.toLowerCase()}@cloud.dev`;
            return (
              <div className="flex items-center gap-3 min-w-0">
                <Checkbox 
                  checked={selectedRows.has(row.id)}
                  onCheckedChange={(checked) => handleRowSelect(row.id, checked === true)}
                />
                <Avatar className="h-8 w-8 flex-shrink-0">
                  <AvatarFallback className="text-xs">
                    {getInitials(user.firstName, user.lastName)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col min-w-0 flex-1">
                  <span className="text-sm font-medium truncate" title={`${user.firstName} ${user.lastName}`}>
                    {user.firstName} {user.lastName}
                  </span>
                  <span className="text-xs text-muted-foreground truncate" title={userEmail}>
                    {userEmail}
                  </span>
                </div>
              </div>
            );
          }}
          customActionColumn={(row) => {
            if (certifiedRows.has(row.id)) {
              return (
                <div className="flex items-center gap-2">
                  <Badge className="bg-green-100 text-green-700 border-transparent text-sm px-3 py-1">
                    <CheckCircle className="h-3.5 w-3.5 mr-1.5" />
                    Certified
                  </Badge>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-7 w-7 p-0" aria-label="View reviewer comments">
                        <MessageSquare className="h-4 w-4 text-muted-foreground" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent align="end" className="w-80">
                      <div className="space-y-3">
                        <p className="font-medium text-sm">Reviewer comments</p>
                        <ScrollArea className="max-h-[240px] pr-2">
                          <div className="space-y-3">
                            {getReviewHistoryForRow(row.id).map((entry, i) => (
                              <div key={i} className="text-sm border-b border-border pb-2 last:border-0 last:pb-0">
                                <p className="font-medium text-muted-foreground">{entry.reviewer} · {entry.level}</p>
                                <p className="text-xs text-muted-foreground mt-0.5">{entry.date}</p>
                                <p className="mt-1 leading-snug">{entry.reason}</p>
                              </div>
                            ))}
                          </div>
                        </ScrollArea>
                      </div>
                    </PopoverContent>
                  </Popover>
                  <span className="relative inline-block h-4 w-4 shrink-0">
                  <Shield className="h-4 w-4 fill-blue-500 text-blue-500" />
                  <Check className="absolute inset-0 m-auto h-2.5 w-2.5 text-white" strokeWidth={3} />
                </span>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 w-7 p-0"
                        aria-label="More options"
                      >
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => {
                        setCertifiedRows((prev) => {
                          const newSet = new Set(prev);
                          newSet.delete(row.id);
                          return newSet;
                        });
                      }}>
                        Change Action
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => {
                        const userIndex = parseInt(row.id.replace('row-', '')) - 1;
                        const user = sampleUsers[userIndex % sampleUsers.length] || sampleUsers[0];
                        const userName = `${user.firstName} ${user.lastName}`;
                        setCertifyingRow({ id: row.id, userName, rowData: row });
                        setCertifyDialogOpen(true);
                        setShowReasonError(false);
                      }}>
                        Edit Comment
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => {
                          setReviewHistoryPanelRowId(row.id);
                          setReviewHistoryPanelOpen(true);
                        }}
                      >
                        View Review History
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              );
            }
            
            if (revokedRows.has(row.id)) {
              return (
                <div className="flex items-center gap-2">
                  <Badge className="bg-red-100 text-red-700 border-transparent text-sm px-3 py-1">
                    <XCircle className="h-3.5 w-3.5 mr-1.5" />
                    Revoked
                  </Badge>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-7 w-7 p-0" aria-label="View reviewer comments">
                        <MessageSquare className="h-4 w-4 text-muted-foreground" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent align="end" className="w-80">
                      <div className="space-y-3">
                        <p className="font-medium text-sm">Reviewer comments</p>
                        <ScrollArea className="max-h-[240px] pr-2">
                          <div className="space-y-3">
                            {getReviewHistoryForRow(row.id).map((entry, i) => (
                              <div key={i} className="text-sm border-b border-border pb-2 last:border-0 last:pb-0">
                                <p className="font-medium text-muted-foreground">{entry.reviewer} · {entry.level}</p>
                                <p className="text-xs text-muted-foreground mt-0.5">{entry.date}</p>
                                <p className="mt-1 leading-snug">{entry.reason}</p>
                              </div>
                            ))}
                          </div>
                        </ScrollArea>
                      </div>
                    </PopoverContent>
                  </Popover>
                  <span className="relative inline-block h-4 w-4 shrink-0">
                  <Shield className="h-4 w-4 fill-blue-500 text-blue-500" />
                  <Check className="absolute inset-0 m-auto h-2.5 w-2.5 text-white" strokeWidth={3} />
                </span>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 w-7 p-0"
                        aria-label="More options"
                      >
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => {
                        setRevokedRows((prev) => {
                          const newSet = new Set(prev);
                          newSet.delete(row.id);
                          return newSet;
                        });
                      }}>
                        Change Action
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => {
                        const userIndex = parseInt(row.id.replace('row-', '')) - 1;
                        const user = sampleUsers[userIndex % sampleUsers.length] || sampleUsers[0];
                        const userName = `${user.firstName} ${user.lastName}`;
                        setRevokingRow({ id: row.id, userName, rowData: row });
                        setRevokeDialogOpen(true);
                        setShowRevokeReasonError(false);
                      }}>
                        Edit Comment
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => {
                          setReviewHistoryPanelRowId(row.id);
                          setReviewHistoryPanelOpen(true);
                        }}
                      >
                        View Review History
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              );
            }
            
            if (modifiedRows.has(row.id)) {
              return (
                <div className="flex items-center gap-2">
                  <Badge className="bg-yellow-100 text-yellow-700 border-transparent text-sm px-3 py-1">
                    <Pencil className="h-3.5 w-3.5 mr-1.5" />
                    Modified
                  </Badge>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-7 w-7 p-0" aria-label="View reviewer comments">
                        <MessageSquare className="h-4 w-4 text-muted-foreground" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent align="end" className="w-80">
                      <div className="space-y-3">
                        <p className="font-medium text-sm">Reviewer comments</p>
                        <ScrollArea className="max-h-[240px] pr-2">
                          <div className="space-y-3">
                            {getReviewHistoryForRow(row.id).map((entry, i) => (
                              <div key={i} className="text-sm border-b border-border pb-2 last:border-0 last:pb-0">
                                <p className="font-medium text-muted-foreground">{entry.reviewer} · {entry.level}</p>
                                <p className="text-xs text-muted-foreground mt-0.5">{entry.date}</p>
                                <p className="mt-1 leading-snug">{entry.reason}</p>
                              </div>
                            ))}
                          </div>
                        </ScrollArea>
                      </div>
                    </PopoverContent>
                  </Popover>
                  <span className="relative inline-block h-4 w-4 shrink-0">
                  <Shield className="h-4 w-4 fill-blue-500 text-blue-500" />
                  <Check className="absolute inset-0 m-auto h-2.5 w-2.5 text-white" strokeWidth={3} />
                </span>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 w-7 p-0"
                        aria-label="More options"
                      >
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => {
                        setModifiedRows((prev) => {
                          const newSet = new Set(prev);
                          newSet.delete(row.id);
                          return newSet;
                        });
                      }}>
                        Change Action
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => {
                        const userIndex = parseInt(row.id.replace('row-', '') || '1') - 1;
                        const user = sampleUsers[userIndex % sampleUsers.length] || sampleUsers[0];
                        const userName = `${user.firstName} ${user.lastName}`;
                        setModifyingRow({ id: row.id, userName, rowData: row });
                        setModifyDialogOpen(true);
                        setShowModifyReasonError(false);
                      }}>
                        Edit Comment
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => {
                          setReviewHistoryPanelRowId(row.id);
                          setReviewHistoryPanelOpen(true);
                        }}
                      >
                        View Review History
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              );
            }
            
            const match = row.col8?.match(/(\d+)%/);
            const percent = match ? parseInt(match[1]) : 0;
            const userCount = parseInt((row.col7 || '0').replace(/,/g, '')) || 0;
            const records = Math.floor((percent / 100) * userCount);
            const rowIndex = parseInt(row.id.replace('row-', '')) - 1;
            
            const insights = generateInsightsForRow(rowIndex >= 0 ? rowIndex : 0, records);
            const riskLevel = (row.riskLevel || 'Medium').toString();
            const recommendedAction = getRecommendedAction(insights, riskLevel);
            
            return (
              <div className="flex items-center gap-2">
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="h-7 w-7 p-0 flex items-center justify-center bg-green-100 hover:bg-green-200 border-green-300"
                  title="Certify"
                  aria-label="Certify"
                  onClick={() => handleCertifyClick(row)}
                >
                  <CheckCircle className={`h-4 w-4 text-green-600`} style={{ opacity: recommendedAction === 'Certify' ? 1 : 0.6 }} />
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="h-7 w-7 p-0 flex items-center justify-center bg-red-100 hover:bg-red-200 border-red-300"
                  title="Revoke"
                  aria-label="Revoke"
                  onClick={() => handleRevokeClick(row)}
                >
                  <XCircle className={`h-4 w-4 text-red-600`} style={{ opacity: recommendedAction === 'Revoke' ? 1 : 0.6 }} />
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="h-7 w-7 p-0 flex items-center justify-center bg-yellow-100 hover:bg-yellow-200 border-yellow-300"
                  title="Modify"
                  aria-label="Modify"
                  onClick={() => handleModifyClick(row)}
                >
                  <Pencil className={`h-4 w-4 text-yellow-600`} style={{ opacity: recommendedAction === 'Modify' ? 1 : 0.6 }} />
                </Button>
              </div>
            );
          }}
          customRowClassName={getRowClassName}
          bulkActionMenu={
            selectedRows.size > 0 ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="default" size="sm">
                    <UserCog className="h-4 w-4 mr-2" />
                    Bulk Actions ({selectedRows.size})
                    <ChevronDown className="h-4 w-4 ml-2" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger>Review action</DropdownMenuSubTrigger>
                    <DropdownMenuSubContent>
                      <DropdownMenuItem onClick={() => toast.info('Bulk Certify selected')}>
                        <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                        Certify
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => toast.info('Bulk Revoke selected')}>
                        <XCircle className="h-4 w-4 mr-2 text-red-600" />
                        Revoke
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => toast.info('Bulk Modify selected')}>
                        <Pencil className="h-4 w-4 mr-2 text-yellow-600" />
                        Modify
                      </DropdownMenuItem>
                    </DropdownMenuSubContent>
                  </DropdownMenuSub>
                  <DropdownMenuItem onClick={handleReassignClick}>
                    Reassign Reviewer
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : undefined
          }
        />
        <Dialog open={certifyDialogOpen} onOpenChange={(open) => {
          setCertifyDialogOpen(open);
          if (!open) {
            setCertifyReason('');
            setCertifyingRow(null);
            setShowReasonError(false);
          }
        }}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Certify Access</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="certify-reason">
                  Reason <span className="text-destructive">*</span>
                </Label>
                <Textarea
                  ref={textareaRef}
                  id="certify-reason"
                  placeholder="Enter the reason for certification..."
                  value={certifyReason}
                  onChange={(e) => {
                    setCertifyReason(e.target.value);
                    if (showReasonError && e.target.value.trim()) {
                      setShowReasonError(false);
                    }
                  }}
                  className="min-h-[100px]"
                />
                {showReasonError && !certifyReason.trim() && (
                  <p className="text-sm text-destructive">Reason is required</p>
                )}
                {certifyingRow?.rowData && (
                  <div className="space-y-2 pt-2">
                    <p className="text-xs font-normal text-muted-foreground">Quick comments</p>
                    <ul className="space-y-1.5">
                      {generateQuickComments(certifyingRow.rowData).map((comment, index) => (
                        <li
                          key={index}
                          className="group flex items-center justify-between rounded-md border border-border bg-background px-3 py-2 text-xs hover:bg-accent hover:text-accent-foreground cursor-pointer transition-colors"
                          onClick={() => handleQuickCommentClick(comment)}
                        >
                          <span className="flex-1">{comment}</span>
                          <button
                            className="ml-2 rounded-sm p-1 hover:bg-muted opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleCopyComment(comment);
                            }}
                            title="Copy comment"
                          >
                            <Copy className="h-3.5 w-3.5" />
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={handleCertifyCancel}>
                Cancel
              </Button>
              <Button 
                onClick={handleCertifyConfirm}
                className="bg-green-600 hover:bg-green-700"
              >
                Certify
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <Dialog open={revokeDialogOpen} onOpenChange={(open) => {
          setRevokeDialogOpen(open);
          if (!open) {
            setRevokeReason('');
            setRevokingRow(null);
            setShowRevokeReasonError(false);
          }
        }}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Revoke Access</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="revoke-reason">
                  Reason <span className="text-destructive">*</span>
                </Label>
                <Textarea
                  ref={revokeTextareaRef}
                  id="revoke-reason"
                  placeholder="Enter the reason for revocation..."
                  value={revokeReason}
                  onChange={(e) => {
                    setRevokeReason(e.target.value);
                    if (showRevokeReasonError && e.target.value.trim()) {
                      setShowRevokeReasonError(false);
                    }
                  }}
                  className="min-h-[100px]"
                />
                {showRevokeReasonError && !revokeReason.trim() && (
                  <p className="text-sm text-destructive">Reason is required</p>
                )}
                {revokingRow?.rowData && (
                  <div className="space-y-2 pt-2">
                    <p className="text-xs font-normal text-muted-foreground">Quick comments</p>
                    <ul className="space-y-1.5">
                      {generateRevokeQuickComments(revokingRow.rowData).map((comment, index) => (
                        <li
                          key={index}
                          className="group flex items-center justify-between rounded-md border border-border bg-background px-3 py-2 text-xs hover:bg-accent hover:text-accent-foreground cursor-pointer transition-colors"
                          onClick={() => handleRevokeQuickCommentClick(comment)}
                        >
                          <span className="flex-1">{comment}</span>
                          <button
                            className="ml-2 rounded-sm p-1 hover:bg-muted opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleCopyComment(comment);
                            }}
                            title="Copy comment"
                          >
                            <Copy className="h-3.5 w-3.5" />
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={handleRevokeCancel}>
                Cancel
              </Button>
              <Button 
                onClick={handleRevokeConfirm}
                className="bg-red-600 hover:bg-red-700"
              >
                Revoke
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <Dialog open={modifyDialogOpen} onOpenChange={(open) => {
          setModifyDialogOpen(open);
          if (!open) {
            setModifyReason('');
            setModifyingRow(null);
            setShowModifyReasonError(false);
          }
        }}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Modify Access</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="modify-reason">
                  Reason <span className="text-destructive">*</span>
                </Label>
                <Textarea
                  ref={modifyTextareaRef}
                  id="modify-reason"
                  placeholder="Enter the reason for modification..."
                  value={modifyReason}
                  onChange={(e) => {
                    setModifyReason(e.target.value);
                    if (showModifyReasonError && e.target.value.trim()) {
                      setShowModifyReasonError(false);
                    }
                  }}
                  className="min-h-[100px]"
                />
                {showModifyReasonError && !modifyReason.trim() && (
                  <p className="text-sm text-destructive">Reason is required</p>
                )}
                {modifyingRow?.rowData && (
                  <div className="space-y-2 pt-2">
                    <p className="text-xs font-normal text-muted-foreground">Quick comments</p>
                    <ul className="space-y-1.5">
                      {generateModifyQuickComments(modifyingRow.rowData).map((comment, index) => (
                        <li
                          key={index}
                          className="group flex items-center justify-between rounded-md border border-border bg-background px-3 py-2 text-xs hover:bg-accent hover:text-accent-foreground cursor-pointer transition-colors"
                          onClick={() => handleModifyQuickCommentClick(comment)}
                        >
                          <span className="flex-1">{comment}</span>
                          <button
                            className="ml-2 rounded-sm p-1 hover:bg-muted opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleCopyComment(comment);
                            }}
                            title="Copy comment"
                          >
                            <Copy className="h-3.5 w-3.5" />
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={handleModifyCancel}>
                Cancel
              </Button>
              <Button 
                onClick={handleModifyConfirm}
                className="bg-yellow-600 hover:bg-yellow-700"
              >
                Modify
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <Dialog open={reassignDialogOpen} onOpenChange={(open) => {
          if (!open) {
            setReassignDialogOpen(false);
            setSelectedNewReviewer('');
            setShowReviewerError(false);
          }
        }}>
          <DialogContent
            onKeyDown={(e) => {
              if (e.key === 'Enter' && selectedNewReviewer && !e.shiftKey) {
                e.preventDefault();
                handleReassignConfirm();
              }
            }}
            className="sm:max-w-[500px]"
          >
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <UserCog className="h-5 w-5" />
                Reassign Reviewer
              </DialogTitle>
              <DialogDescription>
                Reassign {selectedCountWhenDialogOpened} {selectedCountWhenDialogOpened === 1 ? 'record' : 'records'} to a new reviewer.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-3">
                <div className="space-y-2">
                  <Label htmlFor="reviewer-select">
                    Select Reviewer <span className="text-destructive">*</span>
                  </Label>
                  <div className="w-full">
                    <SearchableSelect
                      options={allReviewers}
                      value={selectedNewReviewer}
                      onValueChange={(value) => {
                        setSelectedNewReviewer(value);
                        if (showReviewerError && value) {
                          setShowReviewerError(false);
                        }
                      }}
                      placeholder="Select reviewer..."
                      searchPlaceholder="Search reviewers..."
                      emptyText="No reviewer found."
                      className="w-full"
                      popoverClassName="w-[300px]"
                    />
                  </div>
                  {showReviewerError && !selectedNewReviewer && (
                    <p className="text-sm text-destructive">Please select a reviewer</p>
                  )}
                </div>
              </div>
            </div>
            <DialogFooter className="gap-2">
              <Button variant="outline" onClick={handleReassignCancel}>
                Cancel
              </Button>
              <Button 
                onClick={handleReassignConfirm}
                disabled={!selectedNewReviewer}
                title={!selectedNewReviewer ? 'Please select a reviewer first' : ''}
              >
                Reassign
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <Sheet
          open={reviewHistoryPanelOpen}
          onOpenChange={(open) => {
            setReviewHistoryPanelOpen(open);
            if (!open) setReviewHistoryPanelRowId(null);
          }}
        >
          <SheetContent side="right" className="w-full sm:max-w-md">
            <SheetHeader>
              <SheetTitle>Review History</SheetTitle>
            </SheetHeader>
            {reviewHistoryPanelRowId && (
              <ScrollArea className="h-[calc(100vh-8rem)] mt-4 pr-4">
                <div className="space-y-4">
                  {getReviewHistoryForRow(reviewHistoryPanelRowId).map((entry, i) => (
                    <div
                      key={i}
                      className="rounded-lg border border-border bg-muted/30 p-3 space-y-2 text-sm"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-medium text-muted-foreground">{entry.level}</span>
                        <span className="text-xs text-muted-foreground">{entry.date}</span>
                      </div>
                      <p className="font-medium">{entry.reviewer}</p>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs text-muted-foreground">Decision:</span>
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
                      <p className="text-muted-foreground text-xs leading-relaxed">{entry.reason}</p>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            )}
          </SheetContent>
        </Sheet>
        <Toaster />
      </>
    );
  },
};
