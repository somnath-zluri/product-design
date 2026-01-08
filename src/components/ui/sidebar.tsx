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
  toggleState: () => void;
}>({
  state: 'expanded',
  open: false,
  setOpen: () => {},
  toggleState: () => {},
});

const Sidebar = React.forwardRef<HTMLDivElement, SidebarProps>(
  ({ className, side = 'left', variant = 'sidebar', theme, children, ...props }, ref) => {
    const [open, setOpen] = React.useState(false);
    const [state, setState] = React.useState<'expanded' | 'collapsed'>('collapsed');
    
    const toggleState = React.useCallback(() => {
      setState((prev) => (prev === 'expanded' ? 'collapsed' : 'expanded'));
    }, []);

    return (
      <SidebarContext.Provider value={{ state, open, setOpen, toggleState }}>
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
  const { toggleState } = React.useContext(SidebarContext);

  return (
    <Button
      ref={ref}
      variant="ghost"
      size="icon"
      className={cn('h-7 w-7', className)}
      onClick={toggleState}
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
  const { state } = React.useContext(SidebarContext);
  const isCollapsed = state === 'collapsed';
  
  return (
    <div
      ref={ref}
      className={cn(
        'flex h-full flex-col border-r bg-background transition-all duration-300',
        'w-fit',
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
      className={cn('flex flex-col gap-3 p-4 w-fit', className)}
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
  const [state, setState] = React.useState<'expanded' | 'collapsed'>('collapsed');
  
  const toggleState = React.useCallback(() => {
    setState((prev) => (prev === 'expanded' ? 'collapsed' : 'expanded'));
  }, []);

  return (
    <SidebarContext.Provider value={{ state, open, setOpen, toggleState }}>
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
  SidebarContext,
};

