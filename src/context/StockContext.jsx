import React, { createContext, useState, useCallback, useContext } from "react";
import { fetchStockQuote } from "../api/alphaVantage";

// 1. Create the context
const StockContext = createContext();

// Custom hook for easy consumption of the context
export const useStocks = () => {
  return useContext(StockContext);
};

// 2. Create the provider component
export const StockProvider = ({ children }) => {
  const [stocks, setStocks] = useState([]);
  const [error, setError] = useState(null);
  const [loadingSymbol, setLoadingSymbol] = useState(null);

  const addStock = useCallback(async (stockData) => {
    const { symbol, quantity, purchasePrice } = stockData;
    setError(null);
    setLoadingSymbol(symbol.toUpperCase());

    try {
      const quote = await fetchStockQuote(symbol);

      if (!quote || !quote["05. price"]) {
        console.warn("Invalid API response for symbol:", symbol, quote);
        setError(
          `Could not retrieve data for ${symbol.toUpperCase()}. It may be an invalid symbol or an API limit issue.`
        );
        setLoadingSymbol(null);
        return;
      }

      const newStock = {
        id: Date.now(),
        symbol: quote["01. symbol"],
        quantity: parseFloat(quantity),
        purchasePrice: parseFloat(purchasePrice),
        currentPrice: parseFloat(quote["05. price"]),
      };

      setStocks((prevStocks) => [...prevStocks, newStock]);
    } catch (err) {
      console.error("API Error:", err);
      setError(
        "Failed to fetch stock data. Please check your connection or API key."
      );
    } finally {
      setLoadingSymbol(null);
    }
  }, []);

  const updateStockPrice = useCallback((symbol, newPrice) => {
    setStocks((prevStocks) =>
      prevStocks.map((stock) =>
        stock.symbol === symbol ? { ...stock, currentPrice: newPrice } : stock
      )
    );
  }, []);

  const value = {
    stocks,
    addStock,
    error,
    loadingSymbol,
    updateStockPrice, // ✅ added
  };

  return (
    <StockContext.Provider value={value}>{children}</StockContext.Provider>
  );
};

export { StockContext };
