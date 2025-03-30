import { useEffect, useState, useRef } from 'react'

import SearchTextbox from '../../components/searchTextbox.jsx'

function Home() {
  const [symbol, setSymbol] = useState('');
  const abortControllerRef = useRef(null);

  function searchTerm(inputString) {
    setSymbol(inputString.trim())
  };

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
          throw new Error(`HTTP error! Status: ${response.status}`);
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
    <>
      <SearchTextbox searchTerm={searchTerm} />
    </>
  )
}

export default Home
