import { cn } from '@/lib/utils';
import { GlobalHeader } from '@/components/ui/global-header';
import { NavigationSidebar } from '@/components/ui/navigation-sidebar';
import { SidebarProvider, Sidebar } from '@/components/ui/sidebar';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { VerticalStepper, HorizontalStepper } from '@/components/ui/stepper';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import * as React from 'react';
import { ChevronLeft, Search, ChevronRight, AlignLeft, AlignCenter, AlignRight } from 'lucide-react';
import { FaApple, FaWindows } from 'react-icons/fa';
import {
  ColumnDef,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
  flexRender,
} from '@tanstack/react-table';

interface UARProps {
  className?: string;
  controlsBelowTitle?: boolean;
}

interface TableData {
  id: string;
  user: string;
  email: string;
  status: string;
}

const columns: ColumnDef<TableData>[] = [
  {
    accessorKey: 'user',
    header: 'User',
  },
  {
    accessorKey: 'email',
    header: 'Email ID',
  },
  {
    accessorKey: 'status',
    header: 'Status',
  },
];

const tableData: TableData[] = [
  { id: '1', user: 'Courtney Henry', email: 'courtney.henry@example.com', status: 'Active' },
  { id: '2', user: 'John Doe', email: 'john.doe@example.com', status: 'Active' },
  { id: '3', user: 'Jane Smith', email: 'jane.smith@example.com', status: 'Active' },
  { id: '4', user: 'Bob Johnson', email: 'bob.johnson@example.com', status: 'Active' },
  { id: '5', user: 'Alice Williams', email: 'alice.williams@example.com', status: 'Active' },
  { id: '6', user: 'Charlie Brown', email: 'charlie.brown@example.com', status: 'Active' },
  { id: '7', user: 'Diana Prince', email: 'diana.prince@example.com', status: 'Active' },
  { id: '8', user: 'Edward Norton', email: 'edward.norton@example.com', status: 'Active' },
  { id: '9', user: 'Fiona Apple', email: 'fiona.apple@example.com', status: 'Active' },
  { id: '10', user: 'George Lucas', email: 'george.lucas@example.com', status: 'Active' },
  { id: '11', user: 'Helen Hunt', email: 'helen.hunt@example.com', status: 'Active' },
  { id: '12', user: 'Ian McKellen', email: 'ian.mckellen@example.com', status: 'Active' },
  { id: '13', user: 'Julia Roberts', email: 'julia.roberts@example.com', status: 'Active' },
  { id: '14', user: 'Kevin Spacey', email: 'kevin.spacey@example.com', status: 'Active' },
  { id: '15', user: 'Laura Dern', email: 'laura.dern@example.com', status: 'Active' },
  { id: '16', user: 'Mark Ruffalo', email: 'mark.ruffalo@example.com', status: 'Active' },
  { id: '17', user: 'Natalie Portman', email: 'natalie.portman@example.com', status: 'Active' },
  { id: '18', user: 'Oscar Isaac', email: 'oscar.isaac@example.com', status: 'Active' },
  { id: '19', user: 'Penelope Cruz', email: 'penelope.cruz@example.com', status: 'Active' },
  { id: '20', user: 'Quentin Tarantino', email: 'quentin.tarantino@example.com', status: 'Active' },
];

const verticalSteps = [
  { label: 'Certification Details' },
  { label: 'Set up Certification' },
  { label: 'Complete Setup' },
];

const horizontalSteps = [
  { label: 'Scope Applications' },
  { label: 'Scope Users' },
  { label: 'Set Defaults (Optional)' },
  { label: 'Configure Applications' },
];

