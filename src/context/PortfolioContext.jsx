// filepath: src/context/PortfolioContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import { api } from "../services/api";

const PortfolioContext = createContext(null);

export function PortfolioProvider({ children }) {
  const [portfolio, setPortfolio] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchPortfolio = async () => {
    try {
      const data = await api.getPortfolio();
      setPortfolio(data);
    } catch (err) {
      console.error("Failed to fetch portfolio:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPortfolio();
  }, []);

  return (
    <PortfolioContext.Provider value={{ portfolio, loading, refetch: fetchPortfolio }}>
      {children}
    </PortfolioContext.Provider>
  );
}

export const usePortfolio = () => useContext(PortfolioContext);
