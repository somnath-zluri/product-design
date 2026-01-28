import * as React from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from './button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from './command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from './popover';

export interface ComboboxOption {
  value: string;
  label: string;
}

interface ComboboxProps {
  options: ComboboxOption[];
  value?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyText?: string;
  className?: string;
  popoverClassName?: string;
}

export function Combobox({
  options,
  value,
  onValueChange,
  placeholder = 'Select option...',
  searchPlaceholder = 'Search...',
  emptyText = 'No option found.',
  className,
  popoverClassName,
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("w-full min-w-[300px] justify-between focus:ring-2 focus:ring-ring focus:ring-offset-2", className)}
        >
          <span className="truncate flex-1 text-left">
            {value
              ? options.find((option) => option.value === value)?.label
              : placeholder}
          </span>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-70" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className={cn("w-[300px] p-0", popoverClassName)} align="start">
        <Command>
          <CommandInput placeholder={searchPlaceholder} />
          <CommandList>
            <CommandEmpty>{emptyText}</CommandEmpty>
            <CommandGroup>
              {options.map((option) => {
                const isSelected = value === option.value;
                const handleSelect = () => {
                  const newValue = option.value === value ? '' : option.value;
                  onValueChange?.(newValue);
                  setOpen(false);
                };
                return (
                  <CommandItem
                    key={option.value}
                    value={option.label}
                    onSelect={handleSelect}
                    onClick={(e) => {
                      e.preventDefault();
                      handleSelect();
                    }}
                    className="cursor-pointer"
                  >
                    <Check
                      className={cn(
                        'mr-2 h-4 w-4',
                        isSelected ? 'opacity-100' : 'opacity-0'
                      )}
                    />
                    {option.label}
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

