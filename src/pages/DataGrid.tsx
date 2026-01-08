import * as React from 'react';
import ReactDataGrid from '@inovua/reactdatagrid-community';
import '@inovua/reactdatagrid-community/index.css';
import { cn } from '@/lib/utils';

interface DataGridProps {
  className?: string;
}

interface DataRow {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  lastActive: string;
}

const defaultData: DataRow[] = [
  { id: 1, name: 'John Doe', email: 'john.doe@example.com', role: 'Admin', status: 'Active', lastActive: '2024-01-15' },
  { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', role: 'User', status: 'Active', lastActive: '2024-01-14' },
  { id: 3, name: 'Bob Johnson', email: 'bob.johnson@example.com', role: 'User', status: 'Inactive', lastActive: '2024-01-10' },
  { id: 4, name: 'Alice Williams', email: 'alice.williams@example.com', role: 'Manager', status: 'Active', lastActive: '2024-01-15' },
  { id: 5, name: 'Charlie Brown', email: 'charlie.brown@example.com', role: 'User', status: 'Active', lastActive: '2024-01-13' },
  { id: 6, name: 'Diana Prince', email: 'diana.prince@example.com', role: 'Admin', status: 'Active', lastActive: '2024-01-15' },
  { id: 7, name: 'Edward Norton', email: 'edward.norton@example.com', role: 'User', status: 'Inactive', lastActive: '2024-01-08' },
  { id: 8, name: 'Fiona Apple', email: 'fiona.apple@example.com', role: 'User', status: 'Active', lastActive: '2024-01-14' },
  { id: 9, name: 'George Lucas', email: 'george.lucas@example.com', role: 'Manager', status: 'Active', lastActive: '2024-01-15' },
  { id: 10, name: 'Helen Hunt', email: 'helen.hunt@example.com', role: 'User', status: 'Active', lastActive: '2024-01-12' },
];

const columns = [
  { name: 'id', header: 'ID', defaultWidth: 80, type: 'number' },
  { name: 'name', header: 'Name', defaultFlex: 1, minWidth: 150 },
  { name: 'email', header: 'Email', defaultFlex: 1, minWidth: 200 },
  { name: 'role', header: 'Role', defaultWidth: 120 },
  { name: 'status', header: 'Status', defaultWidth: 120 },
  { name: 'lastActive', header: 'Last Active', defaultWidth: 150 },
];

export function DataGrid({ className }: DataGridProps) {
  const [data, setData] = React.useState<DataRow[]>(defaultData);

  return (
    <div className={cn('w-full h-full p-6', className)}>
      <div className="mb-4">
        <h1 className="text-2xl font-bold mb-2">Inovua React DataGrid</h1>
        <p className="text-muted-foreground">A powerful data grid component with sorting, filtering, and pagination.</p>
      </div>
      <div style={{ height: 'calc(100vh - 200px)', minHeight: '400px' }}>
        <ReactDataGrid
          idProperty="id"
          dataSource={data}
          columns={columns}
          defaultLimit={10}
          pagination
          sortable
          filterable
          style={{ minHeight: '100%' }}
        />
      </div>
    </div>
  );
}


