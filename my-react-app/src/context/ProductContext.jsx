import { createContext, useContext, useState } from "react";
import productsData from "../data/products";

/*
  Create Product Context
*/
const ProductContext = createContext();

/*
  Product Provider
*/
export const ProductProvider = ({ children }) => {
  // Global products state
  const [products] = useState(productsData);

  // Global search state
  const [searchText, setSearchText] = useState("");

  /*
    FIXED: Get product by ID
    Route param ID comes as string, so normalize types
  */
  const getProductById = (id) => {
    return products.find(
      (product) => product.id.toString() === id.toString()
    );
  };

  /*
    Filter products based on search text
  */
  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <ProductContext.Provider
      value={{
        // data
        products,
        filteredProducts,

        // search
        searchText,
        setSearchText,

        // helpers
        getProductById,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

/*
  Custom Hook
*/
export const useProductContext = () => {
  return useContext(ProductContext);
};
