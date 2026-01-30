import * as React from 'react';
import { cn } from '@/lib/utils';
import { GlobalHeader } from '@/components/ui/global-header';
import { SidebarProvider, Sidebar } from '@/components/ui/sidebar';
import { NavigationSidebar } from '@/components/ui/navigation-sidebar';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Card, CardContent } from '@/components/ui/card';
import {
  GripVertical,
  MoreVertical,
  Search,
  Plus,
  ChevronRight,
  ArrowUp,
  ArrowDown,
  EyeOff,
  Trash2,
  Pencil,
  Copy,
  AlertCircle,
} from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { toast } from 'sonner';

const STORAGE_KEY = 'request-form-builder-config';

// --- Types ---
export type FieldType = 'singleLineText' | 'date' | 'singleSelect' | 'radio';

export interface FormFieldOption {
  id: string;
  label: string;
}

export interface FormField {
  id: string;
  label: string;
  description: string;
  type: FieldType;
  required: boolean;
  placeholder: string;
  visible: boolean;
  isCustom: boolean;
  options?: FormFieldOption[];
  defaultOptionId?: string | null;
  errorMessage?: string | null;
}

interface RequestFormBuilderProps {
  className?: string;
}

function generateId(): string {
  return 'f-' + Math.random().toString(36).slice(2, 11);
}

const DEFAULT_FIELDS: FormField[] = [
  {
    id: 'application',
    label: 'Application',
    description: "Select the application for which you're requesting access.",
    type: 'singleSelect',
    required: true,
    placeholder: 'Select application',
    visible: true,
    isCustom: false,
    options: [{ id: 'opt-1', label: 'Option 1' }, { id: 'opt-2', label: 'Option 2' }],
    defaultOptionId: null,
  },
  {
    id: 'requested-for',
    label: 'Requested for',
    description: "Specify who this access is for—yourself or another user.",
    type: 'radio',
    required: true,
    placeholder: '',
    visible: true,
    isCustom: false,
    options: [{ id: 'myself', label: 'Myself' }, { id: 'others', label: 'Others' }],
    defaultOptionId: 'myself',
  },
  {
    id: 'licenses',
    label: 'Number of licenses required',
    description: 'Choose the license or plan type required for this access.',
    type: 'singleLineText',
    required: true,
    placeholder: 'Enter Number of licenses required...',
    visible: true,
    isCustom: false,
  },
  {
    id: 'license',
    label: 'Application License',
    description: 'Select the role or permission level you need within the application.',
    type: 'singleLineText',
    required: true,
    placeholder: 'Enter Application License...',
    visible: true,
    isCustom: false,
  },
  {
    id: 'role',
    label: 'Application Role',
    description: 'Select the role or permission level you need within the application.',
    type: 'singleLineText',
    required: false,
    placeholder: 'Enter Application Role...',
    visible: true,
    isCustom: false,
  },
  {
    id: 'duration',
    label: 'Access Duration',
    description: 'Specify how long this access should be granted.',
    type: 'singleLineText',
    required: false,
    placeholder: 'Enter duration...',
    visible: true,
    isCustom: false,
  },
];

