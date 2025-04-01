import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import { assets } from "../assets/assets/frontend_assets/assets";
import CartTotal from "../components/CartTotal";

const Cart = () => {
  const { phone_products, currency, cartItems, updateQuantity, navigate } =
    useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    const tempData = [];
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        if (cartItems[items][item].quantity > 0) {
          tempData.push({
            _id: items, // Item ID
            quantity: cartItems[items][item].quantity, // Selected Quantity
            selectedPhone: cartItems[items][item].selectedPhone || null, // If mobile, selected brand
            selectedModal: cartItems[items][item].selectedModal || null, // If mobile, selected model
            selectedWrap: cartItems[items][item].selectedWrap || null, // If mobile, wrap type
          });
        }
      }
    }
    console.log(tempData);
    setCartData(tempData);
  }, [cartItems]);

  return (
    <div className="border-t pt-14">
      <div className="text-2xl mb-3">
        <Title text1={"YOUR"} text2={"CART"} />
      </div>
      <div>
        {cartData.map((item, index) => {
          const productData = phone_products.find(
            (product) => product._id === item._id
          );
          return (
            <div
              key={index}
              className="py-4 border-gray-300 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4"
            >
              <div className="flex items-start gap-6">
                <img
                  className="w-16 sm:w-20"
                  src={productData.image[0]}
                  alt=""
                />
                <div>
                  <p className="text-xs sm:text-lg font-medium">
                    {productData.name}
                  </p>
                  <div className="flex items-center gap-5 mt-2">
                    <p className="font-bold">
                      {currency}
                      {productData.price}
                    </p>
                    <p className="px-2 sm:px-3 sm:py-1 border rounded-lg bg-slate-50 ">
                      Category : {productData.category}
                    </p>
                  </div>
                </div>
              </div>
              <input
                onChange={(e) =>
                  e.target.value === "" || e.target.value === "0"
                    ? null
                    : updateQuantity(
                        item._id,
                        item.selectedPhone,
                        item.selectedModal,
                        item.selectedWrap,
                        Number(e.target.value)
                      )
                }
                className="border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1"
                type="number"
                min={1}
                defaultValue={item.quantity}
              />
              <img
                onClick={() =>
                  updateQuantity(
                    item._id,
                    item.selectedPhone,
                    item.selectedModal,
                    item.selectedWrap,
                    0 // Set quantity to 0 to remove the item
                  )
                }
                className="w-4 mr-4 sm:w-5 cursor-pointer"
                src={assets.bin_icon}
                alt=""
              />
            </div>
          );
        })}
      </div>
      <div className="flex justify-end my-20">
        <div className="w-full sm:w-[450px]">
          <CartTotal />
          <div className="w-full text-end">
            <button
              onClick={() => navigate("/place-order")}
              className="bg-black cursor-pointer text-white text-sm my-8 px-8 py-3"
            >
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
