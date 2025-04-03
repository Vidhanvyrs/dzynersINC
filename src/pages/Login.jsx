import { useContext, useState } from "react";
import { ShopContext } from "../context/ShopContext";

const Login = () => {
  const { phassets } = useContext(ShopContext);
  const [currentState, setCurrentState] = useState("Sign Up");
  const onSubmitHandler = async (e) => {
    e.preventDefault();
  };
  return (
    <div className="flex flex-row w-full h-screen border justify-between rounded-2xl">
      {/* Left Side for Image */}
      <div className="w-[60%]">
        <img src={phassets.random} alt="" className="w-full rounded-l-2xl" />
      </div>
      <div className="w-[40%]">
        <form
          onSubmit={onSubmitHandler}
          className="flex flex-col items-center justify-center w-[90%] h-screen mt-[-50px] sm:max-w-96 m-auto gap-4 text-gray-800"
        >
          <div className="inline-flex items-center gap-2 mb-2 mt-10">
            <p className="prata-regular text-3xl">{currentState}</p>
            <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
          </div>
          {currentState === "Login" ? (
            ""
          ) : (
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-800 rounded-lg"
              placeholder="Name"
              required
            />
          )}
          <input
            type="email"
            className="w-full px-3 py-2 border border-gray-800 rounded-lg"
            placeholder="Email"
            required
          />
          <input
            type="password"
            className="w-full px-3 py-2 border border-gray-800 rounded-lg"
            placeholder="Password"
            required
          />
          <div className="w-full flex justify-between mt-[-8px]">
            <p className="cursor-pointer">Forgot your Password?</p>
            {currentState === "Login" ? (
              <p
                onClick={() => setCurrentState("Sign Up")}
                className="cursor-pointer"
              >
                Create Account
              </p>
            ) : (
              <p
                onClick={() => setCurrentState("Login")}
                className="cursor-pointer"
              >
                Login Here
              </p>
            )}
          </div>
          <button className="bg-black cursor-pointer text-white font-light px-8 py-2 mt-2 w-full rounded-lg">
            {currentState === "Login" ? "Login" : "Sign Up"}
          </button>
          <div className="flex items-center w-full gap-4 my-4">
            <div className="h-[1px] bg-gray-400 flex-1"></div>
            <p className="text-gray-500 whitespace-nowrap">Or</p>
            <div className="h-[1px] bg-gray-400 flex-1"></div>
          </div>
          <button className="flex items-center gap-4 cursor-pointer px-4 py-2 border border-gray-400 rounded-lg w-full hover:bg-gray-100">
            <img
              src={phassets.google}
              alt="Google Logo"
              className="w-5 h-5 rounded-full"
            />
            <span>Continue with Google</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
