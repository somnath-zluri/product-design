# Design QA: Overview Card

**Component:** `OverviewCard` (`src/components/ui/overview-card.tsx`)  
**Usage:** Record Overview 1.3 story only. A second card, `ApplicationRecommendationsCard` (app + reviewer + Recommendations tabs and body slot), is shown below the Overview Card in Record Overview 1.3 only (`src/components/ui/application-recommendations-card.tsx`).  
**Sample props:** `totalCount={50}` `certifiedCount={12}` `revokedCount={12}` `modifiedCount={11}` `daysLeft={12}` `reviewerNames={[...]}`

---

## 1. Design spec alignment

| Requirement | Status | Notes |
|-------------|--------|--------|
| One card, three zones | ✅ Pass | Users (donut + legend), Reviewers (avatars), Days left |
| Users: donut + total + legend (Certified / Revoked / Modified / Not Reviewed) | ✅ Pass | Pie chart with innerRadius (donut), "Users" + count row, four status rows with colored dots |
| Color semantics: green / red / orange / grey | ✅ Pass | Certified=green, Revoked=red, Modified=orange, Not Reviewed=grey (HSL in code) |
| Reviewers: avatar stack + label | ✅ Pass | Up to 5 avatars with overlap (-space-x-2), "Reviewers" below |
| Days left: large number + label | ✅ Pass | Bold number, "Days left" below |
| Rounded container, light border | ✅ Pass | `rounded-lg border border-border bg-background` |
| Three columns, vertical dividers | ✅ Pass | `border-r border-border` between zones |
| Equal width columns | ✅ Pass | All three zones use `flex-1 min-w-0` |
| Dense but scannable | ✅ Pass | Compact padding (p-4), clear hierarchy (size/weight) |

---

## 2. Layout and alignment

| Check | Status | Notes |
|-------|--------|--------|
| Part 1: "Users" and total on one line (Users left, count right) | ✅ Pass | `flex justify-between` on header row |
| Part 1: Legend rows – status left, count (pct%) right | ✅ Pass | `justify-between` per row, tabular-nums on counts |
| Part 1: Donut vertically centered with text block | ✅ Pass | Zone uses `items-center` |
| Part 2: Avatars and "Reviewers" centered | ✅ Pass | `justify-center items-center` |
| Part 3: Number and "Days left" centered | ✅ Pass | `justify-center items-center` |
| Dividers between zones | ✅ Pass | `border-r` on first and second zones; last zone has no trailing border |
| Horizontal padding / spacing | ✅ Pass | `gap-4` between zones; pr-4 / px-4 on zones |

---

## 3. Content and data

| Check | Status | Notes |
|-------|--------|--------|
| Total = sum of four statuses | ✅ Pass | `notReviewedCount = totalCount - certified - revoked - modified` |
| Percentages sum to 100% | ✅ Pass | Derived from counts; rounding may show 99% or 101% in edge cases |
| Donut hides zero-value segments | ✅ Pass | `pieData` filtered by `value > 0` |
| Legend always shows all four statuses | ✅ Pass | `items` array is fixed (Certified, Revoked, Modified, Not Reviewed) |
| Reviewer list capped (e.g. 5) | ✅ Pass | `reviewerNames.slice(0, 5)` |
| Initials from full name | ✅ Pass | `getInitialsFromName` handles multi-word names |

---

## 4. Design system and tokens

| Check | Status | Notes |
|-------|--------|--------|
| Uses design system primitives | ✅ Pass | Avatar, AvatarFallback, ChartContainer (chart.tsx), border/radius/spacing |
| Status colors | ⚠️ Review | Green/red/orange/grey are hardcoded HSL. Consider moving to theme (e.g. semantic tokens) if design system defines them |
| Text: foreground / muted-foreground | ✅ Pass | Labels use `text-muted-foreground`, numbers use `text-foreground` |
| Border and background | ✅ Pass | `border-border`, `bg-background` |
| No one-off font sizes (beyond scale) | ✅ Pass | text-xs, text-base, text-2xl, text-3xl used consistently |

---

## 5. Accessibility

| Check | Status | Notes |
|-------|--------|--------|
| Semantic structure | ⚠️ Improve | Root is a plain `div`. Consider `<section>` or `role="region"` and `aria-label="Overview summary"` for the card |
| Donut chart | ⚠️ Improve | No `aria-label` or live region for chart; consider announcing e.g. "50 users: 12 certified, 12 revoked, 11 modified, 15 not reviewed" for screen readers |
| Status legend | ✅ Pass | List (`<ul>`/`<li>`) is present; color is redundant with text label |
| Avatars | ⚠️ Improve | No `aria-label` or title on avatar stack (e.g. "Reviewers: Somnath Nabajja, Mithilesh Hari, …") |
| Days left | ✅ Pass | Number and label are readable and in order |
| Color contrast | ✅ Pass | Foreground on background; status dots are supplementary to text |

---

## 6. Edge cases and robustness

| Check | Status | Notes |
|-------|--------|--------|
| totalCount = 0 | ✅ Pass | Percentages 0; donut empty (no segments); legend shows 0 (0%) |
| All counts zero except Not Reviewed | ✅ Pass | Donut has one segment (grey); legend correct |
| Very large total (e.g. 10000) | ✅ Pass | tabular-nums keeps alignment; no layout assumptions on digit count |
| Empty reviewerNames | ✅ Pass | No avatars; "Reviewers" label still shown |
| Long reviewer name | ✅ Pass | Initials only; no truncation needed in avatar |
| daysLeft negative | ⚠️ Optional | No handling; consider showing 0 or "Overdue" if design specifies |

---

## 7. Summary

- **Visual and layout:** Matches spec (three equal columns, donut + legend, avatar stack, days left, alignment and dividers).
- **Design system:** Uses shared components and tokens; status colors are hardcoded and could be aligned with theme later.
- **Accessibility:** Add semantics (region/label) and optional screen-reader summary for donut and reviewers.
- **Edge cases:** Behavior is sound; optional improvement for negative `daysLeft`.

**Recommended follow-ups (optional):**

1. Add `role="region"` and `aria-label="Overview summary"` (or similar) to the card root.
2. Add an `aria-label` or visually hidden summary for the donut (e.g. totals by status).
3. Add an `aria-label` to the reviewer avatar group (e.g. list of names).
4. Consider theme tokens for Certified/Revoked/Modified/Not Reviewed colors.
5. If product requires it, handle negative `daysLeft` (e.g. show 0 or "Overdue").
