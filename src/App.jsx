import React from "react";
import StockForm from "./components/StockForm.jsx";
import StockList from "./components/StockList.jsx";
import { StockProvider } from "./context/StockContext.jsx";
import financeIcon from "./assets/finance-dashboard-icon.png";
function App() {
  return (
    <StockProvider>
      <div className="app-container">
        <header className="app-header">
          {/* 2. Use the imported variable in the src attribute */}
          <img src={financeIcon} alt="Finance Icon" className="header-icon" />
          <h1>Finance Dashboard</h1>
        </header>

        <main>
          <StockForm />

          <div className="stock-list-section">
            <h2>Stock List</h2>
            <StockList />
          </div>
        </main>
      </div>
    </StockProvider>
  );
}

export default App;
