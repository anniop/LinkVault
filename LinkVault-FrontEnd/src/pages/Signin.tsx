import { useRef } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

export function Signin() {
  const usernameRef = useRef<HTMLInputElement>();
  const passwordRef = useRef<HTMLInputElement>();
  const navigate = useNavigate();

  async function signin() {
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;
    const response = await axios.post(BACKEND_URL + "/api/v1/signin", {
      username,
      password,
    });
    const jwt = response.data.token;
    localStorage.setItem("token", jwt);
    navigate("/dashboard");
  }

  return (
    <div className="h-screen w-screen bg-gradient-to-r from-blue-500 to-purple-500 flex justify-center items-center px-6">
      {/* Main container */}
      <div className="bg-white rounded-2xl shadow-2xl flex flex-col lg:flex-row w-full max-w-6xl">
        {/* Information Section */}
        <div className="lg:w-1/2 p-8 flex flex-col justify-center items-center text-center lg:text-left bg-gradient-to-b from-purple-500 to-blue-500 text-white rounded-t-2xl lg:rounded-tr-none lg:rounded-l-2xl">
          <h1 className="text-3xl lg:text-4xl font-bold mb-4">Welcome Back to LinkVault!</h1>
          <p className="text-lg mb-6">
            LinkVault is your trusted solution for managing your links and resources.
            Simplify your workflow, access everything in one place, and never lose track of important content again.
          </p>
          <ul className="list-disc pl-5 text-left">
            <li className="mb-2">Quick and secure access to your saved links</li>
            <li className="mb-2">Organize resources by categories</li>
            <li className="mb-2">Customizable features for enhanced productivity</li>
          </ul>
          <p className="mt-6 text-sm">Don't have an account? <a href="/signup" className="underline font-semibold">Sign Up</a></p>
        </div>

        {/* Signin Section */}
        <div className="lg:w-1/2 p-8 flex flex-col justify-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Sign In</h2>
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
              text="Sign In"
              className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors w-full"
              onClick={signin}
            />
          </div>

        </div>
      </div>
    </div>
  );
}

