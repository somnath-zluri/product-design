import type { Meta, StoryObj } from '@storybook/react';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import { useState } from 'react';
import { ChevronLeft } from 'lucide-react';
import { UAR } from './UAR';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetClose,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const meta = {
  title: 'Pages/UAR',
  component: UAR,
  parameters: {
    layout: 'fullscreen',
    viewport: {
      viewports: INITIAL_VIEWPORTS,
    },
  },
  decorators: [
    (Story) => (
      <div style={{ height: '100vh', width: '100%' }}>
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
} satisfies Meta<typeof UAR>;

export default meta;
type Story = StoryObj<typeof meta>;

export const UARStory: Story = {
  name: 'Issue - Dropdown Clipping',
  render: () => <UAR showLeftPanel={false} />,
};

export const UARStoryCopy: Story = {
  name: 'Issue - Dropdown Clipping (Copy)',
  render: () => <UAR showLeftPanel={false} />,
};

const COLUMN_HEADERS = Array.from({ length: 10 }, (_, j) => `Col ${j + 1}`);

function SidesheetNestedNavigationDemo() {
  const [open, setOpen] = useState(false);
  const [view, setView] = useState<'table' | 'detail'>('table');
  const [selectedHeader, setSelectedHeader] = useState<string | null>(null);

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) {
      setView('table');
      setSelectedHeader(null);
    }
    setOpen(nextOpen);
  };

  const handleCellClick = (columnIndex: number) => {
    setSelectedHeader(COLUMN_HEADERS[columnIndex]);
    setView('detail');
  };

  const handleBack = () => {
    setView('table');
    setSelectedHeader(null);
  };

  const renderTable = () => (
    <Table>
      <TableHeader>
        <TableRow>
          {COLUMN_HEADERS.map((header, j) => (
            <TableHead key={j}>{header}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {Array.from({ length: 10 }, (_, i) => (
          <TableRow key={i}>
            {Array.from({ length: 10 }, (_, j) => (
              <TableCell
                key={j}
                className="cursor-pointer hover:bg-muted/50 transition-colors"
                onClick={() => handleCellClick(j)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleCellClick(j);
                  }
                }}
                role="button"
                tabIndex={0}
              >
                Row {i + 1} - Col {j + 1}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );

  const renderDetail = () => (
    <p className="text-muted-foreground">
      Detail for {selectedHeader ?? '—'}
    </p>
  );

  const renderHeaderContentForView = (headerView: 'table' | 'detail') =>
    headerView === 'table' ? (
      <SheetTitle>Set Defaults For User Data Columns</SheetTitle>
    ) : (
      <div className="flex items-center gap-2">
        <Button
          variant="secondary"
          size="sm"
          onClick={handleBack}
          aria-label="Back to table"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <SheetTitle>
          Sidesheet - {selectedHeader ?? 'Detail'}
        </SheetTitle>
      </div>
    );

  return (
    <div className="flex h-full flex-col items-center justify-center gap-4 p-8 bg-muted/30">
      <Button variant="outline" onClick={() => setOpen(true)}>
        Demo
      </Button>
      <Sheet open={open} onOpenChange={handleOpenChange}>
        <SheetContent
          side="right"
          className="flex flex-col"
          style={{ width: '80vw', maxWidth: '80vw' }}
        >
          <SheetHeader>
            <div
              key={view}
              className="animate-in fade-in-0 fill-mode-forwards"
              style={{ animationDuration: '450ms' }}
            >
              {renderHeaderContentForView(view)}
            </div>
          </SheetHeader>
          <div className="flex flex-1 min-h-0 flex-col overflow-hidden py-4 px-4">
            <div
              key={view}
              className={`flex-1 min-h-0 overflow-auto animate-in duration-300 ${
                view === 'detail' ? 'slide-in-from-right' : 'slide-in-from-left'
              }`}
            >
              {view === 'table' ? renderTable() : renderDetail()}
            </div>
          </div>
          <SheetFooter>
            <div className="flex gap-2">
              <SheetClose asChild>
                <Button variant="outline">Cancel</Button>
              </SheetClose>
              <Button variant="outline">Reset</Button>
            </div>
            <Button>Save</Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}

export const SidesheetNestedNavigation: Story = {
  name: 'Sidesheet Nested Navigation',
  render: () => <SidesheetNestedNavigationDemo />,
};

