# Planning & Session Notes

This document captures decisions, patterns, and guidance from our product-design session so they can be reused and shared.

---

## 1. Tagging Stories in Cursor Chat

### By file
- Use **`@`** in the chat input, then type the story **file name** (e.g. `request-form-builder.stories.tsx` or `uar-employee-mode.stories.tsx`) to bring that file into context.

### By story name (display name)
- Cursor does **not** resolve Storybook display names (e.g. "Record Overview 1.2"). The @ menu is driven by **file paths** and **code symbols** (exports), not by the `name` field in story meta.
- **Ways to refer to a story by “name”:**
  1. **File + natural language:** Reference the file with @ and in your message say e.g. “the story **Record Overview 1.2**” or “the Record Overview 1.2 story.”
  2. **Export (symbol) name:** If Cursor shows symbols, you can @ the story’s export (e.g. `@RecordOverviewV12Story`). The display name is only in the story’s `name` property in code.

### “Selected story” / current story
- There is no built-in “@ selected story” or “@ current story” in Cursor.
- **Workaround:** Have the story’s **file open** when you chat. Then you can say “the selected story,” “this story,” or “the story I have open” and the model will use the open file as context.

---

## 2. Story Versioning & Duplication

### Naming pattern in this repo
- **Display names:** `"Something 1.1"`, `"Something 1.2"`, `"Something 1.3"` (e.g. "Record Overview 1.2", "Request Form Builder 1.1").
- **Export names:** `SomethingV11Story`, `SomethingV12Story`, `SomethingV13Story` (e.g. `RecordOverviewV12Story`, `RequestFormBuilderV12Story`).

### How to ask for “another version” of a story
- **Minimal prompt:** “Create another version of the selected story.”
- **Interpretation:** Duplicate the current story in the **same file** as a new export; name it the next version using the file’s existing pattern (1.1 → 1.2, V11 → V12, etc.); do not change shared component code.
- **More explicit prompt (optional):**  
  “Duplicate the current story in this file and add a new story export. Rename the new story by following the version pattern used in this file (e.g. 1.2 → 1.3 and V12 → V13 for the export name). Keep the same component and args; only add the new story and set the names.”

### Key story file locations
| Story (display name)        | File                              | Export name               |
|----------------------------|-----------------------------------|---------------------------|
| Request Form Builder 1.1   | `src/pages/request-form-builder.stories.tsx` | `RequestFormBuilderStory` |
| Request Form Builder 1.2   | `src/pages/request-form-builder.stories.tsx` | `RequestFormBuilderV12Story` |
| Record Overview 1.1        | `src/pages/uar-employee-mode.stories.tsx`    | `RecordOverviewV11Story`  |
| Record Overview 1.2       | `src/pages/uar-employee-mode.stories.tsx`    | `RecordOverviewV12Story`  |
| Record Overview 1.3       | `src/pages/uar-employee-mode.stories.tsx`    | `RecordOverviewV13Story`  |

---

## 3. Keeping Changes Isolated to One Story (e.g. Record Overview 1.3)

### Safe: changes only in that story
- Edit **only** the story object for that version in the stories file (e.g. the `RecordOverviewV13Story` block in `uar-employee-mode.stories.tsx`).
- Changes to **props**, **initial state**, **handlers**, or **inline JSX** inside that story’s `render` affect **only** that story, because 1.1 and 1.2 have their own copies of that logic.

### Affects all stories using the component
- Editing **shared component** code (e.g. `UAREmployeeModeV12.tsx`, `UAR.tsx`, or shared UI components) affects **every** story that uses those components.

### If 1.3 needs different component behavior
- Either add a **prop** (e.g. `variant="record-overview-1-3"`) and branch inside the component, or use a **separate component** for 1.3. Do not change shared component behavior without a prop/variant if you want 1.3-only behavior.

---

## 4. Referring to UI for Removal or Changes (e.g. “Remove this thing”)

### Insights filter strip (example we used)
- **What it is:** The row in the sidebar with “Insights” and scrollable pills (e.g. “29 Insights”, “30 All Dormant Accounts”, “30 Orphaned Accounts”).
- **Where:** `src/pages/UAR.tsx`, controlled by **`showInsightsFilter`** (conditional block, not a separate React component).
- **How to ask for removal:**  
  - “Remove the insights filter strip from the sidebar.”  
  - “Remove the section that shows insight counts (Insights, All Dormant Accounts, etc.).”  
  - “Remove / hide the `showInsightsFilter` section in UAR.”

### How to find “the name” of a UI section
1. **React DevTools:** Inspect the element; the component tree shows parent component names (e.g. Sidebar, page component). Inline blocks don’t have their own component name.
2. **Search the codebase:** Search for distinctive **text** (e.g. “Insights”, “All Dormant Accounts”) or **class names** (e.g. `mt-4 flex h-fit items-center gap-3 px-4`).
3. **Describe + DOM path:** In chat, describe the section and/or paste the DOM path or a screenshot; that’s enough to locate it in source.

---

## 5. Persisting Browser Preview Changes to Source

### DOM delete (what we did)
- A **dom-delete** from the browser was the **tab bar** (TabsList) inside the main content area: the row with “Applications”, “Groups”, “Users” and counts.
- **Implementation:** In `src/pages/UAR.tsx`, the **TabsList** block (and its `TabsTrigger`s) was removed so that block is no longer rendered. Unused imports (`TabsList`, `TabsTrigger`) were removed from the tabs import.
- **Result:** The horizontal tab bar no longer appears; the first content in that area is now the insights filter (when `showInsightsFilter` is true) or the rest of the content. Tab content is still controlled by `<Tabs>` and `TabsContent`; only the visible tab triggers were removed.

### General approach for browser → source
- Use **selector** / **elementClasses** / **elementPath** to find the corresponding JSX (search for the same class names or structure).
- **Tailwind:** Changes are usually in `className` in JSX/TSX.
- **DOM delete:** Remove the corresponding conditional block or component usage in the source file (and clean up unused imports/symbols).

---

## 6. Summary of Code Changes Made This Session

| Change | File(s) | Description |
|--------|--------|-------------|
| Add Request Form Builder 1.2 | `request-form-builder.stories.tsx` | New story `RequestFormBuilderV12Story`; original story renamed to 1.1. |
| Add Record Overview 1.3 | `uar-employee-mode.stories.tsx` | New story `RecordOverviewV13Story` as full copy of 1.2 with name “Record Overview 1.3”. |
| Remove tab bar (TabsList) | `UAR.tsx` | Removed TabsList (Applications/Groups/Users triggers); cleaned tabs import. |

---

*Last updated from session notes. Adjust this doc as new patterns or decisions are established.*
