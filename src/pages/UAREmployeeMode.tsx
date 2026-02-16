import { UAR } from './UAR';

interface UAREmployeeModeProps {
  className?: string;
  titleOverride?: string;
  showBackButton?: boolean;
  onBackClick?: () => void;
  breadcrumbParentLabel?: string;
  breadcrumbParentHref?: string;
  showDeadlineCard?: boolean;
  showHeaderDescription?: boolean;
  deadlineCardPosition?: 'left' | 'right' | 'header';
  headerLayout?: 'default' | 'inline';
  headerBadgeLabel?: string;
  hideTimelineColumn?: boolean;
  hideInsightsColumn?: boolean;
  showRadioTabs?: boolean;
  /** When true, omit the border below the dashboard cards (Dashboard 1.3). */
  hideBorderBelowCards?: boolean;
  /** Show "Entities" column (Users, Applications, Groups) in dashboard cards row. Dashboard 1.2 only. */
  showEntitiesColumn?: boolean;
  /** When true, show the data table below the cards (e.g. Dashboard 1.2). */
  showTable?: boolean;
  /** When true, show table toolbar (Filters, View by, pagination). */
  showTableControls?: boolean;
  /** When true, show entity column in the data table (between Owner and Time remaining). */
  showEntityColumn?: boolean;
  /** Entity column header (e.g. "entity"). */
  entityColumnLabel?: string;
  /** Entity column cell value for all rows (e.g. "A"). */
  entityColumnValue?: string;
  /** When true, show exact date as secondary info in Time remaining column (Dashboard 1.3 only). */
  showTimeRemainingDate?: boolean;
  /** When true, show "X of Y reviewed" progress bar below cards (Dashboard 1.3 only). */
  showReviewedProgressBar?: boolean;
  reviewedProgressCompleted?: number;
  reviewedProgressTotal?: number;
  hideAppIncludedColumn?: boolean;
  hideUsersIncludedColumn?: boolean;
  showRiskScoreColumn?: boolean;
  hideViewByFilter?: boolean;
  hideSortByFilter?: boolean;
  hideButtonGroup?: boolean;
}

export function UAREmployeeMode({
  className,
  titleOverride,
  showBackButton,
  onBackClick,
  breadcrumbParentLabel,
  breadcrumbParentHref,
  showDeadlineCard,
  showHeaderDescription,
  deadlineCardPosition,
  headerLayout,
  headerBadgeLabel,
  hideTimelineColumn,
  hideInsightsColumn,
  showRadioTabs,
  hideBorderBelowCards,
  showEntitiesColumn,
  showTable = false,
  showTableControls = false,
  showEntityColumn = false,
  entityColumnLabel,
  entityColumnValue,
  showTimeRemainingDate = false,
  showReviewedProgressBar = false,
  reviewedProgressCompleted = 0,
  reviewedProgressTotal = 0,
  hideAppIncludedColumn,
  hideUsersIncludedColumn,
  showRiskScoreColumn,
  hideViewByFilter,
  hideSortByFilter,
  hideButtonGroup,
}: UAREmployeeModeProps) {
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
      showLeftPanel={false}
      showTableControls={showTableControls}
      showTable={showTable}
      showHorizontalStepper={false}
      showRadioCard
      showDeadlineCard={showDeadlineCard ?? true}
      showHeaderSummary={false}
      showHeaderDescription={showHeaderDescription ?? true}
      deadlineCardPosition={deadlineCardPosition}
      headerLayout={headerLayout}
      headerBadgeLabel={headerBadgeLabel}
      hideTimelineColumn={hideTimelineColumn}
      hideInsightsColumn={hideInsightsColumn}
      showRadioTabs={showRadioTabs}
      hideBorderBelowCards={hideBorderBelowCards}
      showEntitiesColumn={showEntitiesColumn}
      showEntityColumn={showEntityColumn}
      entityColumnLabel={entityColumnLabel}
      entityColumnValue={entityColumnValue}
      showTimeRemainingDate={showTimeRemainingDate}
      showReviewedProgressBar={showReviewedProgressBar}
      reviewedProgressCompleted={reviewedProgressCompleted}
      reviewedProgressTotal={reviewedProgressTotal}
      hideAppIncludedColumn={hideAppIncludedColumn}
      hideUsersIncludedColumn={hideUsersIncludedColumn}
      showRiskScoreColumn={showRiskScoreColumn}
      showTimeRemainingColumn={true}
      hideViewByFilter={hideViewByFilter}
      hideSortByFilter={hideSortByFilter}
      hideButtonGroup={hideButtonGroup}
    />
  );
}
