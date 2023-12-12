import React, { useState } from "react";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [_password, _setPassword] = useState("");

  const registerUser = () => {
    fetch(
      `https://localhost:8080/auth/register/username=${username}&password=${password}`
    )
      .then((response) => response.json())
      .then((data) => console.log("User created successfully. \n", data))
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    if (password > 8 && password <= 20) {
      if (username > 4 && username <= 12) {
        if (password == _password) {
          registerUser();
        } else {
          console.log("Passwords do not match.");
        }
      } else {
        console.log("Username needs to be 4-12 characters.");
      }
    } else {
      console.log("Password needs to be 8-20 characters.");
    }
  };

  return (
    <div className="grid bg-white w rounded-lg md:flex place-items-center min-h-screen">
      <div className="h-screen w-full text-center items-center flex flex-col py-10 px-5 lg:w-1/3 md:w-3/4 mx-auto">
        <div className="px- border w-3/4 sm:w-3/4 border-gray-300 flex flex-row justify-center mt-[15%] items-center rounded-full">
          <HeliosIcon classes="w-16 mr-0 h-14 px- py-4" />
          <p className="font-bold text-lg">Register to Helios</p>
        </div>
        <div className="border my-10 border-gray-200 w-3/4"></div>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 w-full max-w-xs space-y-3 flex-full"
        >
          <label htmlFor="username" className="text-left font-semibold">
            Username
          </label>
          <input
            type="text"
            placeholder=""
            name="username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            className="border rounded-lg p-3 transition duration-300 ease-in-out transform hover:shadow-md"
          />
          <label htmlFor="password" className="space-x-[60%]">
            <span className="text-left font-semibold mr-auto">Password</span>
            <span className="underline decoration-blue-500 hover:text-blue-500 hover:cursor-pointer text-blue-800">
              Forgot?
            </span>
          </label>
          <input
            type="text"
            placeholder=""
            name="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            className="border rounded-lg p-3 transition duration-300 ease-in-out transform hover:shadow-md"
          />
          <label htmlFor="confirm-pass" className="text-left">
            <span className="text-left font-semibold mr-auto">
              Confirm Password
            </span>
          </label>
          <input
            type="text"
            placeholder=""
            name="confirm-pass"
            value={_password}
            onChange={(e) => {
              _setPassword(e.target.value);
            }}
            className="border rounded-lg p-3 transition duration-300 ease-in-out transform hover:shadow-md"
          />
          <input
            type="submit"
            value="Sign in"
            className="bg-black font-semibold text-white px-24 py-3 rounded-full hover:cursor-pointer text-sm hover:bg-gray-600"
          />
        </form>
      </div>
    </div>
  );
};

export default Register;

const HeliosIcon = ({ classes }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      style={{ color: "blue" }}
      aria-hidden="true"
      focusable="false"
      className={classes}
    >
      <path
        fill="currentColor"
        d="M104 96h-48C42.75 96 32 106.8 32 120V224C14.33 224 0 238.3 0 256c0 17.67 14.33 32 31.1 32L32 392C32 405.3 42.75 416 56 416h48C117.3 416 128 405.3 128 392v-272C128 106.8 117.3 96 104 96zM456 32h-48C394.8 32 384 42.75 384 56V224H256V56C256 42.75 245.3 32 232 32h-48C170.8 32 160 42.75 160 56v400C160 469.3 170.8 480 184 480h48C245.3 480 256 469.3 256 456V288h128v168c0 13.25 10.75 24 24 24h48c13.25 0 24-10.75 24-24V56C480 42.75 469.3 32 456 32zM608 224V120C608 106.8 597.3 96 584 96h-48C522.8 96 512 106.8 512 120v272c0 13.25 10.75 24 24 24h48c13.25 0 24-10.75 24-24V288c17.67 0 32-14.33 32-32C640 238.3 625.7 224 608 224z"
      ></path>
    </svg>
  );
};
