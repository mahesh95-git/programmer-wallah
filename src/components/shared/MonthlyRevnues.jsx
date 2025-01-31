"use client";

import { GitCommitVertical } from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
  { month: "January", revenue: 186 },
  { month: "February", revenue: 305 },
  { month: "March", revenue: 237 },
  { month: "April", revenue: 73 },
  { month: "May", revenue: 209 },
  { month: "June", revenue: 214 },
  { month: "July", revenue: 214 },
  { month: "August", revenue: 214 },
  { month: "September", revenue: 214 },
  { month: "October", revenue: 213 },
  { month: "November", revenue: 314 },
  { month: "December", revenue: 20 },
];

const chartConfig = {
  revenue: {
    label: "revenue",
    color: "hsl(var(--chart-1))",
  },
};

export function MonthlyRevenues() {
  return (
    <div className="w-full">
       <div className="mb-6">
          <h2 className="text-lg font-semibold">Revenue Overview</h2>
          
        
        <p className="text-sm text-gray-500">
          Monthly revenue breakdown for {2025}
        </p>
      </div>
      <ChartContainer config={chartConfig}>
        <LineChart
          accessibilityLayer
          data={chartData}
          margin={{
            left: 12,
            right: 12,
          }}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />
          <Line
            dataKey="revenue"
            type="natural"
            stroke="#141313"
            strokeWidth={2}
            dot={({ cx, cy, payload }) => {
              const r = 24;
              return (
                <GitCommitVertical
                  key={payload.month}
                  x={cx - r / 2}
                  y={cy - r / 2}
                  width={r}
                  height={r}
                  fill="hsl(var(--background))"
                  stroke="#141313"
                />
              );
            }}
          />
        </LineChart>
      </ChartContainer>
    
    </div>
  );
}
