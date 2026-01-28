import * as React from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from './button';
import { Input } from './input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from './popover';
import { ScrollArea } from './scroll-area';

export interface SearchableSelectOption {
  value: string;
  label: string;
}

interface SearchableSelectProps {
  options: SearchableSelectOption[];
  value?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyText?: string;
  className?: string;
  popoverClassName?: string;
}

/**
 * Searchable select built with Popover + Input + list (no cmdk).
 * Type to filter, click an item to select and close.
 */
export function SearchableSelect({
  options,
  value,
  onValueChange,
  placeholder = 'Select...',
  searchPlaceholder = 'Search...',
  emptyText = 'No results found.',
  className,
  popoverClassName,
}: SearchableSelectProps) {
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState('');
  const inputRef = React.useRef<HTMLInputElement>(null);

  const selectedOption = options.find((o) => o.value === value);
  const query = search.trim().toLowerCase();
  const filtered =
    query === ''
      ? options
      : options.filter((o) => o.label.toLowerCase().includes(query));

  const handleOpenChange = (next: boolean) => {
    setOpen(next);
    if (!next) setSearch('');
    else setTimeout(() => inputRef.current?.focus(), 0);
  };

  const handleSelect = (optionValue: string) => {
    onValueChange?.(optionValue);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(
            'w-full min-w-[200px] justify-between focus:ring-2 focus:ring-ring focus:ring-offset-2',
            className
          )}
        >
          <span className="truncate flex-1 text-left">
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-70" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className={cn('w-[var(--radix-popover-trigger-width)] min-w-[200px] p-0', popoverClassName)}
        align="start"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <div className="flex flex-col max-h-[280px]">
          <div className="p-2 border-b">
            <Input
              ref={inputRef}
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={searchPlaceholder}
              className="h-9"
              onKeyDown={(e) => {
                if (e.key === 'Escape') setOpen(false);
              }}
            />
          </div>
          <ScrollArea className="flex-1">
            <div className="p-1 max-h-[220px]">
              {filtered.length === 0 ? (
                <div className="py-6 text-center text-sm text-muted-foreground">
                  {emptyText}
                </div>
              ) : (
                filtered.map((option) => {
                  const isSelected = value === option.value;
                  return (
                    <button
                      key={option.value}
                      type="button"
                      role="option"
                      aria-selected={isSelected}
                      className={cn(
                        'flex w-full cursor-pointer items-center gap-2 rounded-sm px-2 py-2 text-left text-sm outline-none hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
                        isSelected && 'bg-accent/50'
                      )}
                      onClick={() => handleSelect(option.value)}
                    >
                      <Check
                        className={cn(
                          'h-4 w-4 shrink-0',
                          isSelected ? 'opacity-100' : 'opacity-0'
                        )}
                      />
                      <span className="truncate">{option.label}</span>
                    </button>
                  );
                })
              )}
            </div>
          </ScrollArea>
        </div>
      </PopoverContent>
    </Popover>
  );
}
