import { useContext } from "react";
import Poster from "../components/Poster";
import Title from "../components/Title";
import { ShopContext } from "../context/ShopContext";
import { motion } from "motion/react";

const Mobile = () => {
  const { posters = [] } = useContext(ShopContext) || {};

  return (
    <div className="flex flex-col mt-7">
      <div className="text-left py-3 text-4xl">
        <Title text1={"MOBILE"} text2={"COLLECTIONS"} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-4">
        {posters.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <Poster
              key={index}
              id={item._id}
              image={item.image}
              name={item.name}
              className="w-full h-auto"
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Mobile;
