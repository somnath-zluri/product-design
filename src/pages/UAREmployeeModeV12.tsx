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
}: UAREmployeeModeV12Props) {
  return (
    <UAR
      className={className}
      controlsBelowTitle
      showVerticalStepper={false}
      showBreadcrumb={false}
      titleOverride={titleOverride ?? "Quaterly Access Review (Q1 FY'26)"}
      showLeftPanel
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
      firstColumnHeader="Application"
      enableExpandedRowDatatable={true}
    />
  );
}
