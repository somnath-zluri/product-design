import * as React from 'react';
import { PanelLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from './button';

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  side?: 'left' | 'right';
  variant?: 'sidebar' | 'floating' | 'inset';
  collapsible?: 'offcanvas' | 'icon' | 'none';
  theme?: 'light' | 'dark';
}

const SidebarContext = React.createContext<{
  state: 'expanded' | 'collapsed';
  open: boolean;
  setOpen: (open: boolean) => void;
}>({
  state: 'expanded',
  open: false,
  setOpen: () => {},
});

const Sidebar = React.forwardRef<HTMLDivElement, SidebarProps>(
  ({ className, side = 'left', variant = 'sidebar', theme, children, ...props }, ref) => {
    const [open, setOpen] = React.useState(false);
    const [state] = React.useState<'expanded' | 'collapsed'>('expanded');

    return (
      <SidebarContext.Provider value={{ state, open, setOpen }}>
        <div
          ref={ref}
          className={cn(
            'flex h-screen w-full',
            side === 'right' && 'flex-row-reverse',
            theme === 'dark' && 'dark',
            className
          )}
          {...props}
        >
          {children}
        </div>
      </SidebarContext.Provider>
    );
  }
);
Sidebar.displayName = 'Sidebar';

const SidebarTrigger = React.forwardRef<
  React.ElementRef<typeof Button>,
  React.ComponentProps<typeof Button>
>(({ className, ...props }, ref) => {
  const { setOpen } = React.useContext(SidebarContext);

  return (
    <Button
      ref={ref}
      variant="ghost"
      size="icon"
      className={cn('h-7 w-7', className)}
      onClick={() => setOpen(true)}
      {...props}
    >
      <PanelLeft className="h-4 w-4" />
      <span className="sr-only">Toggle Sidebar</span>
    </Button>
  );
});
SidebarTrigger.displayName = 'SidebarTrigger';

const SidebarContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        'flex h-full w-64 flex-col border-r bg-background',
        className
      )}
      {...props}
    />
  );
});
SidebarContent.displayName = 'SidebarContent';

const SidebarHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn('flex h-16 items-center border-b px-6', className)}
      {...props}
    />
  );
});
SidebarHeader.displayName = 'SidebarHeader';

const SidebarFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn('flex h-16 items-center border-t px-6', className)}
      {...props}
    />
  );
});
SidebarFooter.displayName = 'SidebarFooter';

const SidebarMain = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <main
      ref={ref}
      className={cn('flex-1 overflow-auto', className)}
      {...props}
    />
  );
});
SidebarMain.displayName = 'SidebarMain';

const SidebarMenu = React.forwardRef<
  HTMLUListElement,
  React.HTMLAttributes<HTMLUListElement>
>(({ className, ...props }, ref) => {
  return (
    <ul
      ref={ref}
      className={cn('flex flex-col gap-1 p-4 w-full', className)}
      {...props}
    />
  );
});
SidebarMenu.displayName = 'SidebarMenu';

const SidebarMenuItem = React.forwardRef<
  HTMLLIElement,
  React.HTMLAttributes<HTMLLIElement>
>(({ className, ...props }, ref) => {
  return (
    <li
      ref={ref}
      className={cn('', className)}
      {...props}
    />
  );
});
SidebarMenuItem.displayName = 'SidebarMenuItem';

const SidebarMenuButton = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    isActive?: boolean;
  }
>(({ className, isActive, ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={cn(
        'flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground',
        isActive && 'bg-accent text-accent-foreground',
        className
      )}
      {...props}
    />
  );
});
SidebarMenuButton.displayName = 'SidebarMenuButton';

const SidebarProvider = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = React.useState(false);

  return (
    <SidebarContext.Provider value={{ state: 'expanded', open, setOpen }}>
      {children}
    </SidebarContext.Provider>
  );
};

export {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarMain,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  SidebarTrigger,
};