export function UAR({ className, controlsBelowTitle = false }: UARProps) {
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 20,
  });
  const [searchOpen, setSearchOpen] = React.useState(false);
  const [currentHorizontalStep, setCurrentHorizontalStep] = React.useState(1);
  const [currentVerticalStep, setCurrentVerticalStep] = React.useState(1);
  const [dropdownAlign, setDropdownAlign] = React.useState<'start' | 'center' | 'end'>('center');

  const table = useReactTable({
    data: tableData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    state: {
      pagination,
    },
    initialState: {
      pagination: {
        pageSize: 20,
      },
    },
  });

  return (
    <div className={cn('mx-auto flex h-screen w-full flex-col bg-background overflow-x-hidden', className)}>
      {/* Top Navigation Bar */}
      <GlobalHeader />

      {/* Main Content Area with Navigation Sidebar */}
      <SidebarProvider>
        <Sidebar className="flex flex-1 overflow-hidden">
          {/* Navigation Sidebar */}
          <NavigationSidebar defaultSelected="Access Requests" />

          {/* Main Body */}
          <main className="flex flex-1 flex-col overflow-hidden bg-background min-w-0">
            {/* Breadcrumb */}
            <div className="border-b bg-background px-6 py-4">
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <ChevronLeft className="h-4 w-4" />
                      <span className="sr-only">Back</span>
                    </Button>
                  </BreadcrumbItem>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="#">Create Certification</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage>Untitled Certification</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>

            {/* Two Column Layout */}
            <div className="flex flex-1 overflow-hidden">
              {/* Left Column - Vertical Stepper */}
              <div className="w-[200px] border-r bg-background p-3">
                <VerticalStepper steps={verticalSteps} currentStep={currentVerticalStep} />
              </div>

              {/* Right Column - Main Content */}
              <div className="flex flex-1 flex-col overflow-hidden">
                {/* Header - Title and Horizontal Stepper */}
                <header className="border-b bg-background px-6 py-4">
                  <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">{verticalSteps[currentVerticalStep]?.label || 'Setup Certification'}</h1>
                    <HorizontalStepper steps={horizontalSteps} currentStep={currentHorizontalStep} />
                  </div>
                </header>

                {/* Content Area - Two Columns */}
                <div className="flex flex-1 overflow-hidden">
                  {/* Left Column - Title and Footer */}
                  <div className="w-[464px] border-r bg-background flex flex-col">
                    <div className="p-6">
                    </div>
                    {/* Footer - Inside First Column of Product Area */}
                    <footer className="mt-auto border-t bg-background px-6 py-4">
                      <div className="flex items-center justify-between">
                        <Button variant="outline">Exit</Button>
                        <div className="flex gap-2">
                          <Button variant="outline">Previous</Button>
                          <Button>Next</Button>
                        </div>
                      </div>
                    </footer>
                  </div>

                  {/* Right Column - DataTable with Controls */}
                  <div className="flex flex-1 flex-col overflow-hidden bg-background">
                    {/* Controls */}
                    {controlsBelowTitle ? (
                      <div className="border-b bg-background px-4 py-4">
                        <div className="flex items-center gap-4 mb-4">
                          <div className="relative">
                            <label className="absolute bg-background px-1 text-[10px] text-muted-foreground z-10" style={{ left: '10px', top: '-5px' }}>
                              Preview Users From
                            </label>
                            <Select defaultValue="Figma">
                              <SelectTrigger className="w-[144px]">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Figma">Figma</SelectItem>
                                <SelectItem value="Sketch">Sketch</SelectItem>
                                <SelectItem value="Adobe XD">Adobe XD</SelectItem>
                                <SelectItem value="Framer">Framer</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <Popover open={searchOpen} onOpenChange={setSearchOpen}>
                            <PopoverTrigger asChild>
                              <Button variant="outline" size="icon" className="h-10 w-10">
                                <Search className="h-4 w-4" />
                                <span className="sr-only">Search</span>
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent 
                              className="w-[300px] p-0" 
                              align={dropdownAlign}
                            >
                              <div className="p-3 border-b">
                                <div className="flex flex-col items-start justify-start gap-2">
                                  <div className="w-full relative">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                    <Input
                                      placeholder="Search users"
                                      className="pl-9 pr-3 w-full"
                                      onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                          // Handle search
                                        }
                                      }}
                                    />
                                  </div>
                                  <div className="text-xs text-muted-foreground shrink-0 whitespace-nowrap flex items-center gap-1.5">
                                    Press{' '}
                                    <span className="inline-flex items-center gap-1 rounded px-1.5 py-0.5 bg-muted text-muted-foreground text-xs font-medium">
                                      Return
                                      <FaApple className="h-3 w-3" />
                                    </span>
                                    {' '}/{' '}
                                    <span className="inline-flex items-center gap-1 rounded px-1.5 py-0.5 bg-muted text-muted-foreground text-xs font-medium">
                                      Enter
                                      <FaWindows className="h-3 w-3" />
                                    </span>
                                    {' '}to search
                                  </div>
                                </div>
                              </div>
                            </PopoverContent>
                          </Popover>
                          <Separator orientation="vertical" className="h-6" />
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-muted-foreground">
                              {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1}-
                              {Math.min(
                                (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
                                table.getRowModel().rows.length
                              )}{' '}
                              of {table.getRowModel().rows.length} Users
                            </span>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => table.previousPage()}
                              disabled={!table.getCanPreviousPage()}
                              className="h-6 w-6"
                            >
                              <ChevronLeft className="h-4 w-4" />
                              <span className="sr-only">Previous</span>
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => table.nextPage()}
                              disabled={!table.getCanNextPage()}
                              className="h-6 w-6"
                            >
                              <ChevronRight className="h-4 w-4" />
                              <span className="sr-only">Next</span>
                            </Button>
                          </div>
                          <Separator orientation="vertical" className="h-6" />
                        </div>
                      </div>
                    ) : (
                      <div className="border-b bg-background px-4 py-4 flex items-center justify-between gap-4">
                        <div className="relative">
                          <label className="absolute bg-background px-1 text-[10px] text-muted-foreground z-10" style={{ left: '10px', top: '-5px' }}>
                            Preview Users From
                          </label>
                          <Select defaultValue="Figma">
                            <SelectTrigger className="w-[144px]">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Figma">Figma</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="flex items-center gap-4">
                          <Popover open={searchOpen} onOpenChange={setSearchOpen}>
                            <PopoverTrigger asChild>
                              <Button variant="outline" size="icon" className="h-10 w-10">
                                <Search className="h-4 w-4" />
                                <span className="sr-only">Search</span>
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent 
                              className="w-[300px] p-0" 
                              align={dropdownAlign}
                            >
                              <div className="p-3 border-b">
                                <div className="flex flex-col items-start justify-start gap-2">
                                  <div className="w-full relative">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                    <Input
                                      placeholder="Search users"
                                      className="pl-9 pr-3 w-full"
                                      onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                          // Handle search
                                        }
                                      }}
                                    />
                                  </div>
                                  <div className="text-xs text-muted-foreground shrink-0 whitespace-nowrap flex items-center gap-1.5">
                                    Press{' '}
                                    <span className="inline-flex items-center gap-1 rounded px-1.5 py-0.5 bg-muted text-muted-foreground text-xs font-medium">
                                      Return
                                      <FaApple className="h-3 w-3" />
                                    </span>
                                    {' '}/{' '}
                                    <span className="inline-flex items-center gap-1 rounded px-1.5 py-0.5 bg-muted text-muted-foreground text-xs font-medium">
                                      Enter
                                      <FaWindows className="h-3 w-3" />
                                    </span>
                                    {' '}to search
                                  </div>
                                </div>
                              </div>
                            </PopoverContent>
                          </Popover>
                          <Separator orientation="vertical" className="h-6" />
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-muted-foreground">
                              {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1}-
                              {Math.min(
                                (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
                                table.getRowModel().rows.length
                              )}{' '}
                              of {table.getRowModel().rows.length} Users
                            </span>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => table.previousPage()}
                              disabled={!table.getCanPreviousPage()}
                              className="h-6 w-6"
                            >
                              <ChevronLeft className="h-4 w-4" />
                              <span className="sr-only">Previous</span>
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => table.nextPage()}
                              disabled={!table.getCanNextPage()}
                              className="h-6 w-6"
                            >
                              <ChevronRight className="h-4 w-4" />
                              <span className="sr-only">Next</span>
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* DataTable */}
                    <div className="flex-1 overflow-auto px-4">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>User</TableHead>
                            <TableHead>Email ID</TableHead>
                            <TableHead>Status</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                              <TableRow key={row.id}>
                                {row.getVisibleCells().map((cell) => (
                                  <TableCell key={cell.id}>
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                  </TableCell>
                                ))}
                              </TableRow>
                            ))
                          ) : (
                            <TableRow>
                              <TableCell colSpan={columns.length} className="h-24 text-center">
                                No results.
                              </TableCell>
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </Sidebar>
      </SidebarProvider>
    </div>
  );
}

