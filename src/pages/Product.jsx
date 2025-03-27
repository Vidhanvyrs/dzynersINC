import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets/frontend_assets/assets";
import RelatedProducts from "../components/RelatedProducts";

const Product = () => {
  const { productId } = useParams();
  // console.log(productId);
  const { phone_products, mobilesModals, currency, delivery, addToCart } =
    useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState("");
  const [selectedPhone, setSelectedPhone] = useState(""); // Track selected phone
  const [selectedWrap, setSelectedWrap] = useState(""); // Track selected wrap type
  const [selectedModal, setSelectedModal] = useState("");

  const [activeTab, setActiveTab] = useState("description");
  const [reviews, setReviews] = useState([]);
  const [reviewText, setReviewText] = useState("");

  //loading reviews from local storage when the component mounts
  useEffect(() => {
    const savedReviews = JSON.parse(localStorage.getItem("reviews")) || [];
    setReviews(savedReviews);
  }, []);

  // Save reviews to local storage whenever they change
  useEffect(() => {
    localStorage.setItem("reviews", JSON.stringify(reviews));
  }, [reviews]);

  // Handle Review Submission
  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (reviewText.trim() !== "") {
      const updatedReviews = [...reviews, reviewText];
      setReviews(updatedReviews);
      setReviewText(""); // Clear input
    }
  };

  const handleAddToCart = (e) => {
    e.preventDefault(); // Prevent form submission
    addToCart(productData._id, selectedPhone, selectedModal, selectedWrap);
  };

  const fetchProductData = async () => {
    phone_products.map((item) => {
      if (item._id === productId) {
        setProductData(item);
        // console.log(item);
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
          {productData.category === "Mobiles" ? (
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
                    // setPhoneError(false); // Hide error when selected
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

                {/* Modal Selection gpt code below here */}
                {selectedPhone && (
                  <>
                    <label>Please Select the {selectedPhone} Model*</label>
                    <select
                      className="border p-2 cursor-pointer"
                      name="models"
                      id="models"
                      value={selectedModal}
                      onChange={(e) => setSelectedModal(e.target.value)}
                    >
                      <option value="" disabled>
                        ---Please Select---
                      </option>
                      {mobilesModals
                        .find((mobile) => mobile.name === selectedPhone)
                        ?.models.map((model, index) => (
                          <option key={index} value={model}>
                            {model}
                          </option>
                        ))}
                    </select>
                  </>
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
                    // setWrapError(false); // Hide error when selected
                  }}
                >
                  <option value="" disabled>
                    ---Please Select---
                  </option>
                  <option value="full body">Full Body Wrap</option>
                  <option value="no-sides">Only Back</option>
                </select>
                {/* {wrapError && (
                <p className="text-red-500">Please select a wrap type!</p>
              )} */}
              </div>

              <button
                type="submit"
                className="bg-black cursor-pointer text-white px-8 py-3 text-sm active:bg-gray-700"
              >
                Add to Cart
              </button>
            </form>
          ) : (
            <button
              onClick={() => addToCart(productData.id)} // 🛠️ Fix: Added onClick
              className="bg-black mt-5 cursor-pointer text-white px-8 py-3 text-sm active:bg-gray-700"
            >
              Add to Cart
            </button>
          )}
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
        {/* Tabs */}
        <div className="flex">
          <button
            className={`border cursor-pointer px-5 py-3 text-sm ${
              activeTab === "description" ? "bg-gray-200" : ""
            }`}
            onClick={() => setActiveTab("description")}
          >
            Description
          </button>
          <button
            className={`border cursor-pointer px-5 py-3 text-sm ${
              activeTab === "reviews" ? "bg-gray-200" : ""
            }`}
            onClick={() => setActiveTab("reviews")}
          >
            Reviews ({reviews.length})
          </button>
        </div>

        {/* Description Section */}
        {activeTab === "description" && (
          <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500">
            <p>
              Dive into a world of endless skins, wraps, covers, stickers,
              Posters & many more from iconic classics to trending favorites.
              Our diverse range of products lets you personalize your devices
              and spaces like never before!
            </p>
            <p>
              We have got the best premium quality, vibrant set of products that
              will definitely blow your mind— where high-resolution printing
              meets unmatched color accuracy and detailed designs!
            </p>
          </div>
        )}

        {/* Reviews Section */}
        {activeTab === "reviews" && (
          <div className="border px-6 py-6 text-sm text-gray-500">
            {/* Review Form */}
            <form onSubmit={handleReviewSubmit} className="mb-4">
              <textarea
                className="w-full border p-2 mb-2"
                placeholder="Write your review..."
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
              />
              <button
                type="submit"
                className="bg-black text-white px-4 py-2 text-sm active:bg-gray-700"
              >
                Submit Review
              </button>
            </form>

            {/* Display Reviews */}
            {reviews.length > 0 ? (
              <div className="mt-4">
                <h3 className="text-lg font-semibold">Customer Reviews</h3>
                <ul className="mt-2">
                  {reviews.map((review, index) => (
                    <li key={index} className="border-b py-2">
                      {review}
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <p className="text-gray-400">
                No reviews yet. Be the first to write one!
              </p>
            )}
          </div>
        )}
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
