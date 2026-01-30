# Expert QA: RequestFormBuilder.tsx

**Scope:** Functional, UX, accessibility, and robustness review of `src/pages/RequestFormBuilder.tsx`.  
**Date:** 2025-01-30

---

## Executive summary

| Severity | Count |
|----------|--------|
| Critical | 2 |
| High     | 5 |
| Medium   | 6 |
| Low      | 4 |

**Critical:** Header actions (Preview, Save) are non-functional; clipboard copy can throw.  
**High:** No validation, no persistence, drag-and-drop UI present but not wired, and several UX/accessibility gaps.

---

## 1. Critical issues

### C-1. "Preview" and "Save changes" buttons do nothing

**Location:** Lines 451–452 (header).

```tsx
<Button variant="secondary" size="sm">Preview</Button>
<Button size="sm">Save changes</Button>
```

**Issue:** No `onClick` (or other) handlers. Users cannot save form configuration or trigger a dedicated preview mode.

**Recommendation:**  
- **Save:** Add `onSave` (or internal handler) that persists `fields`, `formDescription`, and any other config (e.g. to API or local storage), and optionally show loading/success/error feedback.  
- **Preview:** Either (a) add a “preview mode” that hides the config panel and shows only the form, or (b) remove the button if the main area is already the preview.

---

### C-2. Clipboard copy can throw (no error handling)

**Location:** Lines 441–443 in `FieldConfigurePanel`.

```tsx
const copyId = () => {
  navigator.clipboard.writeText(field.id);
};
```

**Issue:** `navigator.clipboard.writeText` returns a Promise and can reject (e.g. insecure context, permission denied). Unhandled rejection may surface as an uncaught error.

**Recommendation:** Use async/await + try/catch and optionally show a toast:

```tsx
const copyId = async () => {
  try {
    await navigator.clipboard.writeText(field.id);
    // optional: toast.success('ID copied');
  } catch (err) {
    console.error('Copy failed:', err);
    // optional: toast.error('Copy failed');
  }
};
```

---

## 2. High-priority issues

### H-1. No form-level validation or submit flow

**Issue:**  
- `FormField` has `required` and `errorMessage`; preview shows `errorMessage` in `PreviewFieldCard`.  
- There is no “Submit” or “Validate” that:  
  - Checks required fields, or  
  - Sets `errorMessage` on fields.

So the builder configures a form definition but never validates or submits that definition (or a filled instance).

**Recommendation:**  
- If the page is **only** a builder: add explicit “Validate form” (and/or “Save”) that validates the current config and sets `errorMessage` where needed (e.g. empty required label, invalid option count).  
- If the page will also support **filling** the form: add a submit path that validates required fields and sets/clears `errorMessage` per field.

---

### H-2. Drag-and-drop reorder is not implemented

**Issue:**  
- `PreviewFieldCard` accepts `onDragStart`, `onDragOver`, `onDrop`, `isDragging`, `isDropTarget` and sets `draggable={!!onDragStart}`.  
- The parent (lines 711–722) never passes these props, so `draggable` is false and no drag state exists.  
- Reorder is only possible via “Move Up” / “Move Down” in the dropdown.

**Recommendation:** Either implement drag-and-drop (state for dragged index + drop target, `onDragStart`/`onDragOver`/`onDrop` that call a reorder helper similar to `moveField`) or remove the unused drag props and any drag-specific styling to avoid implying support.

---

### H-3. "Show/Hide" menu label is ambiguous

**Location:** Line 261 – dropdown item “Show/Hide”.

**Issue:** One label toggles visibility; it’s unclear whether the current state is “show” or “hide” and what the next click will do.

**Recommendation:** Use state-dependent label, e.g. “Hide field” when `field.visible` is true and “Show field” when false, or “Show in form” / “Hide from form”.

---

### H-4. Move Up / Move Down always enabled at boundaries

**Location:** `PreviewFieldCard` dropdown (lines 252–257); `moveField` (lines 638–647).

**Issue:** “Move Up” and “Move Down” are always shown. When the field is first or last, `moveField` no-ops (bounds check). Users get no feedback that the action did nothing.

**Recommendation:** Disable “Move Up” when the field is first and “Move Down” when it’s last (e.g. pass `canMoveUp` / `canMoveDown` into the card and disable the corresponding menu items).

---

### H-5. No confirmation before Delete

**Location:** Dropdown “Delete” (lines 263–266); `deleteField` (lines 654–657).

**Issue:** Deleting a field is immediate and irreversible in-session. Accidental clicks can remove important configuration.

**Recommendation:** For non-custom (default) fields, consider a confirm dialog (“Remove this field from the form?”). For custom fields, same or a softer warning. Optionally allow “Undo” (e.g. toast with undo) for a short period.

---

## 3. Medium-priority issues

### M-1. Type change does not clear options / default

**Location:** FieldConfigurePanel – type `Select` (lines 539–550); `update` only sets `type`.

**Issue:** Changing type from `singleSelect` or `radio` to `singleLineText` or `date` leaves `options` and `defaultOptionId` in state. Data is stale and could confuse future logic or serialization.

**Recommendation:** When changing to a type that doesn’t use options, clear them in the same update, e.g.  
`update({ type: v as FieldType, options: undefined, defaultOptionId: null })` when the new type is not option-based.

---

### M-2. Empty label and placeholder allowed

**Issue:** Label and placeholder can be cleared to empty string. Empty labels in the preview and in the left-panel list hurt readability and accessibility.

**Recommendation:**  
- Validate on blur or on save: require non-empty label (and optionally placeholder for certain types).  
- Show inline error (e.g. via `errorMessage` or a small validation message) and block save until fixed if you enforce rules.

---

### M-3. Keyboard: Space does not activate card

