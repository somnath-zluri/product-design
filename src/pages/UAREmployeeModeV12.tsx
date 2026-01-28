import type { ReactNode } from 'react';
import { UAR } from './UAR';

interface UAREmployeeModeV12Props {
  className?: string;
  titleOverride?: string;
  showDeadlineCard?: boolean;
  showHeaderDescription?: boolean;
  deadlineCardPosition?: 'left' | 'right' | 'header';
  headerLayout?: 'default' | 'inline';
  headerBadgeLabel?: string;
  hideTimelineColumn?: boolean;
  hideInsightsColumn?: boolean;
  showRadioTabs?: boolean;
  hideAppIncludedColumn?: boolean;
  hideUsersIncludedColumn?: boolean;
  showRiskScoreColumn?: boolean;
  sidebarHasTabs?: boolean;
  showLeftPanel?: boolean;
  firstColumnHeader?: string;
  hideUsersTab?: boolean;
  hideTabBadges?: boolean;
  hideOwnerColumn?: boolean;
  hideProgressColumn?: boolean;
  customActionColumn?: (row: any) => ReactNode;
  customFirstColumnCell?: (row: any) => ReactNode;
  customCurrentReviewerCell?: (row: any) => ReactNode;
  riskColumnHeader?: string;
  hideRiskGauge?: boolean;
  insightsColumnHeader?: string;
  showInsightsBadgeOnly?: boolean;
  freezeFirstColumn?: boolean;
  firstColumnWidth?: number;
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
  showCurrentReviewerColumn?: boolean;
  showTwoButtonGroup?: boolean;
  firstButtonLabel?: string;
  secondButtonLabel?: string;
  groupsTabLabel?: string;
  showInsightsFilter?: boolean;
  showSignOffButton?: boolean;
  getRowReviewStatus?: (row: any) => 'pending' | 'reviewed' | 'signed-off';
  showSuggestedActionColumn?: boolean;
  hideInsightPopoverRecommendedAction?: boolean;
  showInsightPopoverDescriptionColumn?: boolean;
  hideSuggestedActionBadgeOutline?: boolean;
  filledSparkleIcon?: boolean;
  selectedRows?: Set<string>;
  onSelectAll?: (checked: boolean) => void;
  onRowSelect?: (rowId: string, checked: boolean) => void;
  showPaginationCTA?: boolean;
  paginationCTALabel?: string;
  onPaginationCTAClick?: () => void;
  externalSelectTrigger?: 'select-all' | 'deselect-all' | null;
  customRowClassName?: (row: any) => string | undefined;
  bulkActionMenu?: ReactNode;
}

