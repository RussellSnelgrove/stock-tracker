import { LineChart, Legend, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

function StockGraph({ data }) {
    return (
        <div className="stock-graph-data">
            <ResponsiveContainer width="100%" height={400}>
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis domain={["auto", "auto"]} />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="open" stroke="#8884d8" />
                    <Line type="monotone" dataKey="close" stroke="#82ca9d" />
                    <Line type="monotone" dataKey="high" stroke="#ff7300" />
                    <Line type="monotone" dataKey="low" stroke="#ff0000" />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};
export default StockGraph;