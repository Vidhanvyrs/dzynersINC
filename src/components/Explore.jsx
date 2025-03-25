import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Explore = ({ id, image, name }) => {
  return (
    <Link className="text-gray-700 cursor-pointer" to={`/${id}`}>
      <div className="mt-3 rounded-full w-20 sm:w-30 border border-gray-600">
        <img
          className="w-full h-20 sm:h-30 transition ease-in-out rounded-full"
          src={image}
          alt=""
        />
      </div>
      <p className="pt-3 pb-1 text-sm font-semibold text-center">{name}</p>
    </Link>
  );
};
Explore.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  image: PropTypes.arrayOf(PropTypes.string).isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};
export default Explore;
