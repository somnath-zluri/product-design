import * as React from 'react';
import { cn } from '@/lib/utils';
import { Button, buttonVariants, type ButtonProps } from './button';

interface ButtonGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: 'horizontal' | 'vertical';
}

const ButtonGroup = React.forwardRef<HTMLDivElement, ButtonGroupProps>(
  ({ className, orientation = 'horizontal', children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'inline-flex',
          orientation === 'horizontal' ? 'flex-row' : 'flex-col',
          className
        )}
        role="group"
        {...props}
      >
        {React.Children.map(children, (child, index) => {
          if (React.isValidElement<ButtonProps>(child)) {
            return React.cloneElement(child, {
              className: cn(
                buttonVariants({ variant: child.props.variant || 'default' }),
                orientation === 'horizontal'
                  ? index === 0
                    ? 'rounded-r-none'
                    : index === React.Children.count(children) - 1
                      ? 'rounded-l-none'
                      : 'rounded-none'
                  : index === 0
                    ? 'rounded-b-none'
                    : index === React.Children.count(children) - 1
                      ? 'rounded-t-none'
                      : 'rounded-none',
                child.props.className
              ),
            });
          }
          return child;
        })}
      </div>
    );
  }
);
ButtonGroup.displayName = 'ButtonGroup';

export { ButtonGroup };

