import React, { useState } from "react";
import { useStocks } from "../context/StockContext";

const StockForm = () => {
  const [symbol, setSymbol] = useState("");
  const [quantity, setQuantity] = useState("");
  const [purchasePrice, setPurchasePrice] = useState("");
  const { addStock, error, loadingSymbol } = useStocks();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!symbol && !quantity && !purchasePrice) {
      alert("Please fill in all fields.");
      return;
    }
    // Convert symbol to uppercase for consistency
    const stockData = { symbol: symbol.toUpperCase(), quantity, purchasePrice };
    addStock(stockData);

    // Clear form fields after submission
    setSymbol("");
    setQuantity("");
    setPurchasePrice("");
  };

  const isAdding = loadingSymbol === symbol.toUpperCase();

  return (
    <div className="stock-form-container">
      <h2>Add New Stock</h2>
      <form onSubmit={handleSubmit} className="stock-form">
        <input
          type="text"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
          placeholder="Stock Symbol (e.g., AAPL)"
          required
        />
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          placeholder="Quantity"
          min="0.000001"
          step="any"
          required
        />
        <input
          type="number"
          value={purchasePrice}
          onChange={(e) => setPurchasePrice(e.target.value)}
          placeholder="Purchase Price ($)"
          min="0.01"
          step="any"
          required
        />
        <button type="submit" disabled={isAdding}>
          {isAdding ? "Adding..." : "Add Stock"}
        </button>
      </form>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default StockForm;
