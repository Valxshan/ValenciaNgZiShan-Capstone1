import React, { useContext, useEffect, useCallback } from "react";
import { StockContext } from "../context/StockContext";
import { fetchStockQuote } from "../api/alphaVantage";

const StockList = () => {
  const { stocks, updateStockPrice } = useContext(StockContext);

  // Function to fetch current price from AlphaVantage
  const fetchCurrentPrice = useCallback(
    async (symbol) => {
      try {
        const quote = await fetchStockQuote(symbol);
        const price = parseFloat(quote?.["05. price"]);
        if (!isNaN(price)) {
          updateStockPrice(symbol, price);
        }
      } catch (err) {
        console.error("Error fetching stock price:", err);
      }
    },
    [updateStockPrice]
  );

  // Fetch price whenever stock list changes
  useEffect(() => {
    stocks.forEach((stock) => fetchCurrentPrice(stock.symbol));
  }, [stocks, fetchCurrentPrice]);

  if (stocks.length === 0) {
    return <p>No stocks available. Please add one above 👆</p>;
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Symbol</th>
          <th>Quantity</th>
          <th>Purchase Price</th>
          <th>Current Price</th>
          <th>Profit / Loss</th>
        </tr>
      </thead>
      <tbody>
        {stocks.map((stock) => {
          const profitLoss =
            stock.currentPrice && stock.purchasePrice
              ? (stock.currentPrice - stock.purchasePrice) * stock.quantity
              : 0;

          return (
            <tr key={stock.id}>
              <td>{stock.symbol}</td>
              <td>{stock.quantity}</td>
              <td>${stock.purchasePrice.toFixed(2)}</td>
              <td>
                {stock.currentPrice ? `$${stock.currentPrice.toFixed(2)}` : "-"}
              </td>
              <td
                style={{
                  color:
                    profitLoss > 0 ? "green" : profitLoss < 0 ? "red" : "black",
                }}
              >
                {stock.currentPrice ? `$${profitLoss.toFixed(2)}` : "-"}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default StockList;
