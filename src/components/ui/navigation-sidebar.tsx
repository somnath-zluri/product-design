import * as React from 'react';
import {
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from './sidebar';

interface NavigationSidebarProps {
  defaultSelected?: string;
}

export function NavigationSidebar({ defaultSelected = 'Applications' }: NavigationSidebarProps) {
  const [selected, setSelected] = React.useState<string>(defaultSelected);

  const handleClick = (item: string) => {
    setSelected(item);
  };

  const menuItems = [
    'Applications',
    'Directory',
    'Access Requests',
    'Access Reviews',
  ];

  return (
    <SidebarContent className="w-[192px] bg-[#1a1a1a] border-border/40">
      <div className="flex flex-1 flex-col overflow-hidden">
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item}>
              <SidebarMenuButton
                isActive={selected === item}
                onClick={() => handleClick(item)}
                className={selected === item ? 'bg-[#2a2a2a] text-white hover:bg-[#2a2a2a] hover:text-white' : 'text-white hover:bg-[#2a2a2a] hover:text-white'}
              >
                {item}
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </div>
      <SidebarFooter className="flex flex-col items-start border-t border-border/40 p-0">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              isActive={selected === 'Settings'}
              onClick={() => handleClick('Settings')}
              className={selected === 'Settings' ? 'bg-[#2a2a2a] text-white hover:bg-[#2a2a2a] hover:text-white' : 'text-white hover:bg-[#2a2a2a] hover:text-white'}
            >
              Settings
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </SidebarContent>
  );
}

