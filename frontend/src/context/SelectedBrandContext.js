import { createContext, useContext, useState } from "react";

const SelectedBrandContext = createContext();

export const SelectedBrandProvider = ({ children }) => {
  const [selectedBrand, setSelectedBrand] = useState(null);

  return (
    <SelectedBrandContext.Provider value={{ selectedBrand, setSelectedBrand }}>
      {children}
    </SelectedBrandContext.Provider>
  );
};

export const useSelectedBrand = () => {
  const context = useContext(SelectedBrandContext);
  if (!context) {
    throw new Error("useSelectedBrand must be used within a SelectedBrandProvider");
  }
  return context;
};
