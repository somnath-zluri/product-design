import * as React from 'react';
import { cn } from '@/lib/utils';
import { Input } from './input';

interface InputGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  startText?: string;
  endText?: string;
}

const InputGroup = React.forwardRef<HTMLDivElement, InputGroupProps>(
  ({ className, startIcon, endIcon, startText, endText, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('relative flex items-center', className)}
        {...props}
      >
        {startIcon && (
          <div className="absolute left-3 flex items-center text-muted-foreground">
            {startIcon}
          </div>
        )}
        {startText && (
          <div className="absolute left-3 flex items-center text-sm text-muted-foreground">
            {startText}
          </div>
        )}
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child) && child.type === Input) {
            return React.cloneElement(child, {
              className: cn(
                (startIcon || startText) && 'pl-10',
                (endIcon || endText) && 'pr-10',
                child.props.className
              ),
            } as any);
          }
          return child;
        })}
        {endIcon && (
          <div className="absolute right-3 flex items-center text-muted-foreground">
            {endIcon}
          </div>
        )}
        {endText && (
          <div className="absolute right-3 flex items-center text-sm text-muted-foreground">
            {endText}
          </div>
        )}
      </div>
    );
  }
);
InputGroup.displayName = 'InputGroup';

export { InputGroup };

