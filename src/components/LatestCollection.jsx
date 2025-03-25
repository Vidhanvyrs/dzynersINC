import { useContext, useState, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";
import { motion } from "motion/react";

const LatestCollection = () => {
  const { phone_products = [] } = useContext(ShopContext) || {};
  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    setLatestProducts(phone_products.slice(0, 10));
  }, []);

  //   console.log(phone_products);
  return (
    <div className="my-10">
      <div className="text-center py-8 text-3xl">
        <Title text1={"TRENDING"} text2={"PRODUCTS"} />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          The official go-to store for your favorite Mobile Skins and exclusive
          custom back covers
        </p>
      </div>
      {/* Rendering Products */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {latestProducts.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            // viewport={{ once: true }}
          >
            <ProductItem
              key={index}
              id={item._id}
              image={item.image[0]}
              name={item.name}
              price={item.price}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default LatestCollection;
