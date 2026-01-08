import * as React from 'react';
import { cn } from '@/lib/utils';
import { Input, InputProps } from './input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './select';

interface FloatingLabelFieldProps {
  label: string;
  className?: string;
  labelClassName?: string;
}

interface FloatingLabelInputProps
  extends InputProps,
    FloatingLabelFieldProps {}

interface FloatingLabelSelectProps
  extends Omit<React.ComponentPropsWithoutRef<typeof Select>, 'children'>,
    FloatingLabelFieldProps {
  placeholder?: string;
  options: { value: string; label: string }[];
}

const FloatingLabelField = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & FloatingLabelFieldProps
>(({ className, label, labelClassName, children, ...props }, ref) => {
  return (
    <div ref={ref} className={cn('relative', className)} {...props}>
      <label
        className={cn(
          'absolute left-3 -top-2.5 z-10 bg-background px-1.5 text-xs text-muted-foreground pointer-events-none',
          labelClassName
        )}
      >
        {label}
      </label>
      {children}
    </div>
  );
});
FloatingLabelField.displayName = 'FloatingLabelField';

const FloatingLabelInput = React.forwardRef<
  HTMLInputElement,
  FloatingLabelInputProps
>(({ label, className, labelClassName, ...props }, ref) => {
  return (
    <FloatingLabelField
      label={label}
      labelClassName={labelClassName}
      className={className}
    >
      <Input ref={ref} {...props} />
    </FloatingLabelField>
  );
});
FloatingLabelInput.displayName = 'FloatingLabelInput';

const FloatingLabelSelect = React.forwardRef<
  HTMLDivElement,
  FloatingLabelSelectProps
>(({ label, className, labelClassName, placeholder, options, ...props }, ref) => {
  return (
    <FloatingLabelField
      ref={ref}
      label={label}
      labelClassName={labelClassName}
      className={className}
    >
      <Select {...props}>
        <SelectTrigger>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </FloatingLabelField>
  );
});
FloatingLabelSelect.displayName = 'FloatingLabelSelect';

export { FloatingLabelField, FloatingLabelInput, FloatingLabelSelect };

