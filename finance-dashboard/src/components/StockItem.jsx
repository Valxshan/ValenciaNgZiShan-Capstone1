import React from "react";

const StockItem = ({ stock }) => {
  const { symbol, quantity, purchasePrice, currentPrice } = stock;

  // Calculate total values
  const totalCost = purchasePrice * quantity;
  const marketValue = currentPrice * quantity;
  const profitLoss = marketValue - totalCost;

  // Determine the class for profit/loss styling
  const profitLossClass = profitLoss >= 0 ? "positive" : "negative";

  // Helper to format numbers as currency
  const formatCurrency = (value) => {
    return value.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  };

  return (
    <div className="stock-item">
      <div className="stock-info">
        <h3>{symbol}</h3>
        <p>{quantity} Shares</p>
      </div>
      <div className="stock-pricing">
        <p>
          Purchase Price: <span>{formatCurrency(purchasePrice)}</span>
        </p>
        <p>
          Current Price: <span>{formatCurrency(currentPrice)}</span>
        </p>
      </div>
      <div className="stock-profit">
        <p className={profitLossClass}>
          Profit/Loss: <span>{formatCurrency(profitLoss)}</span>
        </p>
      </div>
    </div>
  );
};

export default StockItem;
