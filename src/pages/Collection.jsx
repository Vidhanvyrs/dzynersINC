// import { useContext } from "react";
// import { ShopContext } from "../context/ShopContext";
import PropTypes from "prop-types";

const Collection = () => {
  //   const { phone_products = [] } = useContext(ShopContext) || {};
  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
      {/* Filter Options */}
      <div className="min-w-60">
        <p className="my-2 text-xl flex items-center cursor-pointer gap-2">
          FILTERS
        </p>
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
