"use client"
import React from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from "recharts"

import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"

const chartData2024 = [
    { month: "January", count: 186 },
    { month: "February", count: 305 },
    { month: "March", count: 237 },
    { month: "April", count: 73 },
    { month: "May", count: 209 },
    { month: "June", count: 214 },
    { month: "July", count: 250 },
    { month: "August", count: 280 },
    { month: "September", count: 220 },
    { month: "October", count: 290 },
    { month: "November", count: 260 },
    { month: "December", count: 310 },
];

const chartData2023 = [
    { month: "January", count: 150 },
    { month: "February", count: 250 },
    { month: "March", count: 200 },
    { month: "April", count: 100 },
    { month: "May", count: 180 },
    { month: "June", count: 190 },
    { month: "July", count: 220 },
    { month: "August", count: 260 },
    { month: "September", count: 190 },
    { month: "October", count: 270 },
    { month: "November", count: 240 },
    { month: "December", count: 290 },
];

const chartData2022 = [
    { month: "January", count: 120 },
    { month: "February", count: 220 },
    { month: "March", count: 180 },
    { month: "April", count: 80 },
    { month: "May", count: 160 },
    { month: "June", count: 170 },
    { month: "July", count: 200 },
    { month: "August", count: 240 },
    { month: "September", count: 170 },
    { month: "October", count: 250 },
    { month: "November", count: 220 },
    { month: "December", count: 270 },
];

function getChartDataForYear(year) {
    switch (year) {
        case "2024":
            return chartData2024;
        case "2023":
            return chartData2023;
        case "2022":
            return chartData2022;
        default:
            return [];
    }
}

const chartConfig = {
    count: {
        label: "Count",
        color: "hsl(var(--chart-1))",
    },
    label: {
        color: "hsl(var(--background))",
    },
};

export function AdminMonthlyStudentJoin({ title }) {
    const [selectedYear, setSelectedYear] = React.useState("2024");
    const years = ["2024", "2023", "2022"];

    const filteredChartData = React.useMemo(() => {
        return getChartDataForYear(selectedYear);
    }, [selectedYear]);

    return (
        <div className="w-full">
            <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                    <h2 className="text-lg font-semibold">{title} Overview</h2>
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
                    Monthly {title} breakdown for {selectedYear}
                </p>
            </div>
            <ChartContainer config={chartConfig}>
                <BarChart
                    accessibilityLayer
                    data={filteredChartData}
                    layout="vertical"
                    margin={{
                        right: 16,
                    }}
                >
                    <CartesianGrid horizontal={false} />
                    <YAxis
                        dataKey="month"
                        type="category"
                        tickLine={false}
                        tickMargin={10}
                        axisLine={false}
                        tickFormatter={(value) => value.slice(0, 3)}
                        hide
                    />
                    <XAxis dataKey="count" type="number" hide />
                    <ChartTooltip
                        cursor={false}
                        content={<ChartTooltipContent indicator="line" />}
                    />
                    <Bar
                        dataKey="count"
                        layout="vertical"
                        fill="black"
                        radius={4}
                    >
                        <LabelList
                            dataKey="month"
                            position="insideLeft"
                            offset={8}
                            className="fill-[--color-label]"
                            fontSize={12}
                        />
                        <LabelList
                            dataKey="count"
                            position="right"
                            offset={8}
                            className="fill-foreground"
                            fontSize={12}
                        />
                    </Bar>
                </BarChart>
            </ChartContainer>
        </div>
    );
}