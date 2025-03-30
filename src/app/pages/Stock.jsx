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
        if (!symbol) return;
        setLoading(true);
        async function fetchStockData() {
            try {
                const res = await fetch(`/api/stocks/symbol?ticker=${symbol}`);
                const result = await res.json();
                setStockInformation(result);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching stock data:", err);
                setError(err)
            }

        }
        fetchStockData();
    }, [symbol]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
    return (
        <>
            <h1>{stockInformation.meta.longName}</h1>
            <div className='stock-data-display'>
                <Suspense fallback={<p>Loading graph...</p>}>
                    <StockGraph data={stockInformation.data} />
                </Suspense>
                <StockMetaData data={stockInformation.meta} />
            </div>
        </>
    );
}

export default Stocks;