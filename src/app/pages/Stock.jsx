import { useEffect, useState } from 'react'
import { useSearchParams } from "react-router-dom";
import { LineChart, Legend, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

function Stocks() {
    const [searchParams] = useSearchParams();
    const symbol = searchParams.get("symbol");
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!symbol) return;
        setLoading(true);
        async function fetchStockData() {
            try {
                const res = await fetch(`/api/stocks/symbol?ticker=${symbol}`);
                const result = await res.json();
                setData(result);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching stock data:", err);
                setError(err)
            }

        }
        fetchStockData();
    }, [symbol]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    console.log('data', data);
    return (
        <>
            <h1>Historical Stock Prices for {symbol}</h1>
            <ResponsiveContainer width="100%" height={400}>
                <LineChart data={data.data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="open" stroke="#8884d8" />
                    <Line type="monotone" dataKey="close" stroke="#82ca9d" />
                    <Line type="monotone" dataKey="high" stroke="#ff7300" />
                    <Line type="monotone" dataKey="low" stroke="#ff0000" />
                </LineChart>
            </ResponsiveContainer>
        </>
    );
}

export default Stocks;