// --- Preview Field Card ---
function PreviewFieldCard({
  field,
  isSelected,
  isHovered,
  onSelect,
  onHoverStart,
  onHoverEnd,
  onMoveUp,
  onMoveDown,
  onToggleVisible,
  onDelete,
  canMoveUp,
  canMoveDown,
  children,
}: {
  field: FormField;
  isSelected: boolean;
  isHovered: boolean;
  onSelect: () => void;
  onHoverStart: () => void;
  onHoverEnd: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onToggleVisible: () => void;
  onDelete: () => void;
  canMoveUp?: boolean;
  canMoveDown?: boolean;
  children: React.ReactNode;
}) {
  const showActions = isHovered || isSelected;
  const hasError = Boolean(field.errorMessage);
  const allowMoveUp = canMoveUp ?? true;
  const allowMoveDown = canMoveDown ?? true;

  return (
    <div
      role="button"
      tabIndex={0}
      aria-selected={isSelected}
      onClick={onSelect}
      onMouseEnter={onHoverStart}
      onMouseLeave={onHoverEnd}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect();
        }
      }}
      className={cn(
        'flex gap-3 items-start rounded-lg border-2 p-4 transition-colors text-left cursor-pointer',
        hasError && 'bg-destructive/10 border-destructive',
        !hasError && isSelected && 'border-primary bg-background',
        !hasError && !isSelected && 'border-transparent bg-background'
      )}
    >
      {/* Fixed-width grip column so layout doesn’t shift on hover */}
      <div className="flex h-10 w-10 shrink-0 items-center justify-center" aria-hidden>
        {showActions ? (
          <span className="text-muted-foreground cursor-grab">
            <GripVertical className="h-4 w-4" />
          </span>
        ) : (
          <span className="w-4" />
        )}
      </div>

      <div className="flex-1 min-w-0 space-y-2">
        <Label className="text-sm font-medium">
          {field.label}
          {field.required && <span className="text-destructive ml-0.5">*</span>}
        </Label>
        <p className="text-sm text-muted-foreground truncate">{field.description}</p>
        {children}
        {hasError && (
          <div className="flex items-center gap-2 text-sm text-destructive">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{field.errorMessage}</span>
          </div>
        )}
      </div>

      {/* Fixed-width actions column so layout doesn’t shift on hover */}
      <div className="flex h-10 w-10 shrink-0 items-center justify-end" aria-hidden>
        <DropdownMenu>
          <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                'h-8 w-8 shrink-0',
                !showActions && 'pointer-events-none opacity-0'
              )}
            >
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" onClick={(e) => e.stopPropagation()}>
            <DropdownMenuItem onClick={onMoveUp} disabled={!allowMoveUp}>
              <ArrowUp className="h-4 w-4 mr-2" />
              Move Up
            </DropdownMenuItem>
            <DropdownMenuItem onClick={onMoveDown} disabled={!allowMoveDown}>
              <ArrowDown className="h-4 w-4 mr-2" />
              Move Down
            </DropdownMenuItem>
            <DropdownMenuItem onClick={onToggleVisible}>
              <EyeOff className="h-4 w-4 mr-2" />
              {field.visible ? 'Hide field' : 'Show field'}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={onDelete} className="text-destructive focus:text-destructive">
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}

