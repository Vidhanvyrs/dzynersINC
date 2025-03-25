import { phassets } from "../assets/phoneassets/phoneassets";
import { Link, NavLink, useLocation } from "react-router-dom";
import { assets } from "../assets/assets/frontend_assets/assets";
import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const { setShowSearch } = useContext(ShopContext);
  const [navsearch, showNavSearch] = useState(false);
  const location = useLocation();
  useEffect(() => {
    if (location.pathname.includes("collection")) {
      showNavSearch(true);
    } else {
      showNavSearch(false);
    }
  });

  return (
    <div className="flex items-center justify-between py-5 font-medium">
      <Link to="/">
        <img
          src={phassets.logo1}
          className="w-25 sm:w-36 rounded-lg border border-gray-800"
          alt=""
        />
      </Link>
      <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
        <NavLink to="/" className="flex flex-col items-center gap-1">
          <p>HOME</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>

        {/* COLLECTIONS DROPDOWN*/}
        <div className="relative">
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <p>COLLECTIONS</p>
            <img
              src={assets.dropdown_icon}
              className={`w-2 transition-transform ${
                dropdownOpen ? "rotate-90" : "rotate-0"
              }`}
              alt="dropdown"
            />
          </div>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
          {/* DROPDOWN MENU */}
          {dropdownOpen && (
            <div className="absolute left-0 top-full w-40 bg-white shadow-md border rounded-md py-2 z-10">
              <Link
                to="/collection"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-200"
                onClick={() => setDropdownOpen(false)}
              >
                ALL
              </Link>
              <Link
                to="/mobile-wraps"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-200"
                onClick={() => setDropdownOpen(false)}
              >
                Mobiles
              </Link>
              <Link
                to="/laptop-wraps"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-200"
                onClick={() => setDropdownOpen(false)}
              >
                Laptops
              </Link>
              <Link
                to="/stickers"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-200"
                onClick={() => setDropdownOpen(false)}
              >
                Stickers
              </Link>
            </div>
          )}
        </div>

        <NavLink to="/about" className="flex flex-col items-center gap-1">
          <p>ABOUT</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink to="/contact" className="flex flex-col items-center gap-1">
          <p>CONTACT</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
      </ul>

      {/* Other Icons */}
      <div className="flex items-center gap-6">
        {navsearch && (
          <img
            onClick={() => setShowSearch(true)}
            src={assets.search_icon}
            className="w-5 cursor-pointer"
            alt="search"
          />
        )}
        <div className="group relative">
          <img
            className="w-5 cursor-pointer"
            src={assets.profile_icon}
            alt="profile"
          />
          <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4">
            <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded">
              <p className="cursor-pointer hover:text-black">My Profile</p>
              <p className="cursor-pointer hover:text-black">Orders</p>
              <p className="cursor-pointer hover:text-black">Logout</p>
            </div>
          </div>
        </div>
        <Link to="/cart" className="relative">
          <img src={assets.cart_icon} className="w-5 min-w-5" alt="cart" />
          <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]">
            10
          </p>
        </Link>
        <img
          onClick={() => setVisible(true)}
          src={assets.menu_icon}
          className="w-5 cursor-pointer sm:hidden"
          alt="menu"
        />
      </div>

      {/* Sidebar for small screens */}
      <div
        className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${
          visible ? "w-full" : "w-0"
        }`}
      >
        <div className="flex flex-col text-gray-600">
          <div
            onClick={() => setVisible(false)}
            className="flex items-center gap-4 p-3 cursor-pointer"
          >
            <img className="h-4 rotate-180" src={assets.dropdown_icon} alt="" />
            <p>Back</p>
          </div>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-2 pl-6 border"
            to="/"
          >
            HOME
          </NavLink>
          {/* <NavLink
            onClick={() => setVisible(false)}
            className="py-2 pl-6 border"
            to="/collection"
          >
            COLLECTION
          </NavLink> */}
          <div className="relative">
            <div
              className="py-2 pl-6 border flex items-center gap-3 cursor-pointer"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <p>COLLECTION</p>
              <img
                src={assets.dropdown_icon}
                className={`w-2 transition-transform ${
                  dropdownOpen ? "rotate-90" : "rotate-0"
                }`}
                alt="dropdown"
              />
            </div>
            {dropdownOpen && (
              <div className="absolute left-0 top-full w-full bg-white shadow-md border py-2 z-10">
                <Link
                  to="/collection"
                  className="block px-4 py-2 pl-6 text-gray-700 hover:bg-gray-200"
                  onClick={() => {
                    setDropdownOpen(false);
                    setVisible(false);
                  }}
                >
                  ALL
                </Link>
                <Link
                  to="/mobile-wraps"
                  className="block px-4 py-2 pl-6 text-gray-700 hover:bg-gray-200"
                  onClick={() => {
                    setDropdownOpen(false);
                    setVisible(false);
                  }}
                >
                  Mobiles
                </Link>
                <Link
                  to="/laptop-wraps"
                  className="block px-4 py-2 pl-6 text-gray-700 hover:bg-gray-200"
                  onClick={() => {
                    setDropdownOpen(false);
                    setVisible(false);
                  }}
                >
                  Laptops
                </Link>
                <Link
                  to="/stickers"
                  className="block px-4 py-2 pl-6 text-gray-700 hover:bg-gray-200"
                  onClick={() => {
                    setDropdownOpen(false);
                    setVisible(false);
                  }}
                >
                  Stickers
                </Link>
              </div>
            )}
          </div>
          <NavLink
            onClick={() => {
              setDropdownOpen(false);
              setVisible(false);
            }}
            className="py-2 pl-6 border"
            to="/about"
          >
            ABOUT
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-2 pl-6 border"
            to="/contact"
          >
            CONTACT
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
