import { createContext, useState } from "react";
import PropTypes from "prop-types";
import {
  phone_products,
  explore_products,
  phassets,
  delivery,
  mobilesModals,
  posters,
} from "../assets/phoneassets/phoneassets";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
  const currency = "₹";
  const delivery_fee = 50;
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const navigate = useNavigate();

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
      // Non-phone products should use itemId as the key instead of "default"
      key = itemId;
    }
    console.log("itemId" + itemId);

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

    console.log(cartData); // Now, non-mobile products will have proper itemId instead of undefined
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

  const updateQuantity = async (
    itemId,
    selectedPhone = null,
    selectedModal = null,
    selectedWrap = null,
    quantity
  ) => {
    let cartData = structuredClone(cartItems);

    let key = isPhoneProduct(itemId)
      ? `${selectedPhone}-${selectedModal}-${selectedWrap}`
      : itemId;

    if (cartData[itemId] && cartData[itemId][key]) {
      if (quantity === 0) {
        // Remove the specific variant from the cart
        delete cartData[itemId][key];

        // If no variants remain for the item, remove the item itself
        if (Object.keys(cartData[itemId]).length === 0) {
          delete cartData[itemId];
        }
      } else {
        cartData[itemId][key].quantity = Math.max(1, quantity);
      }
      setCartItems(cartData);
    } else {
      toast.error("Item not found in cart! ❌");
    }
  };

  const getCartAmount = () => {
    let totalAmount = 0;
    for (const items in cartItems) {
      let itemInfo = phone_products.find((product) => product._id === items);
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item].quantity > 0) {
            totalAmount += itemInfo.price * cartItems[items][item].quantity;
          }
        } catch (error) {
          toast.error("Something went wrong! 😭", error);
        }
      }
    }
    return totalAmount;
  };

  // useEffect(() => {
  //   console.log(cartItems);
  // }, [cartItems]);
  const value = {
    phone_products,
    explore_products,
    phassets,
    delivery,
    posters,
    mobilesModals,
    cartItems,
    addToCart,
    getCartCount,
    updateQuantity,
    getCartAmount,
    navigate,
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
