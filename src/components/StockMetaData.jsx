function parseStockData(stockData) {
    const {
        symbol,
        currency,
        fullExchangeName,
        regularMarketPrice,
        fiftyTwoWeekHigh,
        fiftyTwoWeekLow
    } = stockData;

    const result = [];

    if (symbol) result.push({ name: 'symbol', field: 'Symbol', value: symbol });
    if (currency) result.push({ name: 'currency', field: 'Currency', value: currency });
    if (fullExchangeName) result.push({ name: 'fullExchangeName', field: 'Exchange', value: fullExchangeName });
    if (regularMarketPrice) result.push({ name: 'regularMarketPrice', field: 'Market Price', value: regularMarketPrice });
    if (fiftyTwoWeekHigh) result.push({ name: 'fiftyTwoWeekHigh', field: '52-Week High', value: fiftyTwoWeekHigh });
    if (fiftyTwoWeekLow) result.push({ name: 'fiftyTwoWeekLow', field: '52-Week Low', value: fiftyTwoWeekLow });

    return result;
}

function StockMetaData({ data }) {
    const metaData = parseStockData(data);
    return (
        <div className="stock-meta-data">
            <ul className="meta-data-list">
                {metaData.map(element => (
                    <li key={element.name}>
                        <strong>{element.field}:</strong> {element.value}
                    </li>
                ))}
            </ul>
        </div>
    );
};
export default StockMetaData;