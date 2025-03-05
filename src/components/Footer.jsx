import { Link } from "react-router-dom";
import { phassets } from "../assets/phoneassets/phoneassets";

const Footer = () => {
  return (
    <div>
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
        <div>
          <img src={phassets.logo1} className="mb-5 w-32" alt="" />
          <p className="w-full md:w-2/3 text-gray-600">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quibusdam,
            nisi rem, quaerat sit autem cumque suscipit itaque harum
            consequuntur officiis delectus saepe enim velit earum, ea blanditiis
            a tempora commodi.
          </p>
        </div>
        <div>
          <p className="text-xl font-medium mb-5">COMPANY</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <Link to="/">
              <li>Home</li>
            </Link>
            <Link to="/">
              <li>About us</li>
            </Link>
            <Link to="/">
              <li>Delivery</li>
            </Link>
            <Link to="/">
              <li>Privacy Policy</li>
            </Link>
          </ul>
        </div>
        <div>
          <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>+91-7725905353</li>
            <li>contact@shedtheshell.com</li>
          </ul>
        </div>
      </div>
      <div>
        <hr />
        <p className="py-5 text-sm text-center">
          Copyright 2025@ shedtheshell.com - All Rights Reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
