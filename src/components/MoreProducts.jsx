import { useContext, useEffect, useState } from "react";
import { motion } from "motion/react";
import { ShopContext } from "../context/ShopContext";
import Explore from "./Explore";
import Title from "./Title";

const MoreProducts = () => {
  const { explore_products = [] } = useContext(ShopContext) || {};
  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    setLatestProducts(explore_products.slice(0, 5));
  }, []);
  return (
    <div className="flex flex-col items-center justify-center mt-7">
      <div className="text-center py-3 text-2xl">
        <Title text1={"EXPLORE"} text2={"PRODUCTS"} />
      </div>
      <div className="flex flex-row w-full max-w-100 gap-5 flex-wrap sm:flex-nowrap sm:gap-10 items-center justify-center mt-2">
        {latestProducts.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            // viewport={{ once: true }}
          >
            <Explore
              key={index}
              id={item._id}
              image={item.image}
              name={item.name}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default MoreProducts;
