import * as React from 'react';
import { cn } from '@/lib/utils';
import { Label } from './label';

interface FieldProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string;
  error?: string;
  required?: boolean;
}

const Field = React.forwardRef<HTMLDivElement, FieldProps>(
  ({ className, label, error, required, children, ...props }, ref) => {
    const fieldId = React.useId();

    return (
      <div ref={ref} className={cn('space-y-2', className)} {...props}>
        {label && (
          <Label htmlFor={fieldId}>
            {label}
            {required && <span className="text-destructive ml-1">*</span>}
          </Label>
        )}
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child, {
              id: fieldId,
              'aria-invalid': error ? 'true' : undefined,
              'aria-describedby': error ? `${fieldId}-error` : undefined,
            } as any);
          }
          return child;
        })}
        {error && (
          <p id={`${fieldId}-error`} className="text-sm text-destructive">
            {error}
          </p>
        )}
      </div>
    );
  }
);
Field.displayName = 'Field';

export { Field };

