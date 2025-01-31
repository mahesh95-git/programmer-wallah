"use client";
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
    { month: "January", users: 186 },
    { month: "February", users: 305 },
    { month: "March", users: 237 },
    { month: "April", users: 73 },
    { month: "May", users: 209 },
    { month: "June", users: 214 },
    { month: "July", users: 214 },
    { month: "August", users: 214 },
    { month: "September", users: 214 },
    { month: "October", users: 213 },
    { month: "November", users: 314 },
    { month: "December", users: 20 },
];

const chartConfig = {
    users: {
        label: "Users",
        color: "hsl(var(--chart-1))",
    },
};

export function MonthlyStudent() {
    return (
        <div className="w-full p-10">
            <ChartContainer config={chartConfig}>
                <BarChart
                    accessibilityLayer
                    data={chartData}
                    margin={{
                        top: 20,
                    }}
                >
                    <CartesianGrid vertical={false} />
                    <XAxis
                        dataKey="month"
                        tickLine={false}
                        tickMargin={10}
                        axisLine={false}
                        tickFormatter={(value) => value.slice(0, 3)}
                    />
                    <ChartTooltip
                        cursor={false}
                        content={<ChartTooltipContent hideLabel />}
                    />
                    {/* Changed dataKey from "desktop" to "users" */}
                    <Bar dataKey="users" fill="#141313" radius={8}>
                        <LabelList
                            position="top"
                            offset={12}
                            className="fill-foreground"
                            fontSize={12}
                        />
                    </Bar>
                </BarChart>
            </ChartContainer>
            <p className="text-center opacity-50">Monthly student Enroll</p>
        </div>
    );
}
