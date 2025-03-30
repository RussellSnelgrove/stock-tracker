import { useEffect, useRef } from 'react'
import { useSearchParams  } from "react-router-dom";

function Stocks() {
    const [searchParams] = useSearchParams();
    const symbol = searchParams.get("symbol");
    const abortControllerRef = useRef(null);
    useEffect(() => {
        if (!symbol) return;

        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }

        const controller = new AbortController();
        abortControllerRef.current = controller;
        const signal = controller.signal;

        const debounceTimeout = setTimeout(async () => {
            try {
                const response = await fetch(`/api/stocks/symbol?ticker=${symbol}`, { signal });

                if (!response.ok) {
                    return<h1>Error</h1>
                    // throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();
                console.log("Fetched data:", data);
            } catch (error) {
                if (error.name !== "AbortError") {
                    console.error("Error fetching data:", error.message);
                }
            }
        }, 500);
        return () => {
            clearTimeout(debounceTimeout);
            controller.abort();
        }
    }, [symbol]);

    return (
        <h1>Stock</h1>
    )
}

export default Stocks;