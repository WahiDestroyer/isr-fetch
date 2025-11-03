"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

const page = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("https://api.freeapi.app/api/v1/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      const data = await res.json();
      if (data.success === false) {
        toast.error(data.message);
      }
      if (data.success === true) {
        toast.success(data.message);

        setTimeout(() => {
          router.push("/login");
        }, 1000);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div>
      
      <div className="flex justify-center items-center h-screen">
        <div className="w-80 rounded-xl bg-gray-900 p-8 text-gray-100">
          <p className="text-center text-2xl font-bold">Sign Up</p>
          <form onSubmit={handleSubmit} className="mt-6">
            <div className="mt-1 text-sm">
              <label htmlFor="username" className="block text-gray-400 mb-1">
                Username
              </label>
              <input
                onChange={(e) =>
                  setUser((prev) => ({ ...prev, username: e.target.value }))
                }
                type="text"
                name="username"
                id="username"
                className="w-full rounded-md border border-gray-700 bg-gray-900 p-3 text-gray-100 outline-none focus:border-purple-400"
              />
            </div>

            <div className="mt-4 text-sm">
              <label htmlFor="email" className="block text-gray-400 mb-1">
                Email
              </label>
              <input
                onChange={(e) =>
                  setUser((prev) => ({ ...prev, email: e.target.value }))
                }
                type="email"
                name="email"
                id="email"
                className="w-full rounded-md border border-gray-700 bg-gray-900 p-3 text-gray-100 outline-none focus:border-purple-400"
              />
            </div>

            <div className="mt-4 text-sm">
              <label htmlFor="password" className="block text-gray-400 mb-1">
                Password
              </label>
              <input
                onChange={(e) =>
                  setUser((prev) => ({ ...prev, password: e.target.value }))
                }
                type="password"
                name="password"
                id="password"
                className="w-full rounded-md border border-gray-700 bg-gray-900 p-3 text-gray-100 outline-none focus:border-purple-400"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-purple-400 p-3 text-gray-900 font-semibold rounded-md mt-3 cursor-pointer"
            >
              Sign up
            </button>
          </form>

          <p className="text-center text-xs text-gray-400 mt-4">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-gray-100 hover:underline hover:underline-offset-2 hover:decoration-purple-400"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default page;
