import React from "react";
import { useStocks } from "../context/StockContext";
import StockItem from "./StockItem.jsx";

const StockList = () => {
  const { stocks } = useStocks();

  // Conditional Rendering
  if (stocks.length === 0) {
    return (
      <div className="stock-list-empty">
        <p>No stocks added yet. Use the form above to add your first stock!</p>
      </div>
    );
  }

  return (
    <div className="stock-list">
      <h2>My Portfolio</h2>
      {stocks.map((stock) => (
        <StockItem key={stock.id} stock={stock} />
      ))}
    </div>
  );
};

export default StockList;
