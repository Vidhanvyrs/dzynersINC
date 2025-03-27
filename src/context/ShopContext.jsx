import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  phone_products,
  explore_products,
  delivery,
  mobilesModals,
  posters,
} from "../assets/phoneassets/phoneassets";
import { toast } from "react-toastify";

export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
  const currency = "₹";
  const delivery_fee = 50;
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});

  //check whether the product is a phone product
  const isPhoneProduct = (itemId) => {
    const product = phone_products.find((product) => product.id === itemId);
    return product ? product.category === "Mobiles" : false;
  };
  // for further use
  //check whether the product is a Laptop
  // const isLaptopProduct = (itemId) => {
  //   const product = phone_products.find((product) => product.id === itemId);
  //   return product ? product.category === "Laptops" : false;
  // }

  const addToCart = async (
    itemId,
    selectedPhone = null,
    selectedModal = null,
    selectedWrap = null
  ) => {
    let cartData = structuredClone(cartItems);
    let key;

    if (isPhoneProduct(itemId)) {
      // Phone product validation
      if (!selectedPhone) {
        toast.error("Select your Mobile Brand! 📱");
        return;
      }
      if (!selectedModal) {
        toast.error("Select your Brand Modal! 🕹️");
        return;
      }
      if (!selectedWrap) {
        toast.error("Select the Wrap Type! 🧐");
        return;
      }
      key = `${selectedPhone}-${selectedModal}-${selectedWrap}`;
    } else {
      // Non-phone products use a default key
      key = "default";
    }

    if (cartData[itemId]) {
      if (cartData[itemId][key]) {
        cartData[itemId][key].quantity += 1;
      } else {
        cartData[itemId][key] = {
          selectedPhone,
          selectedModal,
          selectedWrap,
          quantity: 1,
        };
      }
    } else {
      cartData[itemId] = {
        [key]: { selectedPhone, selectedModal, selectedWrap, quantity: 1 },
      };
    }

    setCartItems(cartData);
    toast.success("Successfully Added to Cart 😄");
  };

  const getCartCount = () => {
    let totalCount = 0;
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        totalCount += cartItems[items][item].quantity;
      }
    }
    return totalCount;
  };

  useEffect(() => {
    console.log(cartItems);
  }, [cartItems]);
  const value = {
    phone_products,
    explore_products,
    delivery,
    posters,
    mobilesModals,
    cartItems,
    addToCart,
    getCartCount,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

ShopContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ShopContextProvider;
