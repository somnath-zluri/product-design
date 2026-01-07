import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { InputGroup } from '@/components/ui/input-group';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface GlobalHeaderProps {
  className?: string;
}

export function GlobalHeader({ className }: GlobalHeaderProps) {
  return (
    <header className={`flex h-16 items-center justify-between border-b border-border/40 bg-[#1a1a1a] px-6 ${className || ''}`}>
      {/* Left: Logo */}
      <div className="flex items-center">
        <span className="text-xl font-semibold text-white">IGA</span>
      </div>

      {/* Center: Global Search */}
      <div className="flex flex-1 items-center justify-center px-8">
        <div className="w-full max-w-md">
          <InputGroup startIcon={<Search className="h-4 w-4 text-muted-foreground" />}>
            <Input placeholder="Search..." className="w-full bg-[#2a2a2a] border-border/40 text-foreground placeholder:text-muted-foreground" />
          </InputGroup>
        </div>
      </div>

      {/* Right: Avatar */}
      <div className="flex items-center">
        <Avatar>
          <AvatarFallback className="bg-[#2a2a2a] text-white">U</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}

