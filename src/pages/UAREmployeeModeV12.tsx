import type { ReactNode } from 'react';
import { UAR } from './UAR';

interface UAREmployeeModeV12Props {
  className?: string;
  titleOverride?: string;
  showBackButton?: boolean;
  onBackClick?: () => void;
  /** Breadcrumb above title: user lands here from a datatable on the parent page (e.g. "Access Reviews"). */
  breadcrumbParentLabel?: string;
  breadcrumbParentHref?: string;
  breadcrumbMiddleLabel?: string;
  breadcrumbMiddleHref?: string;
  onBreadcrumbParentClick?: () => void;
  onBreadcrumbMiddleClick?: () => void;
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
  /** When true, search box is the first item on the right side of the toolbar (e.g. Record Overview 1.3). */
  searchOnRight?: boolean;
  showStatusColumn?: boolean;
  customStatusValues?: Array<'Pending' | 'Certified' | 'Modified' | 'Revoked'>;
  showReviewerLevelColumn?: boolean;
  showCurrentReviewerColumn?: boolean;
  showTwoButtonGroup?: boolean;
  firstButtonLabel?: string;
  secondButtonLabel?: string;
  showReviewerProgressButton?: boolean;
  thirdButtonLabel?: string;
  groupsTabLabel?: string;
  hideButtonGroup?: boolean;
  showInsightsFilter?: boolean;
  showSignOffButton?: boolean;
  /** When showSignOffButton is true, optional progress for the bar adjacent to Sign-off (e.g. 250 of 500). */
  signOffProgressCompleted?: number;
  signOffProgressTotal?: number;
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
  /** Optional overview summary card (Record Overview 1.3 only). Rendered under header, above table. */
  overviewCard?: ReactNode;
  /** When set (e.g. 10), table body shows this many rows with fixed height and scrolls; viewport is not used (Record Overview 1.3). */
  tableBodyVisibleRows?: number;
  /** When set (e.g. 500), table body has this exact height in pixels (Record Overview 1.3). */
  tableBodyHeightPx?: number;
  /** When true, application body (overview + table + recommendations) scrolls as one; table has min 10 rows visible, no inner scroll (Record Overview 1.3). */
  scrollBodyWithTable?: boolean;
  /** When true, show the "Assign To Me" button in the toolbar (Record Overview 1.3 only). */
  showAssignToMeButton?: boolean;
  /** When set (e.g. 10), table shows this many rows per page (Record Overview 1.3). */
  tablePageSize?: number;
  onInsightCardActionClick?: (insight: { name: string; description: string; recommendedAction: 'Certify' | 'Modify' | 'Revoke' }, action: string) => void;
  /** When true, show "Entity." column in the data table (Users, Applications, Groups). */
  showEntityColumn?: boolean;
  /** When true, show the data table (default false for V12). */
  showTable?: boolean;
  /** When true, show table controls (Filters, View by, etc.). */
  showTableControls?: boolean;
  /** When true, the third view (e.g. View by users) shows empty content with "to be designed" centered (Certification Overview 1.3). */
  thirdViewPlaceholder?: boolean;
  /** Optional extra content in the left sidebar (e.g. "Reviewer Review Instructions" for Certification Overview 1.3). */
  sidebarExtraContent?: ReactNode;
  /** When true, show "X of Y records reviewed" progress bar in Progress column (Dashboard 1.3 pattern). */
  showReviewedProgressBar?: boolean;
  /** Completed count for reviewed progress (e.g. 250). */
  reviewedProgressCompleted?: number;
  /** Total count for reviewed progress (e.g. 500). */
  reviewedProgressTotal?: number;
  /** Label for reviewed progress bar (e.g. "records reviewed" or "Users Reviewed"). */
  reviewedProgressLabel?: string;
}

export function UAREmployeeModeV12({
  className,
  titleOverride,
  showBackButton,
  onBackClick,
  breadcrumbParentLabel,
  breadcrumbParentHref,
  breadcrumbMiddleLabel,
  breadcrumbMiddleHref,
  onBreadcrumbParentClick,
  onBreadcrumbMiddleClick,
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
  searchOnRight,
  showStatusColumn,
  customStatusValues,
  showReviewerLevelColumn,
  showCurrentReviewerColumn,
  showTwoButtonGroup,
  firstButtonLabel,
  secondButtonLabel,
  showReviewerProgressButton,
  thirdButtonLabel,
  groupsTabLabel,
  hideButtonGroup,
  showInsightsFilter,
  showSignOffButton,
  signOffProgressCompleted,
  signOffProgressTotal,
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
  overviewCard,
  tableBodyVisibleRows,
  tableBodyHeightPx,
  scrollBodyWithTable,
  showAssignToMeButton,
  tablePageSize,
  onInsightCardActionClick,
  showEntityColumn = false,
  showTable = false,
  showTableControls = false,
  thirdViewPlaceholder = false,
  sidebarExtraContent,
  showReviewedProgressBar = false,
  reviewedProgressCompleted = 0,
  reviewedProgressTotal = 0,
  reviewedProgressLabel,
}: UAREmployeeModeV12Props) {
  return (
    <UAR
      className={className}
      controlsBelowTitle
      showVerticalStepper={false}
      showBreadcrumb={false}
      titleOverride={titleOverride ?? "Quaterly Access Review (Q1 FY'26)"}
      showBackButton={showBackButton}
      onBackClick={onBackClick}
      breadcrumbParentLabel={breadcrumbParentLabel}
      breadcrumbParentHref={breadcrumbParentHref}
      breadcrumbMiddleLabel={breadcrumbMiddleLabel}
      breadcrumbMiddleHref={breadcrumbMiddleHref}
      onBreadcrumbParentClick={onBreadcrumbParentClick}
      onBreadcrumbMiddleClick={onBreadcrumbMiddleClick}
      showLeftPanel={showLeftPanel}
      showTableControls={showTableControls}
      showTable={showTable}
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
      searchOnRight={searchOnRight}
      showStatusColumn={showStatusColumn}
      customStatusValues={customStatusValues}
      showReviewerLevelColumn={showReviewerLevelColumn}
      showCurrentReviewerColumn={showCurrentReviewerColumn}
      showTwoButtonGroup={showTwoButtonGroup}
      firstButtonLabel={firstButtonLabel}
      secondButtonLabel={secondButtonLabel}
      showReviewerProgressButton={showReviewerProgressButton}
      thirdButtonLabel={thirdButtonLabel}
      groupsTabLabel={groupsTabLabel}
      hideButtonGroup={hideButtonGroup}
      showInsightsFilter={showInsightsFilter}
      showSignOffButton={showSignOffButton}
      signOffProgressCompleted={signOffProgressCompleted}
      signOffProgressTotal={signOffProgressTotal}
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
      overviewCard={overviewCard}
      tableBodyVisibleRows={tableBodyVisibleRows}
      tableBodyHeightPx={tableBodyHeightPx}
      scrollBodyWithTable={scrollBodyWithTable}
      showAssignToMeButton={showAssignToMeButton}
      tablePageSize={tablePageSize}
      onInsightCardActionClick={onInsightCardActionClick}
      showEntityColumn={showEntityColumn}
      thirdViewPlaceholder={thirdViewPlaceholder}
      sidebarExtraContent={sidebarExtraContent}
      showReviewedProgressBar={showReviewedProgressBar}
      reviewedProgressCompleted={reviewedProgressCompleted}
      reviewedProgressTotal={reviewedProgressTotal}
      reviewedProgressLabel={reviewedProgressLabel}
    />
  );
}
