import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

const COLORS = [
  "#74b210",
  "#0bc166",
  "#FF8042",
  "#FFBB28",
  "#0088FE",
  "#00C49F",
]

export const PieChartBox = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <PieChart>
      <Pie data={data} dataKey="value" nameKey="name" outerRadius={100} label>
        {data.map((_, index) => (
          <Cell key={index} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
    </PieChart>
  </ResponsiveContainer>
)

export const BarChartBox = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="stock" fill="#FF8042" />
      <Bar dataKey="sold" fill="#82ca9d" />
    </BarChart>
  </ResponsiveContainer>
)
