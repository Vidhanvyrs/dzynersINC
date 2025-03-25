import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets/frontend_assets/assets";
import RelatedProducts from "../components/RelatedProducts";

const Product = () => {
  const { productId } = useParams();
  // console.log(productId);
  const { phone_products, currency, delivery } = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState("");
  const [selectedPhone, setSelectedPhone] = useState(""); // Track selected phone
  const [selectedWrap, setSelectedWrap] = useState(""); // Track selected wrap type
  const [phoneError, setPhoneError] = useState(false); // Error for phone selection
  const [wrapError, setWrapError] = useState(false); // Error for wrap selection

  const handleAddToCart = (e) => {
    e.preventDefault(); // Prevent form submission

    let hasError = false;

    if (!selectedPhone) {
      setPhoneError(true);
      hasError = true;
    } else {
      setPhoneError(false);
    }

    if (!selectedWrap) {
      setWrapError(true);
      hasError = true;
    } else {
      setWrapError(false);
    }

    if (!hasError) {
      console.log("Added to cart:", { selectedPhone, selectedWrap });
      // Handle adding to cart logic here
    }
  };

  const fetchProductData = async () => {
    phone_products.map((item) => {
      if (item._id === productId) {
        setProductData(item);
        console.log(item);
        setImage(item.image[0]);

        return null;
      }
    });
  };
  useEffect(() => {
    fetchProductData();
  }, [productId, phone_products]);

  return productData ? (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
      {/* Product Data */}
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        {/* Product Images */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
            {productData.image.map((item, index) => {
              return (
                <img
                  onClick={() => setImage(item)}
                  src={item}
                  key={index}
                  className="w-[24%] rounded-lg hover:border sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer"
                />
              );
            })}
          </div>
          <div className="w-full sm:w-[80%]">
            <img className="w-full h-auto" src={image} alt="" />
          </div>
        </div>
        {/* ----- Product Info ------- */}
        <div className="flex-1">
          <h1 className="font-medium text-2xl mt-2">{productData.name}</h1>
          <div className="flex items-center gap-1 mt-2">
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_dull_icon} alt="" className="w-3 5" />
            <p className="pl-2">(122)</p>
          </div>
          <div className="flex flex-row gap-3">
            <p className="mt-5 line-through text-3xl font-medium text-gray-500 ">
              {currency}
              {productData.price + 300}
            </p>
            <p className="mt-5 text-3xl font-medium ">
              {currency}
              {productData.price}
            </p>
          </div>
          <p className="mt-5 text-gray-500 md:w-4/5">
            {productData.description}
          </p>
          <form onSubmit={handleAddToCart}>
            <div className="flex flex-col gap-4 my-8">
              {/* Mobile Selection */}
              <label>
                Select Your Mobile Brand (You will Receive the Selected Model
                Skins)*
              </label>
              <select
                className="border p-2 cursor-pointer"
                name="mobiles"
                id="mobiles"
                value={selectedPhone}
                onChange={(e) => {
                  setSelectedPhone(e.target.value);
                  setPhoneError(false); // Hide error when selected
                }}
              >
                <option value="" disabled>
                  ---Please Select---
                </option>
                <option value="Apple iPhone">Apple iPhone</option>
                <option value="OnePlus">OnePlus</option>
                <option value="Samsung">Samsung</option>
                <option value="Oppo">Oppo</option>
                <option value="Vivo">Vivo</option>
                <option value="Nothing">Nothing</option>
                <option value="Realme">Realme</option>
                <option value="Poco">Poco</option>
                <option value="Xiaomi Redmi">Xiaomi Redmi</option>
                <option value="iQOO">iQOO</option>
                <option value="Google">Google</option>
                <option value="Motorola">Motorola</option>
              </select>
              {phoneError && (
                <p className="text-red-500">Please select a mobile brand!</p>
              )}

              {/* Wrap Selection */}
              <label>
                Full Body Wrap (Cover Sides & Edges) or Only Back (No Sides)*
              </label>
              <select
                className="border p-2 cursor-pointer"
                name="query"
                id="query"
                value={selectedWrap}
                onChange={(e) => {
                  setSelectedWrap(e.target.value);
                  setWrapError(false); // Hide error when selected
                }}
              >
                <option value="" disabled>
                  ---Please Select---
                </option>
                <option value="full body">Full Body Wrap</option>
                <option value="no-sides">Only Back</option>
              </select>
              {wrapError && (
                <p className="text-red-500">Please select a wrap type!</p>
              )}
            </div>

            <button
              type="submit"
              className="bg-black cursor-pointer text-white px-8 py-3 text-sm active:bg-gray-700"
            >
              Add to Cart
            </button>
          </form>
          <hr className="mt-8 sm:w-4/5" />
          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
            <div className="flex flex-col sm:flex-row lg:flex-row md:flex-row gap-20">
              {delivery.map((item, index) => (
                <div key={index} className="flex flex-col items-center gap-y-2">
                  <img src={item.image} alt="logo" className="w-7 h-7" />
                  <p>{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Description and Review Sections */}
      <div className="mt-20">
        <div className="flex">
          <b className="border px-5 py-3 text-sm">Description</b>
          <p className="border px-5 py-3 text-sm">Reviews(122)</p>
        </div>
        <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500">
          <p>
            An e-commerce website is an online platform that facilitates the
            buying and selling
          </p>
          <p>
            E-Commerce Websites typically display products or Services along
            with detailed
          </p>
        </div>
      </div>
      {/* display those products which are bought in the same location as of the current user*/}
      {/* basically I am going to use AI recommendation system here somehow after learning it */}
      {/* But currently this is how we are dealing with related projects */}
      <RelatedProducts
        category={productData.category}
        subCategory={productData.subCategory}
      />
    </div>
  ) : (
    <div className="opacity-0"></div>
  );
};

export default Product;
