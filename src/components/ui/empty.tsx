import * as React from 'react';
import { cn } from '@/lib/utils';

interface EmptyProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
}

const Empty = React.forwardRef<HTMLDivElement, EmptyProps>(
  ({ className, title, description, icon, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'flex min-h-[400px] flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center',
        className
      )}
      {...props}
    >
      {icon && <div className="mb-4">{icon}</div>}
      {title && (
        <h3 className="mt-4 text-lg font-semibold">{title}</h3>
      )}
      {description && (
        <p className="mt-2 text-sm text-muted-foreground">{description}</p>
      )}
      {children}
    </div>
  )
);
Empty.displayName = 'Empty';

export { Empty };

