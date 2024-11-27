import { useRef } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function Signup() {
  const usernameRef = useRef<HTMLInputElement>();
  const passwordRef = useRef<HTMLInputElement>();
  const navigate = useNavigate();

  async function signup() {
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;
    await axios.post(BACKEND_URL + "/api/v1/signup", {
      username,
      password,
    });
    navigate("/signin");
    alert("You have Signed Up!!!");
  }

  return (
    <div className="h-screen w-screen bg-gradient-to-r from-blue-500 to-purple-500 flex justify-center items-center px-6">
      {/* Main container */}
      <div className="bg-white rounded-2xl shadow-2xl flex flex-col lg:flex-row w-full max-w-6xl">
        {/* Information Section */}
        <div className="lg:w-1/2 p-8 flex flex-col justify-center items-center text-center lg:text-left bg-gradient-to-b from-purple-500 to-blue-500 text-white rounded-t-2xl lg:rounded-tr-none lg:rounded-l-2xl">
          <h1 className="text-3xl lg:text-4xl font-bold mb-4">Welcome to LinkVault!</h1>
          <p className="text-lg mb-6">
            LinkVault is your ultimate platform for managing and storing your favorite links, resources, and content.
            Whether it's for work, study, or leisure, keep everything organized in one place.
          </p>
          <ul className="list-disc pl-5 text-left">
            <li className="mb-2">Secure and private link storage</li>
            <li className="mb-2">Organize by categories like Twitter, YouTube</li>
            <li className="mb-2">Quick and easy access to your saved links</li>
          </ul>
          <p className="mt-6 text-sm">Already have an account? <a href="/signin" className="underline font-semibold">Sign In</a></p>
        </div>

        {/* Signup Section */}
        <div className="lg:w-1/2 p-8 flex flex-col justify-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Sign Up</h2>
          <Input
            placeholder="Username"
            reference={usernameRef}
            className="border rounded-lg p-3 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Input
            placeholder="Password"
            reference={passwordRef}
            type="password"
            className="border rounded-lg p-3 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="flex justify-center pt-4">
            <Button
              loading={false}
              variant="primary"
              text="Sign Up"
              className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors w-full"
              onClick={signup}
            />
          </div>

        </div>
      </div>
    </div>
  );
}

