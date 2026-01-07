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
import * as React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, Search, ChevronDown, Filter, ChevronRight } from 'lucide-react';
import { ColumnDef, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, useReactTable, flexRender } from '@tanstack/react-table';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

interface SettingsAppCatalogProps {
  className?: string;
  variant?: 'default' | 'manageAppSpecificForms';
}

interface TableData {
  id: string;
  application: string;
  applicationOwner: string;
  formType: 'Custom' | 'Default';
}

const columns: ColumnDef<TableData>[] = [
  {
    accessorKey: 'application',
    header: 'Application',
    cell: ({ row }) => (
      <a href="#" className="text-primary hover:underline">
        {row.getValue('application')}
      </a>
    ),
  },
  {
    accessorKey: 'applicationOwner',
    header: 'Application owner',
    cell: ({ row }) => (
      <a href="#" className="text-primary hover:underline">
        {row.getValue('applicationOwner')}
      </a>
    ),
  },
  {
    accessorKey: 'formType',
    header: 'Form type',
  },
  {
    id: 'actions',
    header: '',
    cell: () => (
      <Button variant="secondary" size="sm">
        Configure
      </Button>
    ),
  },
];

const tableData: TableData[] = [
  {
    id: '1',
    application: 'Salesforce',
    applicationOwner: 'John Doe',
    formType: 'Custom',
  },
  {
    id: '2',
    application: 'Slack',
    applicationOwner: 'Jane Smith',
    formType: 'Default',
  },
  {
    id: '3',
    application: 'GitHub',
    applicationOwner: 'Bob Johnson',
    formType: 'Custom',
  },
  {
    id: '4',
    application: 'Microsoft Teams',
    applicationOwner: 'Alice Williams',
    formType: 'Default',
  },
  {
    id: '5',
    application: 'Jira',
    applicationOwner: 'Charlie Brown',
    formType: 'Custom',
  },
  {
    id: '6',
    application: 'Confluence',
    applicationOwner: 'Diana Prince',
    formType: 'Default',
  },
  {
    id: '7',
    application: 'Notion',
    applicationOwner: 'Edward Norton',
    formType: 'Custom',
  },
  {
    id: '8',
    application: 'Asana',
    applicationOwner: 'Fiona Apple',
    formType: 'Default',
  },
  {
    id: '9',
    application: 'Trello',
    applicationOwner: 'George Lucas',
    formType: 'Custom',
  },
  {
    id: '10',
    application: 'Monday.com',
    applicationOwner: 'Helen Hunt',
    formType: 'Default',
  },
  {
    id: '11',
    application: 'Linear',
    applicationOwner: 'Ian McKellen',
    formType: 'Custom',
  },
  {
    id: '12',
    application: 'Figma',
    applicationOwner: 'Julia Roberts',
    formType: 'Default',
  },
];

