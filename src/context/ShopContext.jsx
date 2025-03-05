import { createContext } from "react";
import PropTypes from "prop-types";
import {
  phone_products,
  explore_products,
} from "../assets/phoneassets/phoneassets";

export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
  const currency = "₹";
  const delivery_fee = 50;
  const value = { phone_products, explore_products, currency, delivery_fee };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

ShopContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ShopContextProvider;