export function UAREmployeeModeV12({
  className,
  titleOverride,
  showDeadlineCard,
  showHeaderDescription,
  deadlineCardPosition,
  headerLayout,
  headerBadgeLabel,
  hideTimelineColumn,
  hideInsightsColumn,
  showRadioTabs,
  hideAppIncludedColumn,
  hideUsersIncludedColumn,
  showRiskScoreColumn,
  sidebarHasTabs,
  showLeftPanel = true,
  firstColumnHeader,
  hideUsersTab,
  hideTabBadges,
  hideOwnerColumn,
  hideProgressColumn,
  customActionColumn,
  customFirstColumnCell,
  customCurrentReviewerCell,
  riskColumnHeader,
  hideRiskGauge,
  insightsColumnHeader,
  showInsightsBadgeOnly,
  freezeFirstColumn,
  firstColumnWidth,
  hideViewByFilter,
  hideSortByFilter,
  initialSortColumn,
  initialSortDirection,
  customSortByUser,
  sampleUsersForSorting,
  searchPlaceholder,
  showStatusColumn,
  customStatusValues,
  showReviewerLevelColumn,
  showCurrentReviewerColumn,
  showTwoButtonGroup,
  firstButtonLabel,
  secondButtonLabel,
  groupsTabLabel,
  showInsightsFilter,
  showSignOffButton,
  getRowReviewStatus,
  showSuggestedActionColumn,
  hideInsightPopoverRecommendedAction,
  showInsightPopoverDescriptionColumn,
  hideSuggestedActionBadgeOutline,
  filledSparkleIcon,
  selectedRows,
  onSelectAll,
  onRowSelect,
  showPaginationCTA,
  paginationCTALabel,
  onPaginationCTAClick,
  externalSelectTrigger,
  customRowClassName,
  bulkActionMenu,
}: UAREmployeeModeV12Props) {
  return (
    <UAR
      className={className}
      controlsBelowTitle
      showVerticalStepper={false}
      showBreadcrumb={false}
      titleOverride={titleOverride ?? "Quaterly Access Review (Q1 FY'26)"}
      showLeftPanel={showLeftPanel}
      showTableControls={false}
      showTable={false}
      showHorizontalStepper={false}
      showRadioCard={false}
      showDeadlineCard={showDeadlineCard ?? true}
      showHeaderSummary={false}
      showHeaderDescription={showHeaderDescription ?? true}
      moveHeaderDetailsToSidebar
      sidebarHasTabs={sidebarHasTabs}
      deadlineCardPosition={deadlineCardPosition}
      headerLayout={headerLayout}
      headerBadgeLabel={headerBadgeLabel}
      hideTimelineColumn={hideTimelineColumn}
      hideInsightsColumn={hideInsightsColumn}
      showRadioTabs={showRadioTabs}
      hideAppIncludedColumn={hideAppIncludedColumn ?? true}
      hideUsersIncludedColumn={hideUsersIncludedColumn}
      showRiskScoreColumn={showRiskScoreColumn}
      firstColumnHeader={firstColumnHeader ?? "Application"}
      hideUsersTab={hideUsersTab}
      hideTabBadges={hideTabBadges}
      hideOwnerColumn={hideOwnerColumn}
      hideProgressColumn={hideProgressColumn}
      customActionColumn={customActionColumn}
      customFirstColumnCell={customFirstColumnCell}
      customCurrentReviewerCell={customCurrentReviewerCell}
      riskColumnHeader={riskColumnHeader}
      hideRiskGauge={hideRiskGauge}
      insightsColumnHeader={insightsColumnHeader}
      showInsightsBadgeOnly={showInsightsBadgeOnly}
      freezeFirstColumn={freezeFirstColumn}
      firstColumnWidth={firstColumnWidth?.toString()}
      hideViewByFilter={hideViewByFilter}
      hideSortByFilter={hideSortByFilter}
      initialSortColumn={initialSortColumn}
      initialSortDirection={initialSortDirection}
      customSortByUser={customSortByUser}
      sampleUsersForSorting={sampleUsersForSorting}
      searchPlaceholder={searchPlaceholder}
      showStatusColumn={showStatusColumn}
      customStatusValues={customStatusValues}
      showReviewerLevelColumn={showReviewerLevelColumn}
      showCurrentReviewerColumn={showCurrentReviewerColumn}
      showTwoButtonGroup={showTwoButtonGroup}
      firstButtonLabel={firstButtonLabel}
      secondButtonLabel={secondButtonLabel}
      groupsTabLabel={groupsTabLabel}
      showInsightsFilter={showInsightsFilter}
      showSignOffButton={showSignOffButton}
      getRowReviewStatus={getRowReviewStatus}
      showSuggestedActionColumn={showSuggestedActionColumn}
      hideInsightPopoverRecommendedAction={hideInsightPopoverRecommendedAction}
      showInsightPopoverDescriptionColumn={showInsightPopoverDescriptionColumn}
      hideSuggestedActionBadgeOutline={hideSuggestedActionBadgeOutline}
      filledSparkleIcon={filledSparkleIcon}
      selectedRows={selectedRows}
      onSelectAll={onSelectAll}
      onRowSelect={onRowSelect}
      showPaginationCTA={showPaginationCTA}
      paginationCTALabel={paginationCTALabel}
      onPaginationCTAClick={onPaginationCTAClick}
      externalSelectTrigger={externalSelectTrigger}
      customRowClassName={customRowClassName}
      bulkActionMenu={bulkActionMenu}
    />
  );
}
