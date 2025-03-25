import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import PropTypes from "prop-types";
import Title from "./Title";
import ProductItem from "./ProductItem";

const RelatedProducts = ({ category, subCategory }) => {
  const { phone_products } = useContext(ShopContext);
  const [related, setRelated] = useState([]);

  useEffect(() => {
    if (phone_products.length > 0) {
      let productsCopy = phone_products.slice();
      productsCopy = productsCopy.filter((item) => category === item.category);
      productsCopy = productsCopy.filter(
        (item) => subCategory === item.subCategory
      );
      setRelated(productsCopy.slice(0, 5));
    }
  }, [phone_products]);
  return (
    <div className="my-24">
      <div className="text-center text-3xl py-2">
        <Title text1={"AREAWISE-RELATED"} text2={"PRODUCTS"} />
      </div>
      <div className="grid grid-cols-2 sm:gird-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {related.map((item, index) => (
          <ProductItem
            key={index}
            id={item._id}
            name={item.name}
            price={item.price}
            image={item.image[0]}
          />
        ))}
      </div>
    </div>
  );
};
RelatedProducts.propTypes = {
  category: PropTypes.string.isRequired, // category must be a string and required
  subCategory: PropTypes.string.isRequired, // subCategory must be a string and required
};
export default RelatedProducts;