**Location:** `PreviewFieldCard` (lines 192–197). `role="button"`, `tabIndex={0}`, `onKeyDown` only handles Enter.

**Issue:** For a focusable element with `role="button"`, WCAG expects both Enter and Space to activate. Space currently does nothing.

**Recommendation:** In `onKeyDown`, also handle Space and call `preventDefault()` and `onSelect()`:

```tsx
onKeyDown={(e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    onSelect();
  }
}}
```

---

### M-4. No aria-selected on preview cards

**Issue:** Selected card is indicated only visually (border/background). Screen reader users don’t get an explicit “selected” state.

**Recommendation:** On the card container, add `aria-selected={isSelected}` (and ensure the component is not perceived as a button that “presses” if you prefer selection semantics; otherwise consider `role="option"` with an `aria-selected` listbox pattern if the set is a list of selectable options).

---

### M-5. Copy ID button has no accessible name

**Location:** Line 443 – icon button next to “ID: {field.id}”.

**Issue:** Button has no `aria-label` or visible text. Screen reader users only hear “button” or the icon.

**Recommendation:** Add `aria-label="Copy field ID"` (or “Copy ID to clipboard”) to the button.

---

### M-6. Date field type has no date-specific preview

**Location:** `FieldControl` (lines 276–278). `date` is lumped with `singleLineText`; both render a plain `Input` (readOnly).

**Issue:** In the preview, date fields look like text fields. No date picker or hint (e.g. placeholder “MM/DD/YYYY”) is shown.

**Recommendation:** For `field.type === 'date'`, render a date input or a read-only date-style placeholder in the preview so the form definition’s intent is clear.

---

## 4. Low-priority issues

### L-1. All fields can be deleted

**Issue:** User can delete every field and end up with an empty form. There is no minimum or “at least one field” rule.

**Recommendation:** Either prevent deletion when only one (or N) fields remain, or allow empty form and document that “Save” may validate “at least one field” later.

---

### L-2. Grip icon in Form Fields list is not draggable

**Location:** FormLevelConfig – list of fields (lines 387–402). `GripVertical` has `cursor-grab` but list items are not draggable.

**Issue:** Suggests drag reorder in the left panel, but reorder is only in the preview via Move Up/Down.

**Recommendation:** Either add drag-and-drop to this list as well, or remove the grip (or use a different icon) and rely on “select then Move Up/Down in preview” to avoid confusion.

---

### L-3. Default option toggle sets first option when enabled

**Location:** Rules section (lines 419–421). When “Default input” is turned on:  
`update({ defaultOptionId: v && options[0]?.id ? options[0].id : null })`.

**Issue:** If there are multiple options, defaulting to the first may not be desired. No way to “enable default” without picking an option in one click.

**Recommendation:** Consider leaving `defaultOptionId` as `null` when enabling the switch and requiring the user to pick from the Select; or keep current behavior and document it.

---

### L-4. Breadcrumb "Settings" link is href="#"

**Location:** Line 454. `BreadcrumbLink href="#">Settings</BreadcrumbLink>`.

**Issue:** Placeholder link; in a real app this should navigate to Settings (or be a `span` if non-navigable).

**Recommendation:** Replace with real route/link or non-link element depending on app routing.

---

## 5. Positive findings

- **State consistency:** Deleting the selected field clears `selectedFieldId`; adding a custom field selects it. No stale selection.
- **Bounds in move:** `moveField` correctly guards index so it never swaps out of range.
- **Default option cleanup:** Removing an option clears `defaultOptionId` when it was that option.
- **Required/errorMessage UI:** Required asterisk and error message display in the preview are clear.
- **Character count:** Form and field description show `length/512`; good UX.
- **Search fields:** Form-level search filters by label (case-insensitive); useful with many fields.

---

## 6. Test suggestions (manual or automated)

| # | Scenario | Expected |
|---|----------|----------|
| 1 | Click “Save changes” | Either persists config or shows “not implemented” / validation errors. |
| 2 | Copy field ID in insecure context (e.g. HTTP) or deny clipboard | No uncaught exception; optional user feedback. |
| 3 | Set field type from Single select to Single line text | Options and default cleared (if M-1 fixed). |
| 4 | Focus preview card, press Space | Card selects (if M-3 fixed). |
| 5 | Select first/last field, choose Move Up / Move Down | Buttons disabled or no-op with no crash. |
| 6 | Delete default field (e.g. Application) | Confirm if implemented; otherwise immediate delete. |
| 7 | Add custom field, remove all options from a singleSelect | No crash; default option cleared when last option removed. |
| 8 | Screen reader: select card, open dropdown, Copy ID | Card selection and “Copy field ID” announced (if M-4, M-5 fixed). |

---

## 7. Summary checklist

- [ ] **C-1** Wire Preview and Save (or remove Preview and implement Save).
- [ ] **C-2** Handle clipboard copy with async + try/catch (and optional toast).
- [ ] **H-1** Define and implement validation/submit for builder (and/or for filled form).
- [ ] **H-2** Implement drag-and-drop reorder or remove unused drag API from the card.
- [ ] **H-3** Use state-dependent label for Show/Hide.
- [ ] **H-4** Disable Move Up/Down at first/last.
- [ ] **H-5** Consider confirm (or undo) for Delete.
- [ ] **M-1** Clear options/default when changing to non-option type.
- [ ] **M-2** Validate non-empty label (and optionally placeholder).
- [ ] **M-3** Handle Space key on preview cards.
- [ ] **M-4** Expose selection to AT (e.g. aria-selected).
- [ ] **M-5** Add aria-label to Copy ID button.
- [ ] **M-6** Improve date field preview (e.g. date input or placeholder).
- [ ] **L-1–L-4** Address as needed for product and consistency.
