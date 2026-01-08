import type { Meta, StoryObj } from '@storybook/react';
import { FloatingLabelInput, FloatingLabelSelect } from './floating-label-field';

const meta = {
  title: 'ShadCN Components/FloatingLabelField',
  component: FloatingLabelInput,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof FloatingLabelInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Input: Story = {
  render: () => (
    <div className="w-[400px]">
      <FloatingLabelInput
        label="Preview users from"
        placeholder="Enter value"
      />
    </div>
  ),
};

export const InputWithValue: Story = {
  render: () => (
    <div className="w-[400px]">
      <FloatingLabelInput
        label="Preview users from"
        defaultValue="Figma"
      />
    </div>
  ),
};

export const Select: Story = {
  render: () => (
    <div className="w-[400px]">
      <FloatingLabelSelect
        label="Preview users from"
        placeholder="Select an option"
        options={[
          { value: 'figma', label: 'Figma' },
          { value: 'sketch', label: 'Sketch' },
          { value: 'adobe', label: 'Adobe XD' },
          { value: 'framer', label: 'Framer' },
        ]}
      />
    </div>
  ),
};

export const SelectWithValue: Story = {
  render: () => (
    <div className="w-[400px]">
      <FloatingLabelSelect
        label="Preview users from"
        defaultValue="figma"
        options={[
          { value: 'figma', label: 'Figma' },
          { value: 'sketch', label: 'Sketch' },
          { value: 'adobe', label: 'Adobe XD' },
          { value: 'framer', label: 'Framer' },
        ]}
      />
    </div>
  ),
};




