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
    desktop: 1200,
    mobile: 800,
  },
  {
    date: "2024-01-02",
    desktop: 1400,
    mobile: 900,
  },
  {
    date: "2024-01-03",
    desktop: 1300,
    mobile: 850,
  },
  {
    date: "2024-01-04",
    desktop: 1500,
    mobile: 950,
  },
  {
    date: "2024-01-05",
    desktop: 1600,
    mobile: 1000,
  },
  {
    date: "2024-01-06",
    desktop: 1450,
    mobile: 920,
  },
  {
    date: "2024-01-07",
    desktop: 1350,
    mobile: 880,
  },
  {
    date: "2024-01-08",
    desktop: 1700,
    mobile: 1100,
  },
  {
    date: "2024-01-09",
    desktop: 1800,
    mobile: 1200,
  },
  {
    date: "2024-01-10",
    desktop: 1650,
    mobile: 1050,
  },
  {
    date: "2024-01-11",
    desktop: 1550,
    mobile: 980,
  },
  {
    date: "2024-01-12",
    desktop: 1900,
    mobile: 1300,
  }
]

const chartConfig = {
  views: {
    label: "Page Views",
  },
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
}

const years = ["2024", "2023", "2022"]

export function AmdinRevenue() {
  const [activeChart, setActiveChart] = React.useState("desktop")
  const [selectedYear, setSelectedYear] = React.useState("2024")

  const total = React.useMemo(
    () => ({
      desktop: chartData.reduce((acc, curr) => acc + curr.desktop, 0),
      mobile: chartData.reduce((acc, curr) => acc + curr.mobile, 0),
    }),
    []
  )

  const monthlyTotals = React.useMemo(() => {
    const totals = {}
    chartData.forEach((data) => {
      const date = new Date(data.date)
      const monthKey = date.toLocaleString('default', { month: 'short' })
      if (!totals[monthKey]) {
        totals[monthKey] = {
          desktop: 0,
          mobile: 0
        }
      }
      totals[monthKey].desktop += data.desktop
      totals[monthKey].mobile += data.mobile
    })
    return totals
  }, [chartData])

  return (
    <div className="w-full rounded-lg shadow-sm p-6">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-semibold">Revenue Overview</h2>
          <Select
            value={selectedYear}
            onValueChange={setSelectedYear}
          >
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
            data={chartData}
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
                const date = new Date(value)
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="views"
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
                  }}
                />
              }
            />
            <Line
              dataKey={activeChart}
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
              ${(data[activeChart] * 0.1).toLocaleString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
