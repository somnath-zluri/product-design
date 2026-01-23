import { UAR } from './UAR';

interface UAREmployeeModeProps {
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
}

export function UAREmployeeMode({
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
}: UAREmployeeModeProps) {
  return (
    <UAR
      className={className}
      controlsBelowTitle
      showVerticalStepper={false}
      showBreadcrumb={false}
      titleOverride={titleOverride ?? "Quaterly Access Review (Q1 FY'26)"}
      showLeftPanel={false}
      showTableControls={false}
      showTable={false}
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
      hideAppIncludedColumn={hideAppIncludedColumn}
      hideUsersIncludedColumn={hideUsersIncludedColumn}
      showRiskScoreColumn={showRiskScoreColumn}
      showTimeRemainingColumn={true}
    />
  );
}
