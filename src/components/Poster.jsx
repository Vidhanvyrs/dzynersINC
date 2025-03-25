import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const Poster = ({ image, name }) => {
  return (
    <Link className="text-gray-700 cursor-pointer" to={`/collection`}>
      <div className="mt-3 purpleShadow duration-200 w-full border border-[#3bb371] rounded-lg">
        <img className="transition rounded-lg ease-in-out" src={image} alt="" />
      </div>
      <p className="pt-5 pb-3 text-sm lg:text-lg font-semibold text-center">
        {name}
      </p>
    </Link>
  );
};
Poster.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  image: PropTypes.arrayOf(PropTypes.string).isRequired,
  name: PropTypes.string.isRequired,
};

export default Poster;
