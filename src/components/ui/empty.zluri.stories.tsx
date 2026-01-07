import type { Meta, StoryObj } from '@storybook/react';
import { Empty } from './empty';
import { Button } from './button';
import { Package } from 'lucide-react';

const meta = {
  title: 'Zluri Components/Empty',
  component: Empty,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Empty>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Empty
      title="No items found"
      description="Get started by creating a new item."
    />
  ),
};

export const WithIcon: Story = {
  render: () => (
    <Empty
      icon={<Package className="h-12 w-12 text-muted-foreground" />}
      title="No packages"
      description="Your packages will appear here."
    />
  ),
};

export const WithAction: Story = {
  render: () => (
    <Empty
      icon={<Package className="h-12 w-12 text-muted-foreground" />}
      title="No packages"
      description="Your packages will appear here."
    >
      <Button className="mt-4">Create Package</Button>
    </Empty>
  ),
};