export function SettingsAppCatalog({ className, variant = 'default' }: SettingsAppCatalogProps) {
  const isManageAppSpecificForms = variant === 'manageAppSpecificForms';
  const [searchQuery, setSearchQuery] = React.useState('');
  const [formTypeFilter, setFormTypeFilter] = React.useState<string>('all');
  const [isFilterOpen, setIsFilterOpen] = React.useState(false);
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const filteredData = React.useMemo(() => {
    let filtered = [...tableData];
    
    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (item) =>
          item.application.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.applicationOwner.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Apply form type filter
    if (formTypeFilter !== 'all') {
      filtered = filtered.filter((item) => item.formType === formTypeFilter);
    }
    
    return filtered;
  }, [searchQuery, formTypeFilter]);

  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    state: {
      pagination,
    },
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
  });

  return (
    <div className={cn('mx-auto flex h-screen w-full max-w-[1200px] flex-col bg-background overflow-x-hidden', className)}>
      {/* Top Navigation Bar */}
      <GlobalHeader />

      {/* Main Content Area with Navigation Sidebar */}
      <SidebarProvider>
        <Sidebar className="flex flex-1 overflow-hidden">
          {/* Navigation Sidebar */}
          <NavigationSidebar defaultSelected="Settings" />

          {/* Main Body */}
          <main className="flex flex-1 flex-col overflow-hidden bg-background min-w-0">
          {/* Page Header */}
          <header className="border-b bg-background px-6 py-4">
            {isManageAppSpecificForms ? (
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <ChevronLeft className="h-4 w-4" />
                      <span className="sr-only">Back</span>
                    </Button>
                  </BreadcrumbItem>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="#">Request form</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator>
                    <svg
                      className="h-4 w-4 fill-current"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M10 6L18 12L10 18V6Z" />
                    </svg>
                  </BreadcrumbSeparator>
                  <BreadcrumbItem>
                    <BreadcrumbPage>Application Specific Forms</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            ) : (
              <h1 className="text-3xl font-bold">Settings</h1>
            )}
          </header>

          {/* Body - Full Width Content */}
          <div className="flex flex-1 overflow-hidden">
            {/* Content Area - Full Width */}
            <div className="flex-1 overflow-auto bg-background p-8 min-w-0">
              {isManageAppSpecificForms ? (
                <div className="space-y-4">
                  {/* Search, Filter Controls and Pagination */}
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <Button variant="secondary" size="sm">Managed apps</Button>
                      <Button variant="secondary" size="sm">Customized</Button>
                      <Button variant="secondary" size="sm">Non-customized</Button>
                      <div className="flex">
                        <DropdownMenu open={isFilterOpen} onOpenChange={setIsFilterOpen}>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="secondary"
                              size="sm"
                              className="rounded-r-none border-r px-2 min-w-9"
                            >
                              <Filter className="h-4 w-4" />
                              <span className="sr-only">Open filter menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="start" className="w-48">
                            <DropdownMenuItem
                              onClick={() => {
                                setFormTypeFilter('all');
                                setIsFilterOpen(false);
                              }}
                            >
                              All
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => {
                                setIsFilterOpen(false);
                              }}
                            >
                              Application
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => {
                                setIsFilterOpen(false);
                              }}
                            >
                              User
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => {
                                setIsFilterOpen(false);
                              }}
                            >
                              License
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => {
                                setIsFilterOpen(false);
                              }}
                            >
                              Contract
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => {
                                setIsFilterOpen(false);
                              }}
                            >
                              Cost
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => {
                                setIsFilterOpen(false);
                              }}
                            >
                              Spend
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => {
                                setIsFilterOpen(false);
                              }}
                            >
                              Usage
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => {
                                setIsFilterOpen(false);
                              }}
                            >
                              Optimization
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => {
                                setIsFilterOpen(false);
                              }}
                            >
                              Security
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => {
                                setIsFilterOpen(false);
                              }}
                            >
                              Source
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => {
                                setFormTypeFilter('Custom');
                                setIsFilterOpen(false);
                              }}
                            >
                              Custom
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                        <Button
                          variant="secondary"
                          size="sm"
                          className="rounded-l-none border-l-0 px-2 min-w-9"
                          onClick={() => setIsFilterOpen(!isFilterOpen)}
                        >
                          <ChevronDown className="h-4 w-4" />
                          <span className="sr-only">Open filter menu</span>
                        </Button>
                      </div>
                    </div>
                    {/* Pagination and Search */}
                    <div className="flex items-center gap-2">
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="secondary" size="sm" className="px-2 min-w-9">
                            <Search className="h-4 w-4" />
                            <span className="sr-only">Search</span>
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-80" align="end">
                          <div className="space-y-2">
                            <h4 className="font-medium text-sm">Search Keywords</h4>
                            <Input
                              placeholder="Enter keywords..."
                              value={searchQuery}
                              onChange={(e) => setSearchQuery(e.target.value)}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                  e.currentTarget.blur();
                                }
                              }}
                            />
                            <p className="text-xs text-muted-foreground">
                              Search by application name or owner
                            </p>
                          </div>
                        </PopoverContent>
                      </Popover>
                      <div className="h-6 w-px bg-border mx-3"></div>
                      <div className="text-sm text-muted-foreground">
                        {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1}-
                        {Math.min(
                          (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
                          table.getFilteredRowModel().rows.length
                        )}{' '}
                        of {table.getFilteredRowModel().rows.length} Apps
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                        className="h-8 w-8"
                      >
                        <ChevronLeft className="h-4 w-4" />
                        <span className="sr-only">Previous</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                        className="h-8 w-8"
                      >
                        <ChevronRight className="h-4 w-4" />
                        <span className="sr-only">Next</span>
                      </Button>
                    </div>
                  </div>

                  {/* Data Table */}
                  <div className="rounded-md border overflow-hidden" style={{ height: 'calc(100vh - 280px)', display: 'flex', flexDirection: 'column' }}>
                    <div className="overflow-auto flex-1" style={{ scrollbarGutter: 'stable' }}>
                      <table className="w-full caption-bottom text-sm table-fixed">
                        <colgroup>
                          <col style={{ width: '30%' }} />
                          <col style={{ width: '30%' }} />
                          <col style={{ width: '20%' }} />
                          <col style={{ width: '20%' }} />
                        </colgroup>
                        <thead className="[&_tr]:border-b sticky top-0 z-50 bg-muted shadow-sm">
                          {table.getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup.id} className="border-b bg-muted">
                              {headerGroup.headers.map((header) => (
                                <th key={header.id} className="h-12 px-4 text-left align-middle text-xs text-muted-foreground uppercase bg-muted [&:has([role=checkbox])]:pr-0">
                                  {header.isPlaceholder
                                    ? null
                                    : flexRender(
                                        header.column.columnDef.header,
                                        header.getContext()
                                      )}
                                </th>
                              ))}
                            </tr>
                          ))}
                        </thead>
                        <tbody className="[&_tr:last-child]:border-0">
                          {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                              <tr
                                key={row.id}
                                data-state={row.getIsSelected() && 'selected'}
                                className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                              >
                                {row.getVisibleCells().map((cell) => (
                                  <td key={cell.id} className="px-4 py-4 align-middle [&:has([role=checkbox])]:pr-0">
                                    {flexRender(
                                      cell.column.columnDef.cell,
                                      cell.getContext()
                                    )}
                                  </td>
                                ))}
                              </tr>
                            ))
                          ) : (
                            <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                              <td
                                colSpan={columns.length}
                                className="h-24 text-center px-4 py-4 align-middle [&:has([role=checkbox])]:pr-0"
                              >
                                No results.
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-8 max-w-4xl">
                  {/* Content Header */}
                  <h2 className="text-2xl font-bold text-foreground mb-8">App Catalog</h2>
                  {/* Application configuration Section */}
                  <div>
                    <h2 className="text-lg font-semibold text-foreground tracking-tight mb-6">Application configuration</h2>
                    <div className="text-muted-foreground mb-4">...</div>
                    <div className="border-t border-border"></div>
                  </div>

                  {/* Request form Section */}
                  <div>
                    <h2 className="text-lg font-semibold text-foreground tracking-tight mb-6">Request form</h2>
                    <div className="space-y-6">
                      {/* Default Form Section */}
                      <div className="flex items-start justify-between gap-6">
                        <div className="flex-1 space-y-2 pb-4">
                          <h3 className="text-base font-semibold text-foreground leading-tight">
                            Default Form
                          </h3>
                          <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl">
                            Add and configure custom fields to customize your app request form. These fields can be used in workflows elsewhere.
                          </p>
                        </div>
                        <Button className="shrink-0 w-[180px]">Edit Default Form</Button>
                      </div>

                      {/* Application Specific Forms Section */}
                      <div className="flex items-start justify-between gap-6">
                        <div className="flex-1 space-y-2">
                          <h3 className="text-base font-semibold text-foreground leading-tight">
                            Application Specific Forms
                          </h3>
                          <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl">
                            The default form is the base. You can show or hide inherited fields from default form per app and add app-specific fields.
                          </p>
                        </div>
                        <Button className="shrink-0 w-[180px]">Manage App Forms</Button>
                      </div>
                    </div>
                  </div>

                  {/* Divider between Request form and Branding */}
                  <div className="border-t border-border"></div>

                  {/* Branding Section */}
                  <div>
                    <h2 className="text-lg font-semibold text-foreground tracking-tight mb-6">Branding</h2>
                    <div className="text-muted-foreground mb-4">...</div>
                    <div className="border-t border-border"></div>
                  </div>

                  {/* Theme Section */}
                  <div>
                    <h2 className="text-lg font-semibold text-foreground tracking-tight mb-6">Theme</h2>
                    <div className="text-muted-foreground mb-4">...</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
        </Sidebar>
      </SidebarProvider>
    </div>
  );
}


