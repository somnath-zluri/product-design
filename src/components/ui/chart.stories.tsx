import type { Meta, StoryObj } from '@storybook/react';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from './chart';
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts';

const meta = {
  title: 'ShadCN Components/Chart',
  component: ChartContainer,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ChartContainer>;

export default meta;
type Story = StoryObj<typeof meta>;

const chartData = [
  { month: 'January', desktop: 186 },
  { month: 'February', desktop: 305 },
  { month: 'March', desktop: 237 },
  { month: 'April', desktop: 273 },
  { month: 'May', desktop: 209 },
  { month: 'June', desktop: 214 },
];

const chartConfig = {
  desktop: {
    label: 'Desktop',
  },
};

export const Default: Story = {
  args: {} as any,
  render: () => (
    <ChartContainer config={chartConfig} className="h-[200px] w-full">
      <AreaChart
        data={chartData}
        margin={{
          left: 12,
          right: 12,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="month"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
        />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent indicator="dot" />}
        />
        <Area
          dataKey="desktop"
          type="natural"
          fill="var(--color-desktop)"
          fillOpacity={0.4}
          stroke="var(--color-desktop)"
          stackId="a"
        />
      </AreaChart>
    </ChartContainer>
  ),
};

