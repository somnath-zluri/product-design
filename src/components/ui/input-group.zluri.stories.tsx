import type { Meta, StoryObj } from '@storybook/react';
import { InputGroup } from './input-group';
import { Input } from './input';
import { Search, Mail, DollarSign } from 'lucide-react';

const meta = {
  title: 'Zluri Components/InputGroup',
  component: InputGroup,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof InputGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithStartIcon: Story = {
  render: () => (
    <InputGroup startIcon={<Search className="h-4 w-4" />}>
      <Input placeholder="Search..." />
    </InputGroup>
  ),
};

export const WithEndIcon: Story = {
  render: () => (
    <InputGroup endIcon={<Mail className="h-4 w-4" />}>
      <Input type="email" placeholder="Email" />
    </InputGroup>
  ),
};

export const WithBothIcons: Story = {
  render: () => (
    <InputGroup
      startIcon={<DollarSign className="h-4 w-4" />}
      endText=".00"
    >
      <Input type="number" placeholder="0" />
    </InputGroup>
  ),
};

export const WithText: Story = {
  render: () => (
    <InputGroup startText="https://" endText=".com">
      <Input placeholder="example" />
    </InputGroup>
  ),
};

