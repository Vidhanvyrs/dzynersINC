import { useContext, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import PropTypes from "prop-types";
import { assets } from "../assets/assets/frontend_assets/assets";

const Collection = () => {
  const { phone_products = [] } = useContext(ShopContext) || {};
  const [showFilter, setShowFilter] = useState(false);
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
