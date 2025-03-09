import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import PropTypes from "prop-types";
import { assets } from "../assets/assets/frontend_assets/assets";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";
import { motion } from "motion/react";

const Collection = () => {
  const { phone_products = [] } = useContext(ShopContext) || {};
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  useEffect(() => {
    setFilterProducts(phone_products);
  }, []);
  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
      {/* Filter Options */}
      <div className="min-w-60">
        <p
          onClick={() => setShowFilter(!showFilter)}
          className="my-2 text-xl flex items-center cursor-pointer gap-2"
        >
          FILTERS
          <img
            className={`h-3 sm:hidden ${showFilter ? "rotate-90" : ""}`}
            src={assets.dropdown_icon}
            alt=""
          />
        </p>
        {/* Category Filter */}
        <div
          className={`border border-gray-300 pl-5 py-3 mt-6 ${
            showFilter ? "" : "hidden"
          } sm:block`}
        >
          <p className="mb-3 text-sm font-medium">CATEGORIES</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input type="checkbox" className="w-3" value={"Mobiles"} />{" "}
              Mobiles
            </p>
            <p className="flex gap-2">
              <input type="checkbox" className="w-3" value={"Stickers"} />{" "}
              Stickers
            </p>
            <p className="flex gap-2">
              <input type="checkbox" className="w-3" value={"Laptops"} />{" "}
              Laptops
            </p>
            <p className="flex gap-2">
              <input type="checkbox" className="w-3" value={"Business Cards"} />{" "}
              Business Cards
            </p>
          </div>
        </div>
        {/* Subcategory Filters */}
        <div
          className={`border border-gray-300 pl-5 py-3 my-5 ${
            showFilter ? "" : "hidden"
          } sm:block`}
        >
          <p className="mb-3 text-sm font-medium">SUB-CATEGORIES</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input type="checkbox" className="w-3" value={"All"} /> All
            </p>
            <p className="flex gap-2">
              <input type="checkbox" className="w-3" value={"BestSeller"} />{" "}
              BestSeller
            </p>
            <p className="flex gap-2">
              <input type="checkbox" className="w-3" value={"Cheapest"} />{" "}
              Cheapest
            </p>
          </div>
        </div>
      </div>
      {/* Right Side */}
      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <Title text1={"ALL"} text2={"COLLECTIONS"} />
          {/* Sorting options for product */}
          <select className="border-2 border-gray-300  text-sm px-2 cursor-pointer">
            <option value="relevant">Sort by: Relevant</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>

        {/* Map Proudcts */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
          {filterProducts.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <ProductItem
                key={index}
                name={item.name}
                id={item._id}
                price={item.price}
                image={item.image}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
Collection.propTypes = {
  id: PropTypes.oneOfType([(<PropTypes></PropTypes>).string, PropTypes.number])
    .isRequired,
  image: PropTypes.arrayOf(PropTypes.string).isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default Collection;
