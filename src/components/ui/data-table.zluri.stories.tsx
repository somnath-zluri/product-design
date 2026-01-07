import type { Meta, StoryObj } from '@storybook/react';
import { DataTable } from './data-table';
import { ColumnDef } from '@tanstack/react-table';

const meta = {
  title: 'Zluri Components/DataTable',
  component: DataTable,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof DataTable>;

export default meta;
type Story = StoryObj<typeof meta>;

type Payment = {
  id: string;
  amount: number;
  status: 'pending' | 'processing' | 'success' | 'failed';
  email: string;
};

const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: 'status',
    header: 'Status',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'amount',
    header: 'Amount',
  },
];

const data: Payment[] = [
  {
    id: '1',
    amount: 100,
    status: 'pending',
    email: 'm@example.com',
  },
  {
    id: '2',
    amount: 200,
    status: 'processing',
    email: 'a@example.com',
  },
  {
    id: '3',
    amount: 300,
    status: 'success',
    email: 'b@example.com',
  },
];

export const Default: Story = {
  args: {} as any,
  render: () => <DataTable columns={columns} data={data} />,
};

