const API_KEY = import.meta.env.VITE_ALPHA_VANTAGE_API_KEY;
const BASE_URL = "https://www.alphavantage.co/query";

export const fetchStockQuote = async (symbol) => {
  try {
    const response = await fetch(
      `${BASE_URL}?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${API_KEY}`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    // The actual quote data is nested under the "Global Quote" key
    return data["Global Quote"];
  } catch (error) {
    console.error("Failed to fetch stock data:", error);
    // Return null or throw an error to be handled by the caller
    return null;
  }
};
