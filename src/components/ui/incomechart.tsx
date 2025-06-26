import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./card"
import { ChartContainer, ChartTooltip, type ChartConfig } from "./chart";
import { Pie, PieChart } from "recharts";

type Data = {
  source: string,
  description: string,
  fill: string
  value: number,
}

type ChartProps = {
  data: Data[]
}

const chartConfig = {
  source: {
    label: "Source"
  },
  value: {
    label: "Value"
  }
} satisfies ChartConfig

export default function IncomeChart({ data }: ChartProps) {
  return (
    <Card className="w-full flex flex-col   ">
      <CardHeader >
        <CardTitle>Income Sources</CardTitle>
        <CardDescription>Visual Summary of Barangay Income Sources</CardDescription>
      </CardHeader>
      <CardContent className="flex  ">
        <div>
          {data.map((d, i) => {
            console.log(d.value)
            return <div key={i} className="flex gap-1 items-normal mt-2">
              <div className="w-[1.5rem] h-[1rem] rounded-[4px]" style={{ backgroundColor: d.fill }} />
              <div className="flex flex-col min-w-0">
                <h2 className="font-bold text-[1rem] leading-2 md:text-red">{d.source}</h2>
                <p className="text-[0.8rem]  font-light ">{d.description}</p>
              </div>
            </div>
          })}
        </div>
        <ChartContainer
          config={chartConfig}
          className="text-xs font-bold h-[13.6rem] "
        >
          <PieChart >
            <ChartTooltip />
            <Pie
              data={data}
              dataKey="value"
              nameKey="source"
              cy="50%"
              cx="50%"
              label={({ value }) => `${value}%`}
              labelLine={false}
            >
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card >
  )
}
