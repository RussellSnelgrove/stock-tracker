import { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from "react-router-dom";

import StockGraph from '../../components/StockGraph';
import StockMetaData from '../../components/StockMetaData';
import '../../lib/css/Stock.css'

function Stocks() {
    const [searchParams] = useSearchParams();
    const symbol = searchParams.get("symbol");
    const [stockInformation, setStockInformation] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!symbol) {
            setError("No stock symbol provided.");
            return;
        }
        setLoading(true);
        setError(null);
        async function fetchStockData() {
            const today = new Date();
            const pastDate = new Date(today);
            pastDate.setDate(today.getDate() - 365);
            const startDate = pastDate.toLocaleDateString('en-CA');
            try {
                const res = await fetch(`/api/stocks/get-data?symbol=${symbol}&start=${startDate}`);
                if (!res.ok) {
                    throw new Error(`Failed to fetch data: ${res.statusText}`);
                }
                const result = await res.json();
                setStockInformation(result);
            } catch (err) {
                console.error("Error fetching stock data:", err);
                setError(err.message)
            } finally {
                setLoading(false);
            }

        }
        fetchStockData();
    }, [symbol]);

    if (loading) return <p>Loading...</p>;
    if (error) return (
        <>
            <h1>Error Trying to get Symbol: {symbol}</h1>
            <p>{error}</p>
        </>
    );
    return (
        <>
            <h1>{stockInformation?.metaData?.longName}</h1>
            <div className='stock-data-display'>
                <Suspense fallback={<p>Loading graph...</p>}>
                    <StockGraph data={stockInformation.data} />
                </Suspense>
                <StockMetaData data={stockInformation.metaData} />
            </div>
        </>
    );
}

export default Stocks;