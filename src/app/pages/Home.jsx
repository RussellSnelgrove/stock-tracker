import { useEffect, useState } from 'react'

import SearchTextbox from '../../components/searchTextbox.jsx'

const getStock = (symbol) => {
  if (symbol) {
    fetch(`/api/stocks/sybmbol?ticker=${symbol}`)
      // fetch('http://localhost:3000/api/stocks/sybmbol?ticker=xqq')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Fetched data:", data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error.message);
      });
  }
};

function Home() {
  const [symbol, setSymbol] = useState();

  function searchTerm(inputString) {
    setSymbol(inputString)
  };

  useEffect(() => {
    getStock(symbol);
  }, [symbol]);

  return (
    <>
      <SearchTextbox searchTerm={searchTerm} />
    </>
  )
}

export default Home
