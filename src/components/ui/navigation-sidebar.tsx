import * as React from 'react';
import { Grid, Users, FileText, ClipboardCheck, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarContext,
} from './sidebar';

interface NavigationSidebarProps {
  defaultSelected?: string;
}

interface MenuItem {
  label: string;
  icon: React.ReactNode;
}

export function NavigationSidebar({ defaultSelected = 'Applications' }: NavigationSidebarProps) {
  const [selected, setSelected] = React.useState<string>(defaultSelected);
  const { state } = React.useContext(SidebarContext);
  const isCollapsed = state === 'collapsed';

  const handleClick = (item: string) => {
    setSelected(item);
  };

  const menuItems: MenuItem[] = [
    { label: 'Applications', icon: <Grid className={cn('h-5 w-5', isCollapsed && 'h-6 w-6')} /> },
    { label: 'Directory', icon: <Users className={cn('h-5 w-5', isCollapsed && 'h-6 w-6')} /> },
    { label: 'Access Requests', icon: <FileText className={cn('h-5 w-5', isCollapsed && 'h-6 w-6')} /> },
    { label: 'Access Reviews', icon: <ClipboardCheck className={cn('h-5 w-5', isCollapsed && 'h-6 w-6')} /> },
  ];

  return (
    <SidebarContent className="bg-[#1a1a1a] border-border/40">
      <div className="flex flex-1 flex-col overflow-hidden w-fit">
        <SidebarMenu className={cn(isCollapsed && 'items-center')}>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.label} className={cn(isCollapsed && 'flex justify-center')}>
              <SidebarMenuButton
                isActive={selected === item.label}
                onClick={() => handleClick(item.label)}
                className={cn(
                  selected === item.label ? 'bg-[#2a2a2a] text-white hover:bg-[#2a2a2a] hover:text-white' : 'text-white hover:bg-[#2a2a2a] hover:text-white',
                  isCollapsed && 'justify-center w-8 h-8 p-0'
                )}
                title={isCollapsed ? item.label : undefined}
              >
                {item.icon}
                {!isCollapsed && <span>{item.label}</span>}
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </div>
      <SidebarFooter className="flex flex-col items-start border-t border-border/40 p-0">
        <SidebarMenu className={cn(isCollapsed && 'items-center')}>
          <SidebarMenuItem className={cn(isCollapsed && 'flex justify-center')}>
            <SidebarMenuButton
              isActive={selected === 'Settings'}
              onClick={() => handleClick('Settings')}
              className={cn(
                selected === 'Settings' ? 'bg-[#2a2a2a] text-white hover:bg-[#2a2a2a] hover:text-white' : 'text-white hover:bg-[#2a2a2a] hover:text-white',
                isCollapsed && 'justify-center w-8 h-8 p-0'
              )}
              title={isCollapsed ? 'Settings' : undefined}
            >
              <Settings className={cn('h-5 w-5', isCollapsed && 'h-6 w-6')} />
              {!isCollapsed && <span>Settings</span>}
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </SidebarContent>
  );
}

