# Design QA: User Access Details Sheet

**Component:** `UserAccessDetailsSheet` (`src/components/ui/user-access-details-sheet.tsx`)  
**Usage:** Record Overview 1.1 and Record Overview 1.3 in `uar-employee-mode.stories.tsx`. Opens when the user clicks a row or "View Review History" to show deeper information for a record.  
**Data:** Provided by `getSheetDataForRow(rowId)` returning `UserAccessDetailsSheetData` (userName, role, email, department, accessDetails, insight, suggestedAction, riskLevel, reviewHistory).

---

## 1. Layout and alignment

| Check | Status | Notes |
|-------|--------|--------|
| Header and body horizontal alignment | ✅ Fixed | Body scroll area now uses `px-4 pb-6` so content aligns with `SheetHeader` (pl-4 pr-4). Previously body had only `pr-4`, causing misalignment. |
| Scroll area height | ✅ Pass | `h-[calc(100vh-8rem)]` approximates viewport minus header; 8rem is a safe upper bound for sheet header + chrome. |
| Section spacing | ✅ Pass | `space-y-6` between sections; section headings use `mb-2`. |
| Bottom padding when scrolling | ✅ Pass | `pb-6` on ScrollArea so last section doesn’t sit flush against the bottom. |

---

## 2. Typography and content

| Check | Status | Notes |
|-------|--------|--------|
| Section headings | ✅ Pass | All sections use `text-sm font-semibold text-foreground mb-2`. |
| Long user name / role in header | ✅ Pass | `break-words` on SheetTitle and role; `min-w-0` on SheetHeader to allow shrinking. |
| Long email | ✅ Pass | Email uses `break-all` so long addresses wrap; container has `min-w-0`. |
| Long department / reason | ✅ Pass | Department and review reason use `break-words` / `leading-relaxed` where needed. |
| Risk badge semantics | ✅ Pass | High=red, Medium=amber, Low=green with appropriate background and text classes. |

---

## 3. Empty and edge states

| Check | Status | Notes |
|-------|--------|--------|
| Access Details empty | ✅ Fixed | When `accessDetails.length === 0`, shows "No access details" instead of blank space. |
| Review History empty | ✅ Fixed | When `reviewHistory.length === 0`, shows "No review history yet" instead of blank space. |
| Insights optional | ✅ Pass | Insights section only renders when `data.insight` is truthy. |
| No data (rowId null) | ✅ Pass | When `rowId` is null, only the sheet chrome renders; no content. |

---

## 4. Design system and consistency

| Check | Status | Notes |
|-------|--------|--------|
| Sheet primitives | ✅ Pass | Uses `Sheet`, `SheetContent`, `SheetHeader`, `SheetTitle` from `@/components/ui/sheet`. |
| Alert variants | ✅ Pass | Insights use `variant="destructive"`, AI Recommendation uses `variant="information"`; icons align with Alert’s `[&>svg]` positioning. |
| Badge and Button | ✅ Pass | Risk and decision badges use semantic colors; Quick Actions use default, destructive, and outline variants. |
| ScrollArea | ✅ Pass | Uses `ScrollArea` for the body; no custom scroll styling. |
| Token usage | ✅ Pass | `text-foreground`, `text-muted-foreground`, `border-border`, `bg-muted/30` used consistently. |

---

## 5. Accessibility

| Check | Status | Notes |
|-------|--------|--------|
| Sheet focus | ✅ Pass | Radix Sheet manages focus trap and return on open/close. |
| Section structure | ✅ Pass | Sections use `<section>` and `<h3>` for hierarchy. |
| Alerts | ✅ Pass | Alert has `role="alert"`; title/description are semantic. |
| Close button | ✅ Pass | Sheet close control has `sr-only` "Close" text. |
| Color contrast | ⚠️ Review | Badge colors (e.g. red/amber/green) should be checked in dark mode if the app supports it; no `dark:` overrides in component. |

---

## 6. Interaction and UX

| Check | Status | Notes |
|-------|--------|--------|
| Quick Actions | ⚠️ Note | Buttons are present but have no `onClick` handlers; parent can add behavior or component could accept optional callbacks. |
| Scroll behavior | ✅ Pass | Only the body scrolls; header stays fixed (SheetHeader is sticky in the base Sheet). |
| Dense but scannable | ✅ Pass | Sections are clearly separated; icons (Mail, Briefcase, Lightbulb, UserMinus) support quick scanning. |

---

## 7. Summary of changes made during QA

1. **Alignment:** Scroll body given `px-4 pb-6` so it aligns with the header and has bottom padding.
2. **Empty states:** Access Details and Review History show short empty-state copy when their lists are empty.
3. **Long content:** Header (name, role) and user info (email, department) use `break-words` / `break-all` and `min-w-0` to avoid overflow.

---

## 8. Optional follow-ups

- **Quick Actions:** Add optional props (e.g. `onApprove`, `onRevoke`, `onModify`) so the sheet can trigger actions without the parent re-implementing the buttons.
- **Dark mode:** If the design system uses dark theme, add or verify `dark:` classes for risk/decision badges.
- **Scroll height:** Consider deriving scroll height from the actual header height (e.g. CSS variable or ref) instead of `8rem` for pixel-perfect fit on all viewports.
