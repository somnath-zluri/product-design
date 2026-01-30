import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { InputGroup } from '@/components/ui/input-group';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface GlobalHeaderProps {
  className?: string;
  /** Optional actions (e.g. Preview, Save changes) rendered before the avatar */
  actions?: React.ReactNode;
}

export function GlobalHeader({ className, actions }: GlobalHeaderProps) {
  return (
    <header className={`flex h-16 items-center justify-between border-b border-border/40 bg-[#1a1a1a] px-6 ${className || ''}`}>
      {/* Left: Logo */}
      <div className="flex items-center">
        <div className="text-xl font-semibold text-white">
          IGA
        </div>
      </div>

      {/* Center: Global Search */}
      <div className="flex flex-1 items-center justify-center px-8">
        <div className="w-full max-w-md">
          <InputGroup startIcon={<Search className="h-4 w-4 text-muted-foreground" />}>
            <Input placeholder="Search..." className="w-full bg-[#2a2a2a] border-border/40 text-foreground placeholder:text-muted-foreground" />
          </InputGroup>
        </div>
      </div>

      {/* Right: Actions + Avatar */}
      <div className="flex items-center gap-2">
        {actions}
        <Avatar>
          <AvatarFallback className="bg-[#2a2a2a] text-white">U</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}

