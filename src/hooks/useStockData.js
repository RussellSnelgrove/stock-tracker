import { useEffect, useState } from "react";

export function useStockData({ symbol, offSet = 365 }) {
    const [stockInformation, setStockInformation] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!symbol?.trim()) {
            setError("No stock symbol provided.");
            setLoading(false);
            return;
        }

        setLoading(true);
        setError(null);

        const abortController = new AbortController();

        async function fetchStockData() {
            const today = new Date();
            const pastDate = new Date(today);
            pastDate.setDate(today.getDate() - offSet);
            const startDate = pastDate.toLocaleDateString("en-CA");

            try {
                const res = await fetch(`/api/stocks/symbol?symbol=${symbol}&start=${startDate}`, {
                    signal: abortController.signal,
                });

                if (!res.ok) {
                    throw new Error(`Failed to fetch data: ${res.statusText}`);
                }

                const result = await res.json();
                setStockInformation(result);
            } catch (err) {
                if (err.name !== "AbortError") {
                    console.error("Error fetching stock data:", err);
                    setError(err.message);
                }
            } finally {
                setLoading(false);
            }
        }

        fetchStockData();

        return () => abortController.abort();
    }, [symbol, offSet]);

    return { stockInformation, loading, error };
}