// --- Field control renderer for preview ---
function FieldControl({ field }: { field: FormField }) {
  if (field.type === 'singleLineText' || field.type === 'date') {
    return <Input placeholder={field.placeholder} readOnly className="pointer-events-none" />;
  }
  if (field.type === 'radio' && field.options?.length) {
    return (
      <RadioGroup className="flex gap-4" disabled value={field.defaultOptionId ?? undefined}>
        {field.options.map((opt) => (
          <div key={opt.id} className="flex items-center gap-2">
            <RadioGroupItem value={opt.id} id={`${field.id}-${opt.id}`} />
            <Label htmlFor={`${field.id}-${opt.id}`} className="font-normal">{opt.label}</Label>
          </div>
        ))}
      </RadioGroup>
    );
  }
  if (field.type === 'singleSelect' && field.options?.length) {
    return (
      <Select disabled>
        <SelectTrigger>
          <SelectValue placeholder={field.placeholder} />
        </SelectTrigger>
        <SelectContent>
          {field.options.map((opt) => (
            <SelectItem key={opt.id} value={opt.id}>{opt.label}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    );
  }
  return <Input placeholder={field.placeholder} readOnly className="pointer-events-none" />;
}

// --- Form-level config panel ---
function FormLevelConfig({
  formDescription,
  setFormDescription,
  showAllVisible,
  setShowAllVisible,
  fieldSearch,
  setFieldSearch,
  fields,
  visibleCount,
  onToggleFieldVisibility,
  onAddCustomField,
}: {
  formDescription: string;
  setFormDescription: (v: string) => void;
  showAllVisible: boolean;
  setShowAllVisible: (v: boolean) => void;
  fieldSearch: string;
  setFieldSearch: (v: string) => void;
  fields: FormField[];
  visibleCount: number;
  onToggleFieldVisibility: (id: string) => void;
  onAddCustomField: () => void;
  onReorderField: (fieldId: string, newIndex: number) => void;
}) {
  const filteredFields = fieldSearch.trim()
    ? fields.filter((f) => f.label.toLowerCase().includes(fieldSearch.toLowerCase()))
    : fields;
  const isFiltered = fieldSearch.trim() !== '';
  const [draggedId, setDraggedId] = React.useState<string | null>(null);
  const [dropTargetId, setDropTargetId] = React.useState<string | null>(null);

  const handleDragStart = (e: React.DragEvent, fieldId: string) => {
    if (isFiltered) return;
    setDraggedId(fieldId);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', fieldId);
    e.dataTransfer.setData('application/x-field-id', fieldId);
  };

  const handleDragEnd = () => {
    setDraggedId(null);
    setDropTargetId(null);
  };

  const handleDragOver = (e: React.DragEvent, fieldId: string) => {
    if (isFiltered || !draggedId || draggedId === fieldId) return;
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDropTargetId(fieldId);
  };

  const handleDragLeave = () => {
    setDropTargetId(null);
  };

  const handleDrop = (e: React.DragEvent, targetFieldId: string) => {
    e.preventDefault();
    setDropTargetId(null);
    setDraggedId(null);
    if (isFiltered) return;
    const fieldId = e.dataTransfer.getData('application/x-field-id');
    if (!fieldId || fieldId === targetFieldId) return;
    const newIndex = fields.findIndex((f) => f.id === targetFieldId);
    if (newIndex === -1) return;
    onReorderField(fieldId, newIndex);
  };

  return (
    <>
      <div className="p-4 border-b">
        <h2 className="text-sm font-semibold">Configure Application Request Form</h2>
      </div>
      <ScrollArea className="flex-1">
        <div className="p-4 space-y-6">
          <Accordion type="multiple" defaultValue={['general', 'form-fields']} className="w-full">
            <AccordionItem value="general">
              <AccordionTrigger>General</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground">Description</Label>
                  <Textarea
                    placeholder="Form Description"
                    className="min-h-[80px] resize-none"
                    value={formDescription}
                    onChange={(e) => setFormDescription(e.target.value)}
                    maxLength={512}
                  />
                  <p className="text-xs text-muted-foreground">{formDescription.length}/512</p>
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="form-fields">
              <AccordionTrigger>Form Fields</AccordionTrigger>
              <AccordionContent>
                <p className="text-xs text-muted-foreground mb-3">
                  Select a field to configure from the list below or from live preview area.
                </p>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-xs text-muted-foreground">{visibleCount}/{fields.length} fields visible</span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs">Show all</span>
                    <Switch checked={showAllVisible} onCheckedChange={setShowAllVisible} className="shrink-0" />
                  </div>
                </div>
                <div className="relative mb-3">
                  <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search fields..."
                    className="pl-8"
                    value={fieldSearch}
                    onChange={(e) => setFieldSearch(e.target.value)}
                  />
                </div>
                <ul
                  className="space-y-1"
                  role="list"
                  aria-label="Form fields"
                >
                  {filteredFields.map((field) => (
                    <li
                      key={field.id}
                      draggable={!isFiltered}
                      onDragStart={(e) => handleDragStart(e, field.id)}
                      onDragEnd={handleDragEnd}
                      onDragOver={(e) => handleDragOver(e, field.id)}
                      onDragLeave={handleDragLeave}
                      onDrop={(e) => handleDrop(e, field.id)}
                      className={cn(
                        'flex items-center gap-2 py-2 px-2 rounded-md transition-colors',
                        !isFiltered && 'cursor-grab active:cursor-grabbing',
                        draggedId === field.id && 'opacity-50',
                        dropTargetId === field.id && 'bg-primary/10 ring-1 ring-primary/30'
                      )}
                      aria-label={`${field.label}, drag to reorder`}
                    >
                      <GripVertical
                        className={cn(
                          'h-4 w-4 shrink-0 text-muted-foreground',
                          isFiltered ? 'pointer-events-none' : 'cursor-grab'
                        )}
                        aria-hidden
                      />
                      <span className="flex-1 text-sm truncate">
                        {field.label}
                      </span>
                      <Switch
                        checked={field.visible}
                        onCheckedChange={() => onToggleFieldVisibility(field.id)}
                        className="shrink-0"
                        onClick={(e) => e.stopPropagation()}
                      />
                    </li>
                  ))}
                </ul>
                <Button variant="outline" size="sm" className="w-full mt-3" onClick={onAddCustomField}>
                  Add Custom Field
                </Button>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </ScrollArea>
    </>
  );
}

// --- Field-level Configure panel ---
const FIELD_TYPE_LABELS: Record<FieldType, string> = {
  singleLineText: 'Single line text',
  date: 'Date',
  singleSelect: 'Single select',
  radio: 'Boolean',
};

function FieldConfigurePanel({
  field,
  onUpdateField,
}: {
  field: FormField;
  onUpdateField: (id: string, patch: Partial<FormField>) => void;
}) {
  const labelInputRef = React.useRef<HTMLInputElement>(null);
  const update = (patch: Partial<FormField>) => onUpdateField(field.id, patch);

  const copyId = async () => {
    try {
      await navigator.clipboard.writeText(field.id);
      toast.success('Field ID copied to clipboard');
    } catch (err) {
      console.error('Copy failed:', err);
      toast.error('Failed to copy ID');
    }
  };

  const hasOptions = field.type === 'singleSelect' || field.type === 'radio';
  const options = field.options ?? [];

  const addOption = () => {
    const newOpt = { id: 'opt-' + generateId(), label: `Option ${options.length + 1}` };
    update({ options: [...options, newOpt] });
  };

  const updateOption = (optId: string, label: string) => {
    update({
      options: options.map((o) => (o.id === optId ? { ...o, label } : o)),
    });
  };

  const removeOption = (optId: string) => {
    update({
      options: options.filter((o) => o.id !== optId),
      defaultOptionId: field.defaultOptionId === optId ? null : field.defaultOptionId,
    });
  };

  return (
    <>
      <div className="p-4 border-b space-y-2">
        <h2 className="text-sm font-semibold">Configure</h2>
        <div className="flex items-center justify-between gap-1">
          <div className="flex items-center gap-0 min-w-0 flex-1">
            <span className="relative inline-grid min-w-0 max-w-full place-items-stretch" style={{ gridTemplateColumns: 'minmax(0, max-content)' }}>
              <span
                aria-hidden
                className="invisible col-start-1 row-start-1 whitespace-pre font-medium text-base py-1 pl-0 pr-1"
              >
                {field.label || 'Field label'}
              </span>
              <Input
                ref={labelInputRef}
                value={field.label}
                onChange={(e) => update({ label: e.target.value })}
                className="absolute inset-0 h-full w-full min-w-0 py-1 pl-0 pr-1 font-medium text-base border-transparent bg-transparent shadow-none focus-visible:ring-0 focus-visible:border-primary focus-visible:bg-muted/50 box-border"
                placeholder="Field label"
              />
            </span>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 shrink-0"
              type="button"
              aria-label="Edit field label"
              onClick={() => labelInputRef.current?.focus()}
            >
              <Pencil className="h-3 w-3" />
            </Button>
          </div>
          <Badge variant="secondary" className="shrink-0">
            {field.isCustom ? 'Custom' : 'Default'}
          </Badge>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span>ID: {field.id}</span>
          <Button variant="ghost" size="icon" className="h-6 w-6" onClick={copyId} aria-label="Copy field ID">
            <Copy className="h-3 w-3" />
          </Button>
        </div>
      </div>
      <ScrollArea className="flex-1">
        <div className="p-4">
          <Accordion type="multiple" defaultValue={['general', 'properties', 'rules']} className="w-full">
            <AccordionItem value="general">
              <AccordionTrigger>General</AccordionTrigger>
              <AccordionContent className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground">Description</Label>
                  <Textarea
                    placeholder="Field Description"
                    className="min-h-[80px] resize-none"
                    value={field.description}
                    onChange={(e) => update({ description: e.target.value })}
                    maxLength={512}
                  />
                  <p className="text-xs text-muted-foreground">{field.description.length}/512</p>
                </div>
                <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground">Placeholder text</Label>
                  <Input
                    placeholder={`Enter ${field.label}...`}
                    value={field.placeholder}
                    onChange={(e) => update({ placeholder: e.target.value })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label className="text-xs">Required field</Label>
                  <Switch checked={field.required} onCheckedChange={(v) => update({ required: v })} />
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="properties">
              <AccordionTrigger>Properties</AccordionTrigger>
              <AccordionContent className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground">Type</Label>
                  <Select
                    value={field.type}
                    onValueChange={(v) => {
                      const newType = v as FieldType;
                      const isOptionType = newType === 'singleSelect' || newType === 'radio';
                      update(
                        isOptionType
                          ? { type: newType }
                          : { type: newType, options: undefined, defaultOptionId: null }
                      );
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {(Object.keys(FIELD_TYPE_LABELS) as FieldType[]).map((t) => (
                        <SelectItem key={t} value={t}>{FIELD_TYPE_LABELS[t]}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                {hasOptions && (
                  <>
                    <div className="space-y-2">
                      <Label className="text-xs text-muted-foreground">Field Options</Label>
                      <ul className="space-y-2">
                        {options.map((opt) => (
                          <li key={opt.id} className="flex items-center gap-2">
                            <GripVertical className="h-4 w-4 shrink-0 text-muted-foreground" />
                            <Input
                              value={opt.label}
                              onChange={(e) => updateOption(opt.id, e.target.value)}
                              className="flex-1"
                            />
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-destructive shrink-0"
                              onClick={() => removeOption(opt.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </li>
                        ))}
                      </ul>
                      <Button variant="outline" size="sm" onClick={addOption}>
                        <Plus className="h-4 w-4 mr-2" />
                        Add Option
                      </Button>
                    </div>
                  </>
                )}
              </AccordionContent>
            </AccordionItem>
            {(field.type === 'singleSelect' || field.type === 'radio') && (
              <AccordionItem value="rules">
                <AccordionTrigger>Rules</AccordionTrigger>
                <AccordionContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label className="text-xs">Default input</Label>
                      <Switch
                        checked={!!field.defaultOptionId}
                        onCheckedChange={(v) => update({ defaultOptionId: v && options[0]?.id ? options[0].id : null })}
                      />
                    </div>
                    {field.defaultOptionId && (
                      <Select
                        value={field.defaultOptionId}
                        onValueChange={(v) => update({ defaultOptionId: v })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select default" />
                        </SelectTrigger>
                        <SelectContent>
                          {options.map((opt) => (
                            <SelectItem key={opt.id} value={opt.id}>{opt.label}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>
            )}
          </Accordion>
        </div>
      </ScrollArea>
    </>
  );
}

// --- Main page ---
export function RequestFormBuilder({ className }: RequestFormBuilderProps) {
  const [fields, setFields] = React.useState<FormField[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as { fields?: FormField[]; formDescription?: string };
        if (Array.isArray(parsed.fields) && parsed.fields.length > 0) {
          return parsed.fields;
        }
      }
    } catch {
      // ignore invalid stored data
    }
    return DEFAULT_FIELDS;
  });
  const [formDescription, setFormDescription] = React.useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as { formDescription?: string };
        if (typeof parsed.formDescription === 'string') return parsed.formDescription;
      }
    } catch {
      // ignore
    }
    return '';
  });
  const [selectedFieldId, setSelectedFieldId] = React.useState<string | null>(null);
  const [hoveredFieldId, setHoveredFieldId] = React.useState<string | null>(null);
  const [showAllVisible, setShowAllVisible] = React.useState(true);
  const [fieldSearch, setFieldSearch] = React.useState('');
  const [previewMode, setPreviewMode] = React.useState(false);

  // Single source of order: right panel list and preview both use `fields` array order.
  // Preview shows fields in that same order, optionally filtered by visibility when "Show all" is off.
  const visibleFields = showAllVisible ? fields : fields.filter((f) => f.visible);
  const visibleCount = fields.filter((f) => f.visible).length;
  const selectedField = selectedFieldId ? fields.find((f) => f.id === selectedFieldId) : null;

  const updateField = React.useCallback((id: string, patch: Partial<FormField>) => {
    setFields((prev) => prev.map((f) => (f.id === id ? { ...f, ...patch } : f)));
  }, []);

  const moveField = React.useCallback((id: string, direction: 'up' | 'down') => {
    setFields((prev) => {
      const i = prev.findIndex((f) => f.id === id);
      if (i === -1) return prev;
      const j = direction === 'up' ? i - 1 : i + 1;
      if (j < 0 || j >= prev.length) return prev;
      const next = [...prev];
      [next[i], next[j]] = [next[j], next[i]];
      return next;
    });
  }, []);

  const reorderField = React.useCallback((fieldId: string, newIndex: number) => {
    setFields((prev) => {
      const fromIdx = prev.findIndex((f) => f.id === fieldId);
      if (fromIdx === -1 || fromIdx === newIndex) return prev;
      const next = [...prev];
      const [removed] = next.splice(fromIdx, 1);
      next.splice(newIndex, 0, removed);
      return next;
    });
  }, []);

  const toggleFieldVisibility = React.useCallback((id: string) => {
    setFields((prev) => prev.map((f) => (f.id === id ? { ...f, visible: !f.visible } : f)));
  }, []);

  const deleteField = React.useCallback((id: string) => {
    setFields((prev) => prev.filter((f) => f.id !== id));
    if (selectedFieldId === id) setSelectedFieldId(null);
  }, [selectedFieldId]);

  const handleDeleteField = React.useCallback(
    (id: string) => {
      const field = fields.find((f) => f.id === id);
      const label = field?.label ?? 'this field';
      if (window.confirm(`Remove "${label}" from the form?`)) {
        deleteField(id);
      }
    },
    [fields, deleteField]
  );

  const handleSave = React.useCallback(() => {
    const withErrors = fields.map((f) => {
      const labelTrim = (f.label ?? '').trim();
      if (labelTrim === '') {
        return { ...f, errorMessage: 'Label is required' as string };
      }
      const { errorMessage: _, ...rest } = f;
      return { ...rest, errorMessage: null };
    });
    const hasInvalid = withErrors.some((f) => f.errorMessage);
    setFields(withErrors);
    if (hasInvalid) {
      toast.error('Fix fields with empty labels before saving');
      return;
    }
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ fields: withErrors, formDescription })
      );
      toast.success('Changes saved');
    } catch (err) {
      console.error('Save failed:', err);
      toast.error('Failed to save');
    }
  }, [fields, formDescription]);

  const addCustomField = React.useCallback(() => {
    const newField: FormField = {
      id: generateId(),
      label: 'New Custom Field',
      description: '',
      type: 'singleLineText',
      required: false,
      placeholder: 'Enter New Custom Field...',
      visible: true,
      isCustom: true,
    };
    setFields((prev) => [...prev, newField]);
    setSelectedFieldId(newField.id);
  }, []);

  return (
    <div className={cn('flex h-screen w-full flex-col bg-background overflow-hidden', className)}>
      <GlobalHeader />

      <SidebarProvider>
        <Sidebar className="flex flex-1 overflow-hidden min-h-0">
          <NavigationSidebar defaultSelected="Settings" />

          <main className="flex flex-1 flex-col overflow-hidden min-w-0">
            <header className="shrink-0 flex items-center justify-between border-b px-6 py-4 gap-4">
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="#">Settings</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </BreadcrumbSeparator>
                  <BreadcrumbItem>
                    <BreadcrumbPage>App Request Form</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
              <div className="flex items-center gap-2 shrink-0">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setPreviewMode((p) => !p)}
                >
                  {previewMode ? 'Edit' : 'Preview'}
                </Button>
                <Button size="sm" onClick={handleSave}>
                  Save changes
                </Button>
              </div>
            </header>

            <div className="flex flex-1 overflow-hidden min-h-0">
              {/* Preview column */}
              <div
                className="flex-1 overflow-auto border-r min-w-0"
                onClick={() => setSelectedFieldId(null)}
              >
                <div className="p-6 space-y-6 max-w-2xl mx-auto" onClick={(e) => e.stopPropagation()}>
                  <h1 className="text-2xl font-bold tracking-tight pl-[70px]">Application Request Form</h1>
                  <div className="space-y-4">
                    {visibleFields.map((field) => {
                      const index = fields.findIndex((f) => f.id === field.id);
                      return (
                        <PreviewFieldCard
                          key={field.id}
                          field={field}
                          isSelected={selectedFieldId === field.id}
                          isHovered={hoveredFieldId === field.id}
                          onSelect={() => {}}
                          onHoverStart={() => setHoveredFieldId(field.id)}
                          onHoverEnd={() => setHoveredFieldId(null)}
                          onMoveUp={() => moveField(field.id, 'up')}
                          onMoveDown={() => moveField(field.id, 'down')}
                          onToggleVisible={() => toggleFieldVisibility(field.id)}
                          onDelete={() => handleDeleteField(field.id)}
                          canMoveUp={index > 0}
                          canMoveDown={index >= 0 && index < fields.length - 1}
                        >
                          <FieldControl field={field} />
                        </PreviewFieldCard>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Config column */}
              {!previewMode && (
              <aside className="w-[360px] shrink-0 flex flex-col border-l bg-muted/30">
                {selectedField ? (
                  <FieldConfigurePanel field={selectedField} onUpdateField={updateField} />
                ) : (
                  <FormLevelConfig
                    formDescription={formDescription}
                    setFormDescription={setFormDescription}
                    showAllVisible={showAllVisible}
                    setShowAllVisible={setShowAllVisible}
                    fieldSearch={fieldSearch}
                    setFieldSearch={setFieldSearch}
                    fields={fields}
                    visibleCount={visibleCount}
                    onToggleFieldVisibility={toggleFieldVisibility}
                    onAddCustomField={addCustomField}
                    onReorderField={reorderField}
                  />
                )}
              </aside>
              )}
            </div>
          </main>
        </Sidebar>
      </SidebarProvider>
    </div>
  );
}
