"use client"

import * as React from "react"
import { CartesianGrid, Line, LineChart, XAxis } from "recharts"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartData = [
  {
    date: "2024-01-01",
    revenue: 120000,
  },
  {
    date: "2024-01-02",
    revenue: 140000,
  },
  {
    date: "2024-01-03",
    revenue: 13000,
  },
  {
    date: "2024-01-04",
    revenue: 150000,
  },
  {
    date: "2024-01-05",
    revenue: 160000,
  },
  {
    date: "2024-01-06",
    revenue: 145000,
  },
  {
    date: "2024-01-07",
    revenue: 13500,
  },
  {
    date: "2024-01-08",
    revenue: 17000,
  },
  {
    date: "2024-01-09",
    revenue: 18000,
  },
  {
    date: "2024-01-10",
    revenue: 16500,
  },
  {
    date: "2024-01-11",
    revenue: 15500,
  },
  {
    date: "2024-01-12",
    revenue: 19000,
  },
  {
    date: "2023-01-01",
    revenue: 11000,
  },
  {
    date: "2023-01-02",
    revenue: 130000,
  },
  {
    date: "2022-01-01",
    revenue: 100000,
  },
  {
    date: "2022-01-02",
    revenue: 120000,
  },
]

const chartConfig = {
  revenue: {
    label: "Revenue",
    color: "hsl(var(--chart-1))",
  },
}

const years = ["2024", "2023", "2022"]

export function AmdinRevenue() {
  const [selectedYear, setSelectedYear] = React.useState("2024")

  const filteredChartData = React.useMemo(() => {
    return chartData.filter((item) => item.date.startsWith(selectedYear));
  }, [selectedYear]);

  const total = React.useMemo(
    () => filteredChartData.reduce((acc, curr) => acc + curr.revenue, 0),
    [filteredChartData]
  );

  const monthlyTotals = React.useMemo(() => {
    const totals = {};
    filteredChartData.forEach((data) => {
      const date = new Date(data.date);
      const monthKey = date.toLocaleString("default", { month: "short" });
      if (!totals[monthKey]) {
        totals[monthKey] = 0;
      }
      totals[monthKey] += data.revenue;
    });
    return totals;
  }, [filteredChartData]);

  return (
    <div className="w-full rounded-lg shadow-sm p-6">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-semibold">Revenue Overview</h2>
          <Select value={selectedYear} onValueChange={setSelectedYear}>
            <SelectTrigger className="w-[100px]">
              <SelectValue placeholder="Select year" />
            </SelectTrigger>
            <SelectContent>
              {years.map((year) => (
                <SelectItem key={year} value={year}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <p className="text-sm text-gray-500">
          Monthly revenue breakdown for {selectedYear}
        </p>
      </div>

      <div className="mb-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <LineChart
            accessibilityLayer
            data={filteredChartData}
            margin={{
              left: 12,
              right: 12,
              bottom: 24,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="revenue"
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    });
                  }}
                />
              }
            />
            <Line
              dataKey="revenue"
              type="monotone"
              stroke={`black`}
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </div>

      <div className="grid grid-cols-12 gap-2 text-sm">
        {Object.entries(monthlyTotals).map(([month, data], index) => (
          <div key={month} className="col-span-1 text-center">
            <div className="font-medium">{month}</div>
            <div className="text-gray-500">
              ${data.toLocaleString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}